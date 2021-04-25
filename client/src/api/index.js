import axios from 'axios';
import { reactive, computed } from 'vue';
import inputDateToMillis from '@/utils/inputDateToMillis';

class API {
  axios = axios.create({
    baseURL: 'https://server.roamiiing.ru/vezdekod/40',
    // baseURL: 'http://localhost:3030',
  });

  state = reactive({
    authorized: false,
    token: null,
    user: {},
    appeals: [],
    total: 0,
    limit: 10,
    stats: {},
  });

  getters = {
    username: computed(() => this.state.user.username),
    authorized: computed(() => this.state.authorized),
    appeals: computed(() => this.state.appeals),
    total: computed(() => this.state.total),
    limit: computed(() => this.state.limit),
    statTotal: computed(() => this.state.stats.total),
    statClosed: computed(() => this.state.stats.closed),
    statOpened: computed(() => this.state.stats.total - this.state.stats.closed),
  };

  async sendFeedback(feedback) {
    const { data, status } = await this.axios.post('/appeals', feedback);
    return { data, status };
  }

  async authorize(authData) {
    try {
      const {
        data,
        status,
      } = await this.axios.post('/authentication', authData);
      if (status === 201) {
        const {
          user,
          accessToken,
        } = data;
        this.state.user = user;
        this.state.token = accessToken;
        this.state.authorized = true;
        localStorage.setItem('token', accessToken);
        this.axios.defaults.headers.authorization = `Bearer ${accessToken}`;
      } else {
        this.state.user = {};
        this.state.token = null;
        this.state.authorized = false;
        localStorage.removeItem('token');
        this.axios.defaults.headers.authorization = undefined;
      }
      return { data, status };
    } catch (e) {
      this.state.user = {};
      this.state.token = null;
      this.state.authorized = false;
      localStorage.removeItem('token');
      this.axios.defaults.headers.authorization = undefined;
    }
    return {};
  }

  async attemptToAuthorize() {
    const accessToken = this.state.token || localStorage.getItem('token');
    if (!accessToken) {
      return;
    }
    await this.authorize({
      strategy: 'jwt',
      accessToken,
    });
  }

  async loadAppeals(filters) {
    const queries = [];
    if (filters) {
      const {
        from, to, status, phoneNumber, id, limit, skip,
      } = filters;
      if (from) queries.push(`createdAt[$gt]=${inputDateToMillis(from)}`);
      if (to) queries.push(`createdAt[$lt]=${inputDateToMillis(to)}`);
      if (status) queries.push(`status=${status}`);
      if (phoneNumber) queries.push(`phoneNumber=${phoneNumber}`);
      if (id) queries.push(`altId=${id}`);
      if (limit) queries.push(`$limit=${limit}`);
      if (skip) queries.push(`$skip=${skip}`);
    }
    const queryString = queries.join('&');
    console.log(queryString);
    const { data, status } = await this.axios.get(`/appeals${queryString ? `?${queryString}` : ''}`);
    console.log(data);
    if (status === 200) {
      const { data: appeals, total, limit } = data;
      this.state.appeals = appeals;
      this.state.total = total;
      this.state.limit = limit;
    }
  }

  async loadStats(filters) {
    const queries = [];
    if (filters) {
      const {
        from, to,
      } = filters;
      if (from) queries.push(`createdAt[$gt]=${inputDateToMillis(from)}`);
      if (to) queries.push(`createdAt[$lt]=${inputDateToMillis(to)}`);
    }
    const queryString = queries.join('&');
    const { data, status } = await this.axios.get(`/stats${queryString ? `?${queryString}` : ''}`);
    if (status === 200) {
      this.state.stats = data;
    }
  }

  async closeAppeal(id, msg) {
    const { data, status } = await this.axios.patch(`/appeals/${id}`, {
      status: 'closed',
      answer: msg,
    });
    // eslint-disable-next-line no-underscore-dangle
    const declaration = this.state.appeals.find((v) => v._id === data._id);
    declaration.status = data.status;
    declaration.closedAt = data.closedAt;
    declaration.answer = data.answer;
    return { data, status };
  }
}

const api = new API();

export default api;

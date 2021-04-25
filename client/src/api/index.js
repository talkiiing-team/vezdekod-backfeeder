import axios from 'axios';

class API {
  axios = axios.create({
    baseURL: 'https://server.roamiiing.ru/vezdekod/10',
  });

  async sendFeedback(feedback) {
    const { data, status } = await this.axios.post('/appeals', feedback);
    return { data, status };
  }
}

export default new API();

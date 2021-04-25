import axios from 'axios';

// import { ref } from 'vue';

// const createResponseStatus = () => {
//   const loading = ref(true);
//   const status = ref();
//   return {
//     loading,
//     status,
//   };
// };

class API {
  axios = axios.create({
    baseURL: 'http://localhost:3030',
  });

  async sendFeedback(feedback) {
    const { data, status } = await this.axios.post('/appeals', feedback);
    return { data, status };
  }
}

export default new API();

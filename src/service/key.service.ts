import axios from "axios";


export const KeyService = {
  async getApiKeys() {
    const {data} = await axios.get('/api/keys');
    return data;
  },

  async deleteApiKey(key: string) {
    await axios.delete(`/api/keys?apiKey=${encodeURIComponent(key)}`);
  },

  async postApiKey() {
    await axios.post('/api/keys');
  },
}
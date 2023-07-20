import axios from "axios";

export const PhotoService = {
  async uploadPhoto(VagonNumber: string, formData: FormData) {
    const {data} = await axios.post(`/api/photo?VagonNumber=${VagonNumber}`, formData);
    return data
  },

  async deletePhoto(VagonNumber: string) {
    const {data} = await axios.delete(`/api/photo?VagonNumber=${VagonNumber}`);
    return data
  },
}

import axios from "axios";
import { IWagonData } from "@/interfaces/wagon.interface";

const API_URL = "https://rwl.artport.pro"

export const WagonService = {
  async getAll() {
    const { data } = await axios.get<IWagonData>(`${API_URL}/commercialAgent/hs/CarrWorkApp/VagonInfo`)
    return data
  },
  async getOne(VagonNumber: string) {
    const { data } = await axios.get<IWagonData>(`${API_URL}/commercialAgent/hs/CarrWorkApp/VagonInfo`)
    return data.Vagons.find((Vagons) => Vagons.VagonNumber === VagonNumber)
  },
}

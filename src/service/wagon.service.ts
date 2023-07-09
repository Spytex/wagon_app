import axios from "axios";
import {IWagonData} from "@/interfaces/wagon.interface";

const API_URL = "https://rwl.artport.pro"
axios.defaults.baseURL = API_URL;

export const WagonService = {
    async getAll(){
        const {data} = await axios.get<IWagonData>('/commercialAgent/hs/CarrWorkApp/VagonInfo')
        return data
    },
}

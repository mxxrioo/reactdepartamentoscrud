import axios from "axios";
import Global from "../Global";

export default class ServiceHospitales{
    async getHospitales() {
        let url = Global.urlApiEjemplos;
        let request = "api/hospitales";
        let response = await axios.get(url + request);
        return response.data;
    }
}
import axios from 'axios';
import Global from '../Global';

export default class ServiceDepartamentos {
    getDepartamentos() {
        return new Promise(function(resolve) {
            let url = Global.urlApiDepartamentos;
            let request = "api/departamentos";
            axios.get(url + request).then((response) => {
                console.log("Leyendo departamentos");
                resolve(response.data);
            })
        })
    }

    async getDatos() {
        let url = Global.urlApiDepartamentos;
        let request = "....."
        try{
            //SI TODO VA BIEN, REALIZA ESTE CODIGO
            //DEBEMOS CAPTURAR LOS DATOS DEL API CON GET
            let response = await axios.get(url + request);
            //TENEMOS LOS DATOS EN RESPONSE Y HA REALIZADO LA ACCION
            return response.data;            
        }catch (error){
            //AQUI ENTRA SI TENEMOS UN ERROR
            //SI QUEREMOS PROPAGAR EL ERROR HACIA EL COMPONENT
            throw error;
        }
    }    

    insertDepartamento(departamento){
        return new Promise(function(resolve, reject){
            let url = Global.urlApiDepartamentos;
            let request = "api/departamentos";            
            axios.post(url + request, departamento)
                .then((response) => {
                    console.log("insertando departamento");
                    resolve(response);
                }).catch((error) => {
                    console.log("Error insertando " + error);
                    reject(error);
                })
        })
    }

    updateDepartamento(departamento) {
        return new Promise(function(resolve) {
            let url = Global.urlApiDepartamentos;
            let request = "api/departamentos";
            axios.put(url + request, departamento).then((response) => {
                console.log("Update departamento");
                resolve(response);
            })
        })
    }

    deleteDepartamento(idDepartamento){
        return new Promise(function(resolve) {
            let url = Global.urlApiDepartamentos;
            let request = "api/departamentos/" + idDepartamento;
            axios.delete(url + request).then((response) => {
                console.log("Departamento eliminado: " + idDepartamento);
                resolve(response);
            })
        })
    }

}
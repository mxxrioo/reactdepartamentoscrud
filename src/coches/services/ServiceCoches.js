import axios from 'axios';
import Global from '../Global';

export default class ServiceCoches {
    getCoches() {
        return new Promise(function(resolve, reject) {
            axios.get(Global.urlApiCoches + 'api/Coches')
                .then((response) => resolve(response.data)).catch(reject);
        })
    }

    findCoche(id) {
        return new Promise(function(resolve, reject) {
            axios.get(Global.urlApiCoches + 'api/Coches/FindCoche/' + id)
                .then((response) => resolve(response.data)).catch(reject);
        })
    }

    insertCoche(coche) {
        return new Promise(function(resolve, reject) {
            axios.post(Global.urlApiCoches + 'api/Coches/InsertCoche', coche)
                .then(resolve).catch(reject);
        })
    }

    updateCoche(coche) {
        return new Promise(function(resolve, reject) {
            axios.put(Global.urlApiCoches + 'api/Coches/UpdateCoche', coche)
                .then(resolve).catch(reject);
        })
    }

    deleteCoche(id) {
        return new Promise(function(resolve, reject) {
            axios.delete(Global.urlApiCoches + 'api/Coches/DeleteCoche/' + id)
                .then(resolve).catch(reject);
        })
    }
}

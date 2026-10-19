import React, { Component } from 'react'
import loading from './../assets/images/loading.gif';
import ServiceDepartamentos from '../services/ServiceDepartamentos';
import { NavLink } from 'react-router-dom';

export default class HomeComponent extends Component {
    service = new ServiceDepartamentos();
    state = {
        departamentos: [],
        status: false
    }

    deleteDepartamento = (idDepartamento) => {
        this.service.deleteDepartamento(idDepartamento).then((result) => {
            //QUEREMOS RECARGAR LOS DATOS AL ELIMINAR
            this.loadDepartamentos();
        })
    }

    loadDepartamentos = () => {
        this.service.getDepartamentos().then((result) => {
            this.setState({
                departamentos: result,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadDepartamentos();
    }

    render() {
        if (this.state.status == true){
            return (
            <div style={{margin: "auto", width: "50%"}}>
                <table className="table table-info">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Localidad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.departamentos.map((dept, index) => {
                                return (<tr key={index}>
                                    <td>{dept.nombre}</td>
                                    <td>{dept.localidad}</td>
                                    <td>
                                        <button className='btn btn-danger'
                                        onClick={() => {
                                            this.deleteDepartamento(dept.numero)
                                        }}>
                                            Delete
                                        </button>
                                        <NavLink className="btn btn-info"
                                        to={"/update/" + dept.numero
                                            + "/" + dept.nombre
                                            + "/" + dept.localidad
                                        }>
                                            Edit
                                        </NavLink>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            )
        }else{
            return (<img src={loading} alt="loading..."/>)
        }

    }
}

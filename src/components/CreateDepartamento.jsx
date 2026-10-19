import React, { Component } from 'react'
import ServiceDepartamentos from '../services/ServiceDepartamentos'
import { Navigate } from 'react-router-dom';

export default class CreateDepartamento extends Component {
    service = new ServiceDepartamentos();
    cajaNumero = React.createRef();
    cajaNombre = React.createRef();
    cajaLocalidad = React.createRef();

    state = {
        mensaje: null,
        status: false
    }

    insertDepartamento = (event) => {
        event.preventDefault();
        //CREAMOS EL OBJETO DEPARTAMENTO
        let departamento = {
            numero: parseInt(this.cajaNumero.current.value),
            nombre: this.cajaNombre.current.value,
            localidad: this.cajaLocalidad.current.value
        }
        //LOS ERRORES SE CAPTURAN IGUAL EN UNA PROMESA (then...catch)
        this.service.insertDepartamento(departamento)
            .then((result) => {
                //CAMBIAMOS EL ESTADO PARA LA NAVEGACION
                this.setState({
                    status: true
                })
            }).catch((error) => {
                this.setState({
                    mensaje: error.message
                })
            })
    }

    render() {
        if (this.state.status == true){
            return (<Navigate to="/"/>)
        }else{
            return (
            <div style={{margin: "auto", width: "50%"}}>
                <h1>Create Departamento</h1>
                {
                    this.state.mensaje && 
                    (<p style={{color:"red", fontWeight: "bold"}}>
                        {this.state.mensaje}
                    </p>)
                }
                <form>
                    <label>Id departamento: </label>
                    <input type="number" className='form-control'
                        ref={this.cajaNumero}/>
                    <label>Nombre: </label>
                    <input type="text" className='form-control'
                        ref={this.cajaNombre}/>
                    <label>Localidad: </label>
                    <input type="text" className='form-control'
                        ref={this.cajaLocalidad}/>
                    <button className='btn btn-warning' onClick={this.insertDepartamento}>
                        Insertar
                    </button>
                </form>
            </div>
            )            
        }
    }
}

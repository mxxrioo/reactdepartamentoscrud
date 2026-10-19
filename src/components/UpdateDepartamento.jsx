import React, { Component } from 'react'
import ServiceDepartamentos from '../services/ServiceDepartamentos';
import { Navigate } from 'react-router-dom';

export default class UpdateDepartamento extends Component {
    service = new ServiceDepartamentos();
    cajaNumero = React.createRef();
    cajaNombre = React.createRef();
    cajaLocalidad = React.createRef();

    state = {
        status: false
    }

    updateDepartamento = (event) => {
        event.preventDefault();
        let departamento = {
            numero: parseInt(this.cajaNumero.current.value),
            nombre: this.cajaNombre.current.value,
            localidad: this.cajaLocalidad.current.value
        }
        this.service.updateDepartamento(departamento).then((result) => {
            this.setState({
                status: true
            })
        })
    }

    render() {
        return (
        <div>
            {
                this.state.status == true &&
                (<Navigate to="/"/>)
            }
            <h1>Update Departamento</h1>
            <form>
                <label>Id departamento</label>
                <input type="number" defaultValue={this.props.id}
                    ref={this.cajaNumero} className='form-control' disabled/>
                <label>Nombre: </label>
                <input type="text" ref={this.cajaNombre}
                    defaultValue={this.props.nombre} className='form-control'/>
                <label>Localidad: </label>
                <input type="text" ref={this.cajaLocalidad}
                    defaultValue={this.props.localidad} className='form-control'/>
                <button onClick={this.updateDepartamento} 
                className="btn btn-info">
                    Update
                </button>
            </form>
        </div>
        )
    }
}

import React, { Component } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import ServiceCoches from '../services/ServiceCoches';

export default class UpdateCoche extends Component {
    service = new ServiceCoches();
    cajaId = React.createRef();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();
    state = { status: false, guardando: false, mensaje: null, coche: null, cargado: false };

    // LA URL SOLO ENVIA EL ID. BUSCAMOS EL OBJETO EN EL API.
    componentDidMount() {
        this.service.findCoche(this.props.id).then((result) => {
            this.setState({ coche: result, cargado: true });
        }).catch(() => this.setState({ cargado: true, mensaje: 'No se ha podido cargar el coche.' }));
    }

    updateCoche = (event) => {
        event.preventDefault();
        let coche = {
            idCoche: parseInt(this.cajaId.current.value),
            marca: this.cajaMarca.current.value.trim(),
            modelo: this.cajaModelo.current.value.trim(),
            conductor: this.cajaConductor.current.value.trim(),
            imagen: this.cajaImagen.current.value.trim()
        };
        this.setState({ guardando: true, mensaje: null });
        this.service.updateCoche(coche).then(() => {
            this.setState({ status: true });
        }).catch(() => this.setState({ guardando: false, mensaje: 'No se han podido guardar los cambios.' }));
    }

    render() {
        if (this.state.status) return <Navigate to="/"/>;
        if (!this.state.cargado) return <p role="status">Cargando coche...</p>;
        if (!this.state.coche) return <div><p role="alert" className="error-message">{this.state.mensaje || 'No se ha encontrado el coche.'}</p><NavLink to="/" className="btn-secondary">Volver a coches</NavLink></div>;
        return (
            <div className="mx-auto max-w-2xl">
                <NavLink to="/" className="text-sm font-semibold text-indigo-600">← Volver a coches</NavLink>
                <h1 className="mb-2 mt-6 text-3xl font-bold">Editar coche</h1>
                <p className="mb-6 text-slate-500">Actualiza los datos del vehículo.</p>
                {this.state.mensaje && <p role="alert" className="error-message">{this.state.mensaje}</p>}
                <form onSubmit={this.updateCoche} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div><label htmlFor="id" className="field-label">ID del coche</label><input id="id" type="number" step="1" min="1" max="2147483647" required disabled defaultValue={this.state.coche.idCoche} ref={this.cajaId} className="field"/></div>
                    <div><label htmlFor="marca" className="field-label">Marca</label><input id="marca" type="text" required pattern=".*\S.*" defaultValue={this.state.coche.marca} ref={this.cajaMarca} className="field"/></div>
                    <div><label htmlFor="modelo" className="field-label">Modelo</label><input id="modelo" type="text" required pattern=".*\S.*" defaultValue={this.state.coche.modelo} ref={this.cajaModelo} className="field"/></div>
                    <div><label htmlFor="conductor" className="field-label">Conductor</label><input id="conductor" type="text" required pattern=".*\S.*" defaultValue={this.state.coche.conductor} ref={this.cajaConductor} className="field"/></div>
                    <div><label htmlFor="imagen" className="field-label">URL de la imagen (opcional)</label><input id="imagen" type="url" pattern="https?://.*" defaultValue={this.state.coche.imagen} ref={this.cajaImagen} className="field" placeholder="https://..."/></div>
                    <div className="flex gap-3 pt-3"><button type="submit" className="btn-primary" disabled={this.state.guardando}>{this.state.guardando ? 'Guardando...' : 'Guardar cambios'}</button><NavLink to="/" className="btn-secondary">Cancelar</NavLink></div>
                </form>
            </div>
        );
    }
}


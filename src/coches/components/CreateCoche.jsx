import React, { Component } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import ServiceCoches from '../services/ServiceCoches';

export default class CreateCoche extends Component {
    service = new ServiceCoches();
    cajaId = React.createRef();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();
    state = { status: false, guardando: false, mensaje: null };

    insertCoche = (event) => {
        event.preventDefault();
        let coche = {
            idCoche: parseInt(this.cajaId.current.value),
            marca: this.cajaMarca.current.value.trim(),
            modelo: this.cajaModelo.current.value.trim(),
            conductor: this.cajaConductor.current.value.trim(),
            imagen: this.cajaImagen.current.value.trim()
        };
        this.setState({ guardando: true, mensaje: null });
        this.service.insertCoche(coche).then(() => {
            this.setState({ status: true });
        }).catch(() => this.setState({ guardando: false, mensaje: 'No se ha podido insertar el coche. Comprueba que el ID no exista.' }));
    }

    render() {
        if (this.state.status) return <Navigate to="/"/>;
        return (
            <div className="mx-auto max-w-2xl">
                <NavLink to="/" className="text-sm font-semibold text-indigo-600">← Volver a coches</NavLink>
                <h1 className="mb-2 mt-6 text-3xl font-bold">Nuevo coche</h1>
                <p className="mb-6 text-slate-500">Añade un vehículo a tu colección.</p>
                {this.state.mensaje && <p role="alert" className="error-message">{this.state.mensaje}</p>}
                <form onSubmit={this.insertCoche} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div><label htmlFor="id" className="field-label">ID del coche</label><input id="id" type="number" step="1" min="1" max="2147483647" required ref={this.cajaId} className="field"/></div>
                    <div><label htmlFor="marca" className="field-label">Marca</label><input id="marca" type="text" required pattern=".*\S.*" ref={this.cajaMarca} className="field"/></div>
                    <div><label htmlFor="modelo" className="field-label">Modelo</label><input id="modelo" type="text" required pattern=".*\S.*" ref={this.cajaModelo} className="field"/></div>
                    <div><label htmlFor="conductor" className="field-label">Conductor</label><input id="conductor" type="text" required pattern=".*\S.*" ref={this.cajaConductor} className="field"/></div>
                    <div><label htmlFor="imagen" className="field-label">URL de la imagen (opcional)</label><input id="imagen" type="url" pattern="https?://.*" ref={this.cajaImagen} className="field" placeholder="https://..."/></div>
                    <div className="flex gap-3 pt-3"><button type="submit" className="btn-primary" disabled={this.state.guardando}>{this.state.guardando ? 'Guardando...' : 'Insertar coche'}</button><NavLink to="/" className="btn-secondary">Cancelar</NavLink></div>
                </form>
            </div>
        );
    }
}

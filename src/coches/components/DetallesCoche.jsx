import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceCoches from '../services/ServiceCoches';

export default class DetallesCoche extends Component {
    service = new ServiceCoches();
    state = { coche: null, status: false, mensaje: null };

    componentDidMount() {
        this.service.findCoche(this.props.id).then((result) => {
            this.setState({ coche: result, status: true });
        }).catch(() => this.setState({ mensaje: 'No se ha podido consultar el coche.', status: true }));
    }

    render() {
        if (!this.state.status) return <p role="status">Cargando coche...</p>;
        let coche = this.state.coche;
        return (
            <div>
                <NavLink to="/" className="text-sm font-semibold text-indigo-600">← Volver a coches</NavLink>
                {this.state.mensaje && <p role="alert" className="error-message mt-6">{this.state.mensaje}</p>}
                {!coche && !this.state.mensaje && <p className="mt-6">No se ha encontrado el coche.</p>}
                {coche && <article className="mt-6 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
                    <div className="flex min-h-72 items-center justify-center bg-slate-100 text-slate-400">
                        {coche.imagen ? <img src={coche.imagen} alt={coche.marca + ' ' + coche.modelo} className="h-full max-h-96 w-full object-cover"/> : 'Sin imagen'}
                    </div>
                    <div className="p-8">
                        <p className="text-sm font-bold text-indigo-600">Detalles del coche #{coche.idCoche}</p>
                        <h1 className="mt-3 text-3xl font-bold">{coche.marca} {coche.modelo}</h1>
                        <dl className="my-8 space-y-4"><div><dt className="text-sm text-slate-500">Marca</dt><dd className="font-semibold">{coche.marca}</dd></div><div><dt className="text-sm text-slate-500">Modelo</dt><dd className="font-semibold">{coche.modelo}</dd></div><div><dt className="text-sm text-slate-500">Conductor</dt><dd className="font-semibold">{coche.conductor}</dd></div></dl>
                        <NavLink to={'/update/' + coche.idCoche} className="btn-primary">Editar coche</NavLink>
                    </div>
                </article>}
            </div>
        );
    }
}

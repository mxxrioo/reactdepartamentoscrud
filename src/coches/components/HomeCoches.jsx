import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceCoches from '../services/ServiceCoches';

export default class HomeCoches extends Component {
    service = new ServiceCoches();
    state = { coches: [], status: false, mensaje: null, eliminando: null };

    loadCoches = () => {
        this.setState({ status: false, mensaje: null });
        this.service.getCoches().then((result) => {
            this.setState({ coches: result, status: true });
        }).catch(() => this.setState({ mensaje: 'No se han podido cargar los coches.', status: true }));
    }

    deleteCoche = (id) => {
        if (window.confirm('¿Quieres eliminar el coche ' + id + '?')) {
            this.setState({ eliminando: id, mensaje: null });
            this.service.deleteCoche(id).then(() => {
                this.setState({ eliminando: null });
                this.loadCoches();
            }).catch(() => this.setState({ mensaje: 'No se ha podido eliminar el coche.', eliminando: null }));
        }
    }

    componentDidMount() {
        this.loadCoches();
    }

    render() {
        return (
            <div>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div><p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">Tu colección</p>
                        <h1 className="text-4xl font-bold tracking-tight">Coches</h1>
                        <p className="mt-3 text-slate-500">Consulta y gestiona los vehículos de tu garaje.</p></div>
                    <NavLink to="/create" className="btn-primary">+ Añadir coche</NavLink>
                </div>
                {this.state.mensaje && <p role="alert" className="error-message">{this.state.mensaje} <button onClick={this.loadCoches} className="underline">Reintentar</button></p>}
                {!this.state.status ? <p role="status">Cargando coches...</p> :
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {this.state.coches.map((coche) => (
                            <article key={coche.idCoche} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex h-48 items-center justify-center bg-slate-100 text-slate-400">
                                    {coche.imagen ? <img src={coche.imagen} alt={coche.marca + ' ' + coche.modelo} className="h-full w-full object-cover"/> : 'Sin imagen'}
                                </div>
                                <div className="p-5">
                                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Coche #{coche.idCoche}</p>
                                    <h2 className="mt-2 text-xl font-bold">{coche.marca} {coche.modelo}</h2>
                                    <p className="mb-5 mt-2 text-sm text-slate-500">Conductor: {coche.conductor}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <NavLink className="btn-primary" to={'/detalles/' + coche.idCoche}>Detalles</NavLink>
                                        <NavLink className="btn-secondary" to={'/update/' + coche.idCoche}>Editar</NavLink>
                                        <button className="btn-danger" disabled={this.state.eliminando !== null} onClick={() => this.deleteCoche(coche.idCoche)}>{this.state.eliminando === coche.idCoche ? 'Eliminando...' : 'Eliminar'}</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                        {!this.state.mensaje && this.state.coches.length === 0 && <p>Todavía no hay coches. Añade el primero.</p>}
                    </div>
                }
            </div>
        );
    }
}

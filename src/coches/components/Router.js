import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams, NavLink } from 'react-router-dom';
import HomeCoches from './HomeCoches';
import CreateCoche from './CreateCoche';
import UpdateCoche from './UpdateCoche';
import DetallesCoche from './DetallesCoche';

export default class Router extends Component {
    render() {
        function UpdateCocheElement() {
            let { id } = useParams();
            return <UpdateCoche key={id} id={id}/>;
        }
        function DetallesCocheElement() {
            let { id } = useParams();
            return <DetallesCoche key={id} id={id}/>;
        }
        return (
            <BrowserRouter>
                <header className="border-b border-slate-200 bg-white">
                    <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                        <NavLink to="/" className="text-xl font-black tracking-tight text-slate-900">Garaje<span className="text-indigo-600">.</span></NavLink>
                        <div className="flex gap-3">
                            <NavLink to="/" end className={({isActive}) => isActive ? 'btn-primary' : 'btn-secondary'}>Coches</NavLink>
                            <NavLink to="/create" className={({isActive}) => isActive ? 'btn-primary' : 'btn-secondary'}>Nuevo coche</NavLink>
                        </div>
                    </nav>
                </header>
                <main className="mx-auto max-w-6xl px-6 py-10">
                    <Routes>
                        <Route path="/" element={<HomeCoches/>}/>
                        <Route path="/create" element={<CreateCoche/>}/>
                        <Route path="/update/:id" element={<UpdateCocheElement/>}/>
                        <Route path="/detalles/:id" element={<DetallesCocheElement/>}/>
                        <Route path="*" element={<p>Página no encontrada. <NavLink to="/" className="text-indigo-600">Volver al listado</NavLink></p>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        );
    }
}

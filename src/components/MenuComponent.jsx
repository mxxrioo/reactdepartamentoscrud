import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logo from './../assets/images/deadpool.jpg'
export default class MenuComponent extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}} data-bs-theme="light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                        <img src={logo} style={{width:"60px"}}/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/hospitales">Hospitales</NavLink>
                    </li>                      
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/create">Create</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/createotro">Otro Create</NavLink>
                    </li>                    
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>        
        )
    }
}

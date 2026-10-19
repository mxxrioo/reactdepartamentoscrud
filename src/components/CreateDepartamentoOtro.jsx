import React, { Component } from 'react';
 
export default class CrearDepa extends Component {
 
    state = {
        status: false,
        msg: '',
    }
 
 
 
    realizarAcciones = () => {
        console.log("Haciendo algo")
    }
 
    render() {
        return (
            <div>
                    <button className='btn btn-info'
                    onClick={this.realizarAcciones}>
                        Acciones
                        </button>
                    </div>
        );
    }
} 

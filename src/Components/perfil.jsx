import React from 'react';
import '../Style/formularios.css';

function Perfil() {
    return (
    <div className="profile-container">
        <div className="profile-box">
            <h2 className='h2-form'>Mi perfil</h2>
            <div className='columns-box'>
                <div className='column'>
                    <input type="name" placeholder="Nombre" className='input-form'/>
                    <input type="surname" placeholder="Apellido" className='input-form'/>
                    <button className='button-form'>Editar perfil</button>
                </div>
                <div className='column'>
                    <input type="tel" placeholder="Número de teléfono" className='input-form'/>
                    <input type="password" placeholder="Contraseña" className='input-form'/>
                    <button className='button-error'>Cerrar sesión</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Perfil;
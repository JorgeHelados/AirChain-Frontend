import React from 'react';
import '../Style/perfil.css';

function Perfil() {
    return (
        <div className="perfil-page profile-container">
            <div className="profile-box">
                <h2 className='h2-perfil'>Mi perfil</h2>
                <div className='columns-box'>
                    <div className='column-perfil'>
                        <p className='p-perfil'>¿Has cambiado de nombre o apellidos?</p>
                        <input type="text" placeholder="Nombre" className='perfil-input'/>
                        <input type="text" placeholder="Apellidos" className='perfil-input'/>
                    </div>
                    <div className='column-perfil'>
                        <button className='button-perfil'>Editar nombre</button>
                    </div>
                </div>

                <div className='columns-box'>
                    <div className='column-perfil'>
                        <p className='p-perfil'>¿Has cambiado de número de teléfono?</p>
                        <input type="tel" placeholder="Numero de teléfono" className='perfil-input'/>
                    </div>
                    <div className='column-perfil'>
                        <button className='button-perfil'>Editar número de teléfono</button>
                    </div>
                </div>

                <div className='columns-box'>
                    <div className='column-perfil'>
                        <p className='p-perfil'>Escriba primero su contraseña actual y posteriormente su nueva contraseña</p>
                        <input type="password" placeholder="Contraseña Actual" className='perfil-input'/>
                        <input type="password" placeholder="Contraseña Nueva" className='perfil-input'/>
                    </div>
                    <div className='column-perfil'>
                        <button className='button-perfil'>Editar contraseña</button>
                    </div>
                </div>

                <div className='columns-box'>
                    <div className='column-perfil'>
                        <button className='button-logout'>Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;

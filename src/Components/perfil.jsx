import React, { useEffect, useState } from 'react';
import '../Style/perfil.css';
import { cargarDatosPerfil, actualizarNombreApellidos, actualizarTelefono, cambiarContrasena } from '../js/miPerfil';

function Perfil() {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasenaActual, setContrasenaActual] = useState('');
    const [contrasenaNueva, setContrasenaNueva] = useState('');
    const [contrasenaNueva2] = useState('');

    // Cargar datos del perfil al montar el componente
    useEffect(() => {
        const cargarPerfil = async () => {
            const correo = sessionStorage.getItem("usuarioCorreo");
            console.log(correo);

            // if (!correo) {
            //     alert("No has iniciado sesión");
            //     window.location.href = "login";
            //     return;
            // }

            try {
                const data = await cargarDatosPerfil(correo);
                console.log(data);
                setNombre(data.Nombre);
                setApellidos(data.Apellidos);
                setTelefono(data.Telefono);
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error);
            }
        };

        cargarPerfil();
    }, []);

    const manejarActualizarNombre = () => {
        const correo = sessionStorage.getItem("usuarioCorreo");
        actualizarNombreApellidos(correo, nombre, apellidos, telefono);
    };


    const manejarActualizarTelefono = () => {
        console.log(telefono);
        const correo = sessionStorage.getItem("usuarioCorreo");
        actualizarTelefono(correo, telefono, nombre, apellidos);
    };

    const manejarCambioContrasena = () => {
        const correo = sessionStorage.getItem("usuarioCorreo");
        if (!contrasenaActual || !contrasenaNueva) {
            alert("Debe llenar ambos campos de contraseña.");
            return;
        }
        if (contrasenaNueva !== contrasenaNueva2) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        cambiarContrasena(correo, contrasenaActual, contrasenaNueva);
    };


    return (

        <div className="perfil-page profile-container">
            <div className="profile-box">
                <h2 className='h2-perfil'>Mi perfil</h2>
                <div className='columns-box'>
                    <div className='column-perfil'>
                        <p className='p-perfil'>¿Has cambiado de nombre o apellidos?</p>
                        <input
                            type="text" 
                            placeholder="Nombre" 
                            className='perfil-input' 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)}
                         />
                        <input
                            type="text" 
                            placeholder="Apellidos" 
                            className='perfil-input' 
                            value={apellidos} 
                            onChange={(e) => setApellidos(e.target.value)}
                         />
                    </div>
                    <div className='column-perfil'>
                        <button className='button-perfil' onClick={manejarActualizarNombre}>Editar nombre</button>
                    </div>
                </div>

                <div className='columns-box'>
                    <div className='column-perfil'>
                        <p className='p-perfil'>¿Has cambiado de número de teléfono?</p>
                        <input
                            type="tel" 
                            placeholder="Numero de teléfono" 
                            className='perfil-input' 
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)}
                         />
                    </div>
                    <div className='column-perfil'>
                        <button className='button-perfil' onClick={manejarActualizarTelefono}>Editar número de teléfono</button>
                    </div>
                </div>

                <div className='columns-box'>
                    <div className='column-perfil'>
                        <p className='p-perfil'>Escriba primero su contraseña actual y posteriormente su nueva contraseña</p>
                        <input 
                            type="password" 
                            placeholder="Contraseña Actual" 
                            className='perfil-input' 
                            value={contrasenaActual} 
                            onChange={(e) => setContrasenaActual(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña Nueva" 
                            className='perfil-input' 
                            value={contrasenaNueva} 
                            onChange={(e) => setContrasenaNueva(e.target.value)}
                        />
                                                <input 
                            type="password" 
                            placeholder="Vuelva a escribir su contraseña nueva" 
                            className='perfil-input' 
                            value={contrasenaNueva2} 
                            onChange={(e) => setContrasenaNueva(e.target.value)}
                        />
                    </div>
                    <div className='column-perfil'>
                        <button className='button-perfil' onClick={manejarCambioContrasena}>Editar contraseña</button>
                    </div>
                </div>

                <div className='columns-box'>
                    <div className='column-perfil'>
                        <button className='button-logout' onClick={() => {
                            sessionStorage.removeItem("usuarioCorreo");
                            window.location.href = "/login";
                        }}>Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;


import '../Style/perfil.css';
import React, { useEffect, useState } from 'react';

import { cargarDatosPerfil, actualizarPerfil } from '../js/miPerfil'; // Importar las funciones


function Perfil() {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    
    // Simulación del correo del usuario, normalmente lo obtendrías del login o localStorage
    const correoUsuario = "usuario@example.com";

    // Cargar los datos del perfil al montar el componente
    useEffect(() => {
        const obtenerDatosPerfil = async () => {
            try {
                const datos = await cargarDatosPerfil(correoUsuario); // Llamar a la función para cargar los datos
                setNombre(datos.Nombre);
                setApellidos(datos.Apellidos);
                setTelefono(datos.Telefono);
            } catch (error) {
                console.error("Error al obtener los datos del perfil:", error);
            }
        };

        obtenerDatosPerfil();
    }, [correoUsuario]);

    // Manejar la edición del perfil
    const handleEditarPerfil = () => {
        const datosPerfil = {
            Nombre: nombre,
            Apellidos: apellidos,
            Telefono: telefono,
            Contrasenya: contrasenya,
        };

        actualizarPerfil(correoUsuario, datosPerfil); // Llamar a la función para actualizar el perfil
    };

    return (
<<<<<<< Updated upstream
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
=======
        <div className="profile-container">
            <div className="profile-box">
                <h2 className='h2-form'>Mi perfil</h2>
                <div className='columns-box'>
                    <div className='column'>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className='input-form'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            className='input-form'
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                        <button className='button-form' onClick={handleEditarPerfil}>
                            Editar perfil
                        </button>
                    </div>
                    <div className='column'>
                        <input
                            type="tel"
                            placeholder="Número de teléfono"
                            className='input-form'
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className='input-form'
                            value={contrasenya}
                            onChange={(e) => setContrasenya(e.target.value)}
                        />
                        <button className='button-error'>
                            Cerrar sesión
                        </button>
>>>>>>> Stashed changes
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;

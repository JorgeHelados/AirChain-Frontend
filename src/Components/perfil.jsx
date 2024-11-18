import React, { useEffect, useState } from 'react';
import '../Style/perfil.css';
import {
    cargarDatosPerfil,
    actualizarNombreApellidos,
    actualizarTelefono,
    cambiarContrasena,
} from '../js/miPerfil';

function Perfil() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        telefono: '',
        contrasenaActual: '',
        contrasenaNueva: '',
        contrasenaNueva2: '',
    });

    const { nombre, apellidos, telefono, contrasenaActual, contrasenaNueva, contrasenaNueva2 } = formData;

    useEffect(() => {
        const cargarPerfil = async () => {
            const correo = sessionStorage.getItem('usuarioCorreo');
            try {
                const data = await cargarDatosPerfil(correo);
                setFormData({
                    nombre: data.Nombre,
                    apellidos: data.Apellidos,
                    telefono: data.Telefono,
                    contrasenaActual: '',
                    contrasenaNueva: '',
                    contrasenaNueva2: '',
                });
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error);
            }
        };

        cargarPerfil();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const manejarActualizarNombre = () => {
        const correo = sessionStorage.getItem('usuarioCorreo');
        actualizarNombreApellidos(correo, nombre, apellidos, telefono);
    };

    const manejarCambioContrasena = () => {
        if (!contrasenaActual || !contrasenaNueva) {
            alert('Debe llenar ambos campos de contraseña.');
            return;
        }

        if (contrasenaNueva !== contrasenaNueva2) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const correo = sessionStorage.getItem('usuarioCorreo');
        cambiarContrasena(correo, contrasenaActual, contrasenaNueva);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('usuarioCorreo');
        window.location.href = '/login';
    };

    return (
        <div className="form-container">
            <form className="form">
                <h1 className="title">Mi perfil</h1>

                <p>¿Has cambiado de nombre o apellidos?</p>
                <div className="flex">
                    <label>
                        <input
                            type="text"
                            name="nombre"
                            className="input"
                            value={nombre}
                            onChange={handleChange}
                        />
                        <span>Nombre</span>
                    </label>
                    <label>
                        <input
                            type="text"
                            name="apellidos"
                            className="input"
                            value={apellidos}
                            onChange={handleChange}
                        />
                        <span>Apellido</span>
                    </label>
                    <label>
                    <input
                        type="tel"
                        name="telefono"
                        className="input"
                        value={telefono}
                        onChange={handleChange}
                    />
                    <span>Número de teléfono</span>
                </label>
                </div>
                <button className="button-form" onClick={manejarActualizarNombre}>
                    Editar datos personales
                </button>

                <p>Escriba primero su contraseña actual y posteriormente su nueva contraseña</p>
                <div className="flex">
                    <label>
                        <input
                            type="password"
                            name="contrasenaActual"
                            className="input"
                            value={contrasenaActual}
                            onChange={handleChange}
                        />
                        <span>Contraseña actual</span>
                    </label>                
                    <label>
                        <input
                            type="password"
                            name="contrasenaNueva"
                            className="input"
                            value={contrasenaNueva}
                            onChange={handleChange}
                        />
                        <span>Contraseña nueva</span>
                    </label>
                    <label>
                        <input
                            type="password"
                            name="contrasenaNueva2"
                            className="input"
                            value={contrasenaNueva2}
                            onChange={handleChange}
                        />
                        <span>Repetir contraseña actual</span>
                    </label>
                </div>

                <button className="button-form" onClick={manejarCambioContrasena}>
                    Editar contraseña
                </button>

                <button className="button-error" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </form>
        </div>
    );
}

export default Perfil;

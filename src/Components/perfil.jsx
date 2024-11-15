import React, { useEffect, useState } from 'react';
import '../Style/perfil.css';
import {
    cargarDatosPerfil,
    actualizarNombreApellidos,
    actualizarTelefono,
    cambiarContrasena
} from '../js/miPerfil';

function Perfil() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        telefono: '',
        contrasenaActual: '',
        contrasenaNueva: '',
        contrasenaNueva2: ''
    });

    const { nombre, apellidos, telefono, contrasenaActual, contrasenaNueva, contrasenaNueva2 } = formData;

    // Cargar datos del perfil al montar el componente
    useEffect(() => {
        const cargarPerfil = async () => {
            const correo = sessionStorage.getItem("usuarioCorreo");
            console.log(correo);

            if (!correo) {
                alert("No has iniciado sesión");
                window.location.href = "login";
                return;
            }

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const manejarActualizarNombre = () => {
        const correo = sessionStorage.getItem('usuarioCorreo');
        actualizarNombreApellidos(correo, nombre, apellidos, telefono);
    };

    const manejarActualizarTelefono = () => {
        const correo = sessionStorage.getItem('usuarioCorreo');
        actualizarTelefono(correo, telefono, nombre, apellidos);
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
        <div className="perfil-page">
            <div className="perfil-box">
                <h2 className="h2-perfil">Mi perfil</h2>

                <p className="p-perfil">¿Has cambiado de nombre o apellidos?</p>
                <div className="columns-box">
                    <div className="column-perfil">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            className="perfil-input"
                            value={nombre}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="apellidos"
                            placeholder="Apellidos"
                            className="perfil-input"
                            value={apellidos}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Número de teléfono"
                            className="perfil-input"
                            value={telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="column-boton">
                        <button className="button-perfil" onClick={manejarActualizarNombre}>
                            Editar datos personales
                        </button>
                    </div>
                </div>

                <p className="p-perfil">
                    Escriba primero su contraseña actual y posteriormente su nueva contraseña
                </p>
                <div className="columns-box">
                    <div className="column-perfil">
                        <input
                            type="password"
                            name="contrasenaActual"
                            placeholder="Contraseña Actual"
                            className="perfil-input"
                            value={contrasenaActual}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="contrasenaNueva"
                            placeholder="Contraseña Nueva"
                            className="perfil-input"
                            value={contrasenaNueva}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="contrasenaNueva2"
                            placeholder="Repetir Contraseña Nueva"
                            className="perfil-input"
                            value={contrasenaNueva2}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="column-boton">
                        <button className="button-perfil" onClick={manejarCambioContrasena}>
                            Editar contraseña
                        </button>
                    </div>
                </div>

                <button className="button-logout" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default Perfil;

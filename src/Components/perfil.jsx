import React, { useEffect, useState } from 'react';
import '../Style/perfil.css';
import { cargarDatosPerfil, actualizarPerfil, cambiarContrasena } from '../js/miPerfil';

const MiPerfil = () => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    correo: "",
  });
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [contrasenaActual, setContrasenaActual] = useState("");

  // Cargar los datos del perfil al montar el componente
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

  // Manejar cambios en los campos de perfil
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevPerfil) => ({
      ...prevPerfil,
      [name]: value,
    }));
  };

  // Manejar actualización del perfil
  const handleActualizarPerfil = () => {
    const { id, nombre, apellidos, telefono } = formData;
    actualizarPerfil(id, nombre, apellidos, telefono)
      .then((data) => {
        alert("Perfil actualizado exitosamente.");
        setFormData((prevPerfil) => ({
          ...prevPerfil,
          ...data,
        }));
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
        alert("Hubo un error al actualizar el perfil.");
      });
  };

  // Manejar cambio de contraseña
  const handleCambiarContrasena = () => {
    if (!contrasenaActual || !nuevaContrasena) {
      alert("Por favor, complete ambos campos para cambiar la contraseña.");
      return;
    }

    cambiarContrasena(formData.id, contrasenaActual, nuevaContrasena)
      .then(() => {
        alert("Contraseña actualizada exitosamente.");
        setContrasenaActual("");
        setNuevaContrasena("");
      })
      .catch((error) => {
        console.error("Error al cambiar la contraseña:", error);
        alert("Hubo un error al cambiar la contraseña.");
      });
  };

  // Manejar cierre de sesión
  const handleCerrarSesion = () => {
    sessionStorage.clear();
    alert("Sesión cerrada. Por favor, vuelve a iniciar sesión.");
  };

  return (
  <div className="form-container">
  <form className="form">
      <h1 className="title">Mi perfil</h1>

      <p>¿Has cambiado tus datos personales?</p>
      <div className="flex">
          <label>
              <input
                  type="text"
                  name="nombre"
                  className="input"
                  value={formData.nombre}
                  onChange={handleInputChange}
              />
              <span>Nombre</span>
          </label>
          <label>
              <input
                  type="text"
                  name="apellidos"
                  className="input"
                  value={formData.apellidos}
                  onChange={handleInputChange}
              />
              <span>Apellido</span>
          </label>
          <label>
          <input
              type="tel"
              name="telefono"
              className="input"
              value={formData.telefono}
              onChange={handleInputChange}
          />
          <span>Número de teléfono</span>
      </label>
      </div>
      <button className="button-form" onClick={handleActualizarPerfil}>
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
                  onChange={(e) => setContrasenaActual(e.target.value)}
              />
              <span>Contraseña actual</span>
          </label>                
          <label>
              <input
                  type="password"
                  name="contrasenaNueva"
                  className="input"
                  value={nuevaContrasena}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
              />
              <span>Contraseña nueva</span>
          </label>
          <label>
              <input
                  type="password"
                  name="contrasenaNueva2"
                  className="input"
                  value={nuevaContrasena}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
              />
              <span>Repetir contraseña actual</span>
          </label>
      </div>

      <button className="button-form" onClick={handleCambiarContrasena}>
          Editar contraseña
      </button>

      <button className="button-error" onClick={handleCerrarSesion}>
          Cerrar sesión
      </button>
  </form>
  </div>
  );
};

export default MiPerfil;

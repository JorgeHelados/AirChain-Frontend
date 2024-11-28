import React, { useEffect, useState } from 'react';
import '../Style/perfil.css';
import { cargarDatosPerfil, actualizarPerfil, cambiarContrasena } from '../js/miPerfil';

const MiPerfil = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');
  const [contrasenaNueva2, setContrasenaNueva2] = useState('');

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


  /*// Manejar cambios en los campos de perfil
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevPerfil) => ({
      ...prevPerfil,
      [name]: value,
    }));
  };*/

  const handleActualizarPerfil = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    const correo = sessionStorage.getItem("usuarioCorreo");
    actualizarPerfil(correo, nombre, apellidos, telefono);
  };
  

  // Manejar cambio de contraseña
  const handleCambiarContrasena = () => {
    const correo = sessionStorage.getItem("usuarioCorreo");
    if (!contrasenaActual || !contrasenaNueva) {
        alert("Debe llenar ambos campos de contraseña.");
        return;
    }

    if(contrasenaNueva != contrasenaNueva2){
      alert("La nueva contraseña no coincide.");
      return;
    }

    cambiarContrasena(correo, contrasenaActual, contrasenaNueva);
  };

  // Manejar cierre de sesión
  const handleCerrarSesion = () => {
    sessionStorage.clear();
    alert("Sesión cerrada. Por favor, vuelve a iniciar sesión.");
  };

  return (
<div className="form-container">
  <form className="form" >
    <h1 className="title">Mi perfil</h1>

    <p>¿Has cambiado tus datos personales?</p>
    <div className="flex">
      <label>
        <input
          type="text"
          name="nombre"
          className="input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <span>Nombre</span>
      </label>
      <label>
        <input
          type="text"
          name="apellidos"
          className="input"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        <span>Apellido</span>
      </label>
      <label>
        <input
          type="tel"
          name="telefono"
          className="input"
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)}
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
          value={contrasenaNueva}
          onChange={(e) => setContrasenaNueva(e.target.value)}
        />
        <span>Contraseña nueva</span>
      </label>
      <label>
        <input
          type="password"
          name="contrasenaNueva2"
          className="input"
          value={contrasenaNueva2}
          onChange={(e) => setContrasenaNueva2(e.target.value)}
        />
        <span>Repetir nueva contraseña</span>
      </label>
    </div>

    <button className="button-form" type="button" onClick={handleCambiarContrasena}>
      Editar contraseña
    </button>

    <button className="button-error" type="button" onClick={handleCerrarSesion}>
      Cerrar sesión
    </button>
  </form>
</div>

  );
};

export default MiPerfil;

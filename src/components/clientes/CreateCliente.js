import React, { useState } from "react";
import axios from "axios";

const CreateCliente = ({ onClienteCreated }) => {
  const [cliente, setCliente] = useState({
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    contacto: "",
    genero: "",
  });

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('creando cliente ' + process.env.BACKEND_URL)
      const response = await axios.post(
        `${process.env.BACKEND_URL}/cliente`,
        cliente
      );
      console.log(response.data);
      alert("Cliente creado con éxito");
      onClienteCreated(); // Llama a esta función para actualizar la lista de clientes
      setCliente({
        // Resetea el formulario
        nombre_1: "",
        nombre_2: "",
        apellido_1: "",
        apellido_2: "",
        contacto: "",
        genero: "",
      });
    } catch (error) {
      console.error("Error creando cliente", error);
      alert("Hubo un error creando el cliente. Verifica la consola.");
    }
  };

  return (
    <div className="container">
      <h2>Crear Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre_1"
            value={cliente.nombre_1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Segundo Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre_2"
            value={cliente.nombre_2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Primer Apellido:</label>
          <input
            type="text"
            className="form-control"
            name="apellido_1"
            value={cliente.apellido_1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Segundo Apellido:</label>
          <input
            type="text"
            className="form-control"
            name="apellido_2"
            value={cliente.apellido_2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contacto:</label>
          <input
            type="text"
            className="form-control"
            name="contacto"
            value={cliente.contacto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Género:</label>
          <select
            className="form-control"
            name="genero"
            value={cliente.genero}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <h1></h1>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
        
      </form>
    </div>
  );
};

export default CreateCliente;

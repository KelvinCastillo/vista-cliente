import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCliente = ({ clienteId, onClienteUpdated }) => {
  const [cliente, setCliente] = useState({
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    contacto: "",
    genero: "",
  });

  // Cargar los datos del cliente
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cliente/${clienteId}`
        );
        setCliente(response.data);
      } catch (error) {
        console.error("Error fetching información del Cliente", error);
        setError("Hubo un problema al cargar los datos del cliente.");
      }
    };

    if (clienteId) {
      fetchCliente();
    }
  }, [clienteId]);

  {
    error && <div className="alert alert-danger">{error}</div>;
  }

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);


  //Actualizar el Cliente
  const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await axios.patch(`http://localhost:3000/cliente/${clienteId}`, cliente);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // El mensaje desaparece después de 3 segundos
    onClienteUpdated();
  } catch (error) {
    console.error('Error updating cliente', error);
    alert('Hubo un error actualizando el cliente');
  } finally {
    setLoading(false);
  }
};
{success && <div className="alert alert-success">Cliente actualizado con éxito</div>}


  return (
    <div className="container">
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Primer Nombre:</label>
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

        <button type="submit" className="btn btn-primary">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditCliente;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientesList.css"; // Archivo CSS para el diseño
import tituloClientes from "../../imagenes/titulo-clientes.png"; // Importa la imagen

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]); // Estado para los clientes filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [editingCliente, setEditingCliente] = useState(null); // Almacena el cliente que se está editando
  const [cliente, setCliente] = useState({
    nombre_1: "",
    nombre_2: "",
    apellido_1: "",
    apellido_2: "",
    contacto: "",
    genero: "",
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    // Filtra los clientes cuando el término de búsqueda cambia
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nombre_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.apellido_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.genero.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClientes(filtered);
  }, [searchTerm, clientes]);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cliente`);
      setClientes(response.data);
      setFilteredClientes(response.data); // Inicialmente muestra todos los clientes
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const deleteCliente = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cliente/${id}`);
      fetchClientes();
    } catch (error) {
      console.error("Error deleting client", error);
    }
  };

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCliente) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/cliente/${editingCliente.id_cliente}`,
          cliente
        );
        alert("Cliente actualizado con éxito");
      } catch (error) {
        console.error("Error actualizando cliente", error);
        alert("Hubo un error actualizando el cliente");
      }
    } else {
      try {
        console.log('ruta configurada ' + process.env.REACT_APP_BACKEND_URL)
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cliente`, cliente);
        alert("Cliente creado con éxito");
      } catch (error) {
        console.error("Error creando cliente", error);
        alert("Hubo un error creando el cliente");
      }
    }

    resetForm();
    fetchClientes(); // Actualiza la lista
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente); // Establece el cliente que se está editando
    setCliente(cliente); // Rellena el formulario con los datos del cliente
  };

  // Aquí definimos la función resetForm
  const resetForm = () => {
    setCliente({
      nombre_1: "",
      nombre_2: "",
      apellido_1: "",
      apellido_2: "",
      contacto: "",
      genero: "",
    });
    setEditingCliente(null); // Sale del modo edición
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualiza el término de búsqueda
  };

  return (
    <div className="layout-container">
      <div className="blue-side"></div>

      <div className="content">
        {/* Aquí agregamos la imagen */}
        <img src={tituloClientes} alt="Clientes" className="titulo-imagen" />

        <div className="columns-container">
          <section className="form-section">
            <h2>{editingCliente ? "Editar Cliente" : "Crear Cliente"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
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
                  name="nombre_2"
                  value={cliente.nombre_2}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Primer Apellido:</label>
                <input
                  type="text"
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
                  name="apellido_2"
                  value={cliente.apellido_2}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Contacto:</label>
                <input
                  type="text"
                  name="contacto"
                  value={cliente.contacto}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Género:</label>
                <select
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
                {editingCliente ? "Guardar Cambios" : "Crear"}
              </button>

              {/* Botón para salir del modo edición */}
              {editingCliente && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                  style={{ marginLeft: "10px" }}
                >
                  Cancelar
                </button>
              )}
            </form>
          </section>

          <section className="list-section">
            <h2>Lista de Clientes</h2>
            <input
              type="text"
              placeholder="Buscar cliente"
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control mb-3"
            />
            <div className="table-container">
              <table className="table-clientes">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Género</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClientes.map((cliente) => (
                    <tr key={cliente.id_cliente}>
                      <td>{cliente.id_cliente}</td>
                      <td>
                        {cliente.nombre_1} {cliente.apellido_1}
                      </td>
                      <td>{cliente.contacto}</td>
                      <td>{cliente.genero}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(cliente)}
                          className="btn-edit"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteCliente(cliente.id_cliente)}
                          className="btn-delete"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClientesList;

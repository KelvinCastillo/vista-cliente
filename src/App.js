import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import ClientesList from "./components/clientes/ClientesList";


function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div
          className="content"
          style={{ marginLeft: "250px", padding: "20px" }}
        >
          <Routes>
            <Route path="/clientes" element={<ClientesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

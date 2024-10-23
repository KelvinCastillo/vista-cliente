import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxes, faShoppingCart, faUsers, faShoppingBag, faBell } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <a href="/principal">
                        <FontAwesomeIcon icon={faHome} className="icono-menu" />
                        Principal
                    </a>
                </li>
                <li>
                    <a href="/inventario">
                        <FontAwesomeIcon icon={faBoxes} className="icono-menu" />
                        Inventario
                    </a>
                </li>
                <li>
                    <a href="/ventas">
                        <FontAwesomeIcon icon={faShoppingCart} className="icono-menu" />
                        Ventas
                    </a>
                </li>
                <li>
                    <a href="/clientes">
                        <FontAwesomeIcon icon={faUsers} className="icono-menu" />
                        Clientes
                    </a>
                </li>
                <li>
                    <a href="/compras">
                        <FontAwesomeIcon icon={faShoppingBag} className="icono-menu" />
                        Compras
                    </a>
                </li>
                <li>
                    <a href="/avisos">
                        <FontAwesomeIcon icon={faBell} className="icono-menu" />
                        Avisos
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;

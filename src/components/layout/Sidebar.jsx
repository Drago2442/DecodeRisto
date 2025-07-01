import React from "react";
import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    UserIcon,
    CalendarIcon,
    ClipboardIcon,
    UtensilsIcon,
    TableIcon,
    LogOutIcon
} from "../shared/Icons";

const navItems = [
    { label: "Dashboard", to: "/", icon: <HomeIcon /> },
    { label: "Staff", to: "/staff", icon: <UserIcon /> },
    { label: "Turni", to: "/turni", icon: <CalendarIcon /> },
    { label: "Presenze", to: "/presenze", icon: <ClipboardIcon /> },
    { label: "Menu", to: "/menu", icon: <UtensilsIcon /> },
    { label: "Tavoli", to: "/tavoli", icon: <TableIcon /> },
];

export default function Sidebar({ visible, setVisible }) {
    return (
        <>
            <div className={`sidebar ${!visible ? "hidden" : ""}`}>
                <div className="sidebar-logo">
                    <h1>DecodeRisto</h1>
                    <p className="text-sm text-muted">Gestione ristorante</p>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                    onClick={() => setVisible(false)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-user">
                    <div className="user-info">
                        <div className="user-avatar">A</div>
                        <div className="user-details">
                            <h4>Admin</h4>
                            <p>admin@ristorante.it</p>
                        </div>
                    </div>
                    <button className="btn btn-outline w-full">
                        <LogOutIcon /> Logout
                    </button>
                </div>
            </div>

            {/* Overlay per mobile */}
            {visible && (
                <div
                    className="sidebar-overlay show"
                    onClick={() => setVisible(false)}
                ></div>
            )}
        </>
    );
}

import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import useAuth from "./components/auth/useAuth";
import LoginForm from "./components/auth/LoginForm";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

// Pagina principale
import Dashboard from "./components/dashboard/Dashboard";

// Moduli
import StaffList from "./components/staff/StaffList";
import TurniManagement from "./components/turni/TurniManagement";
import PresenzeGiornaliereView from "./components/presenze/PresenzeGiornaliereView";
import ReportMensileView from "./components/presenze/ReportMensileView";
import TimbratureView from "./components/presenze/TimbratureView";
import MenuManagement from "./components/menu/MenuManagement";
import ComandeManagement from "./components/comande/ComandeManagement";
import VisualTavoli from "./components/tavoli/VisualTavoli";

function App() {
    const { user } = useAuth();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const location = useLocation();

    // Se non loggato, mostra Login
    if (!user) {
        return <LoginForm />;
    }

    return (
        <div className="layout">
            <Sidebar visible={sidebarVisible} setVisible={setSidebarVisible} />

            <div className="main">
                <Header setSidebarVisible={setSidebarVisible} />

                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/staff" element={<StaffList />} />
                        <Route path="/turni" element={<TurniManagement />} />
                        <Route path="/presenze" element={<PresenzeGiornaliereView />} />
                        <Route path="/presenze/mensile" element={<ReportMensileView />} />
                        <Route path="/presenze/timbrature" element={<TimbratureView />} />
                        <Route path="/menu" element={<MenuManagement />} />
                        <Route path="/comande" element={<ComandeManagement />} />
                        <Route path="/tavoli" element={<VisualTavoli />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;

import React from 'react'

export const HomeIcon = () => <span role="img" aria-label="home">🏠</span>
export const UsersIcon = () => <span role="img" aria-label="utenti">👥</span>
export const UserCogIcon = () => <span role="img" aria-label="staff">🧑‍💼</span>
export const CalendarIcon = () => <span role="img" aria-label="turni">📅</span>
export const ChefHatIcon = () => <span role="img" aria-label="menu">👨‍🍳</span>
export const ClipboardIcon = () => <span role="img" aria-label="comande">📋</span>
export const ClockIcon = () => <span role="img" aria-label="timbrature">⏱️</span>
export const PieChartIcon = () => <span role="img" aria-label="report">📊</span>
export const ChartIcon = () => <span role="img" aria-label="grafico">📈</span>
export const CoffeeIcon = () => <span role="img" aria-label="caffè">☕</span>
export const MenuIcon = () => <span role="img" aria-label="menu">📖</span>
export const SettingsIcon = () => <span role="img" aria-label="impostazioni">⚙️</span>

export const PlusIcon = () => <span role="img" aria-label="aggiungi">➕</span>
export const TrashIcon = () => <span role="img" aria-label="elimina">🗑️</span>
export const LogOutIcon = () => <span role="img" aria-label="logout">🚪</span>
export const SearchIcon = () => <span role="img" aria-label="cerca">🔍</span>
export const RefreshIcon = () => <span role="img" aria-label="aggiorna">🔄</span>

export const EditIcon = () => <span role="img" aria-label="modifica">✏️</span>
export const SaveIcon = () => <span role="img" aria-label="salva">💾</span>
export const CancelIcon = () => <span role="img" aria-label="annulla">❌</span>
export const InfoIcon = () => <span role="img" aria-label="info">ℹ️</span>
export const WarningIcon = () => <span role="img" aria-label="attenzione">⚠️</span>
export const CheckIcon = () => <span role="img" aria-label="ok">✅</span>
export const CrossIcon = () => <span role="img" aria-label="errore">❌</span>
export const BackIcon = () => <span role="img" aria-label="indietro">🔙</span>
export const ForwardIcon = () => <span role="img" aria-label="avanti">➡️</span>
export const UtensilsIcon = () => <span role="img" aria-label="posate">🍽️</span>
export const LayoutIcon = () => <span>📐</span>
export const TableIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1.3em" width="1.3em" {...props}>
        <rect x="3" y="3" width="18" height="4" rx="1" />
        <rect x="4" y="9" width="2" height="10" rx="1" />
        <rect x="18" y="9" width="2" height="10" rx="1" />
        <rect x="11" y="9" width="2" height="10" rx="1" />
    </svg>
);
export const UserIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1.3em" width="1.3em" {...props}>
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-9 1.7-9 5v2h18v-2c0-3.3-5.7-5-9-5z" />
    </svg>
);

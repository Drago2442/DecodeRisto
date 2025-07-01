import React from 'react'
import { SettingsIcon, UtensilsIcon, ChartIcon, CoffeeIcon, MenuIcon } from '../shared/Icons'

function Header({ toggleSidebar }) {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            borderBottom: '1px solid var(--gray-200)',
            background: '#fff'
        }}>
            <button className="btn btn-sm btn-outline" onClick={toggleSidebar} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <MenuIcon /> Menu
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <SettingsIcon />
            </div>
        </header>
    )
}

export default Header

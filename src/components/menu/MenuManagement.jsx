import React, { useState } from 'react'
import MenuCard from './MenuCard'
import MenuForm from './MenuForm'
import { PlusIcon } from '../shared/Icons'

function MenuManagement() {
    const [menu, setMenu] = useState([
        { id: 1, nome: 'Carbonara', descrizione: 'Pasta con guanciale, uova, pecorino', prezzo: 10, categoria: 'Primo' },
        { id: 2, nome: 'Tiramisù', descrizione: 'Dolce con mascarpone e caffè', prezzo: 5, categoria: 'Dessert' },
    ])
    const [editItem, setEditItem] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const aggiungiPiatto = (nuovo) => {
        nuovo.id = Date.now()
        setMenu(prev => [...prev, nuovo])
        setShowForm(false)
    }

    const modificaPiatto = (aggiornato) => {
        setMenu(prev => prev.map(p => p.id === aggiornato.id ? aggiornato : p))
        setEditItem(null)
        setShowForm(false)
    }

    const eliminaPiatto = (id) => {
        if (!confirm('Eliminare questo piatto?')) return
        setMenu(prev => prev.filter(p => p.id !== id))
    }

    return (
        <>
            <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Gestione Menù</h2>
                    <p>{menu.length} piatto/i disponibili</p>
                </div>
                <button className="btn btn-primary" onClick={() => {
                    setEditItem(null)
                    setShowForm(true)
                }}>
                    <PlusIcon /> Nuovo Piatto
                </button>
            </div>

            <div className="content-body">
                {showForm && (
                    <MenuForm
                        initialData={editItem}
                        onSave={editItem ? modificaPiatto : aggiungiPiatto}
                        onCancel={() => {
                            setEditItem(null)
                            setShowForm(false)
                        }}
                    />
                )}

                <div className="card">
                    <div className="card-content" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 'var(--space-4)'
                    }}>
                        {menu.map(piatto => (
                            <MenuCard
                                key={piatto.id}
                                piatto={piatto}
                                onEdit={() => {
                                    setEditItem(piatto)
                                    setShowForm(true)
                                }}
                                onDelete={() => eliminaPiatto(piatto.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuManagement

import React, { useState } from 'react'
import UserCard from './UserCard'
import UserForm from './UserForm'
import { PlusIcon } from '../shared/Icons'

function UserManagement() {
    const [utenti, setUtenti] = useState([
        { id: 1, full_name: 'Mario Rossi', email: 'mario@example.com', ruolo: 'titolare' },
        { id: 2, full_name: 'Giulia Bianchi', email: 'giulia@example.com', ruolo: 'manager' }
    ])
    const [formOpen, setFormOpen] = useState(false)
    const [editUser, setEditUser] = useState(null)

    const aggiungiUtente = (nuovo) => {
        nuovo.id = Date.now()
        setUtenti(prev => [...prev, nuovo])
        setFormOpen(false)
    }

    const modificaUtente = (aggiornato) => {
        setUtenti(prev => prev.map(u => u.id === aggiornato.id ? aggiornato : u))
        setEditUser(null)
        setFormOpen(false)
    }

    const eliminaUtente = (id) => {
        if (!confirm('Eliminare questo utente?')) return
        setUtenti(prev => prev.filter(u => u.id !== id))
    }

    return (
        <>
            <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Gestione Utenti</h2>
                    <p>{utenti.length} utente/i registrato/i</p>
                </div>
                <button className="btn btn-primary" onClick={() => {
                    setEditUser(null)
                    setFormOpen(true)
                }}>
                    <PlusIcon /> Nuovo Utente
                </button>
            </div>

            <div className="content-body">
                {formOpen && (
                    <UserForm
                        initialData={editUser}
                        onSave={editUser ? modificaUtente : aggiungiUtente}
                        onCancel={() => {
                            setEditUser(null)
                            setFormOpen(false)
                        }}
                    />
                )}

                <div className="card">
                    <div className="card-content" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--space-4)'
                    }}>
                        {utenti.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onEdit={() => {
                                    setEditUser(user)
                                    setFormOpen(true)
                                }}
                                onDelete={() => eliminaUtente(user.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserManagement


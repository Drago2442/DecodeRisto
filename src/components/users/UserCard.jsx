import React from 'react'
import { EditIcon, TrashIcon } from '../shared/Icons'

function UserCard({ user, onEdit, onDelete }) {
    return (
        <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ marginBottom: 'var(--space-2)' }}>
                <strong>{user.full_name}</strong><br />
                <small style={{ color: 'var(--gray-500)' }}>{user.email}</small>
            </div>
            <div style={{ marginBottom: 'var(--space-3)' }}>
                <span className="badge">{user.ruolo}</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button className="btn btn-sm btn-outline" onClick={onEdit}>
                    <EditIcon /> Modifica
                </button>
                <button className="btn btn-sm btn-outline" onClick={onDelete}>
                    <TrashIcon /> Elimina
                </button>
            </div>
        </div>
    )
}

export default UserCard

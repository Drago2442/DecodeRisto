import React from 'react'
import { EditIcon, TrashIcon } from '../shared/Icons'

function MenuCard({ piatto, onEdit, onDelete }) {
    return (
        <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div>
                <strong>{piatto.nome}</strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: 'var(--space-2)' }}>
                    {piatto.categoria}
                </div>
                {piatto.descrizione && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: 'var(--space-2)' }}>
                        {piatto.descrizione}
                    </div>
                )}
                <div style={{ fontWeight: 'bold', marginBottom: 'var(--space-3)' }}>
                    € {piatto.prezzo.toFixed(2)}
                </div>
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

export default MenuCard

import React from 'react'
import { TrashIcon } from '../shared/Icons'

function ComandaCard({ comanda, onUpdateStato, onDelete }) {
    const aggiornaStatoPiatto = (index, nuovoStato) => {
        const nuovaComanda = { ...comanda }
        nuovaComanda.piatti = [...comanda.piatti]
        nuovaComanda.piatti[index] = {
            ...nuovaComanda.piatti[index],
            stato: nuovoStato
        }
        onUpdateStato(comanda.id, nuovaComanda)
    }

    return (
        <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ marginBottom: 'var(--space-2)' }}>
                <strong>Tavolo {comanda.tavolo}</strong><br />
                <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                    {comanda.coperti} coperto/i
                </span>
            </div>

            <div style={{ marginBottom: 'var(--space-3)' }}>
                {comanda.piatti.map((p, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--gray-200)',
                        padding: '0.5rem 0'
                    }}>
                        <div>
                            <div><strong>{p.nome}</strong>{p.a_seguire && <span style={{ fontSize: '0.75rem', marginLeft: '6px', color: 'var(--gray-500)' }}>(a seguire)</span>}</div>
                            <div className="badge badge-default">{p.stato}</div>
                        </div>
                        <select
                            className="input"
                            value={p.stato}
                            onChange={(e) => aggiornaStatoPiatto(i, e.target.value)}
                            style={{ maxWidth: '150px' }}
                        >
                            <option>Ordinato</option>
                            <option>In preparazione</option>
                            <option>Servito</option>
                        </select>
                    </div>
                ))}
            </div>

            <button className="btn btn-sm btn-outline" onClick={onDelete}>
                <TrashIcon /> Elimina
            </button>
        </div>
    )
}

export default ComandaCard

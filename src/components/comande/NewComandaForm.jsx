import React, { useState, useEffect } from 'react'

function NewComandaForm({ tavoloPreselezionato, onSave, onCancel }) {
    const [tavolo, setTavolo] = useState('')
    const [coperti, setCoperti] = useState(1)
    const [piatti, setPiatti] = useState([{ nome: '', a_seguire: false }])

    useEffect(() => {
        if (tavoloPreselezionato) {
            setTavolo(tavoloPreselezionato)
        }
    }, [tavoloPreselezionato])

    const aggiungiPiatto = () => {
        setPiatti([...piatti, { nome: '', a_seguire: false }])
    }

    const aggiornaPiatto = (index, field, value) => {
        const updated = [...piatti]
        updated[index][field] = value
        setPiatti(updated)
    }

    const rimuoviPiatto = (index) => {
        if (piatti.length === 1) return
        setPiatti(piatti.filter((_, i) => i !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!tavolo || !coperti || piatti.some(p => !p.nome)) {
            alert('Compila tutti i campi')
            return
        }

        onSave({
            tavolo,
            coperti,
            piatti: piatti.map(p => ({
                ...p,
                stato: 'Ordinato'
            }))
        })
    }

    return (
        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
            <div className="card-header">
                <h3>Nuova Comanda</h3>
            </div>
            <form className="card-content" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <div style={{ flex: 1 }}>
                        <label>Tavolo *</label>
                        <input
                            className="input"
                            value={tavolo}
                            onChange={(e) => setTavolo(e.target.value)}
                            required
                            readOnly={!!tavoloPreselezionato}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Coperti *</label>
                        <input
                            className="input"
                            type="number"
                            value={coperti}
                            onChange={(e) => setCoperti(parseInt(e.target.value))}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label>Piatti *</label>
                    {piatti.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '0.5rem' }}>
                            <input
                                className="input"
                                placeholder="Nome piatto"
                                value={p.nome}
                                onChange={(e) => aggiornaPiatto(i, 'nome', e.target.value)}
                                required
                            />
                            <label style={{ fontSize: '0.85rem' }}>
                                <input
                                    type="checkbox"
                                    checked={p.a_seguire}
                                    onChange={(e) => aggiornaPiatto(i, 'a_seguire', e.target.checked)}
                                /> A seguire
                            </label>
                            <button type="button" className="btn btn-sm btn-outline" onClick={() => rimuoviPiatto(i)}>✖</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-sm btn-outline" onClick={aggiungiPiatto}>➕ Aggiungi piatto</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                    <button type="button" className="btn btn-outline" onClick={onCancel}>Annulla</button>
                    <button type="submit" className="btn btn-primary">Crea Comanda</button>
                </div>
            </form>
        </div>
    )
}

export default NewComandaForm

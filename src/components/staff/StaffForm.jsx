import React, { useState } from 'react'

function StaffForm({ staff, onClose, onSave, ruoli }) {
    const [formData, setFormData] = useState({
        nome: staff?.nome || '',
        cognome: staff?.cognome || '',
        email: staff?.email || '',
        telefono: staff?.telefono || '',
        ruolo: staff?.ruolo || ruoli[0]?.id || 'cameriere',
        dataAssunzione: staff?.dataAssunzione || new Date().toISOString().split('T')[0],
        note: staff?.note || '',
        stato: staff?.stato || 'attivo'
    })

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.nome.trim() || !formData.cognome.trim() || !formData.email.trim()) {
            alert('Compila tutti i campi obbligatori')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            alert('Inserisci un indirizzo email valido')
            return
        }

        const payload = {
            ...formData,
            id: staff?.id || undefined
        }

        onSave(payload)
    }

    return (
        <div className="modal-backdrop">
            <div className="modal" style={{ maxWidth: '600px' }}>
                <div className="modal-header">
                    <h3>{staff ? 'Modifica Dipendente' : 'Nuovo Dipendente'}</h3>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="form-grid">
                        <div>
                            <label>Nome *</label>
                            <input
                                className="input"
                                value={formData.nome}
                                onChange={e => handleChange('nome', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Cognome *</label>
                            <input
                                className="input"
                                value={formData.cognome}
                                onChange={e => handleChange('cognome', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Email *</label>
                            <input
                                className="input"
                                type="email"
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Telefono</label>
                            <input
                                className="input"
                                value={formData.telefono}
                                onChange={e => handleChange('telefono', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Ruolo *</label>
                            <select
                                className="input"
                                value={formData.ruolo}
                                onChange={e => handleChange('ruolo', e.target.value)}
                                required
                            >
                                {ruoli.map(r => (
                                    <option key={r.id} value={r.id}>{r.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Data Assunzione *</label>
                            <input
                                className="input"
                                type="date"
                                value={formData.dataAssunzione}
                                onChange={e => handleChange('dataAssunzione', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Stato</label>
                            <select
                                className="input"
                                value={formData.stato}
                                onChange={e => handleChange('stato', e.target.value)}
                            >
                                <option value="attivo">Attivo</option>
                                <option value="inattivo">Inattivo</option>
                                <option value="sospeso">Sospeso</option>
                            </select>
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label>Note</label>
                            <textarea
                                className="input"
                                value={formData.note}
                                onChange={e => handleChange('note', e.target.value)}
                                rows="3"
                                placeholder="Note aggiuntive..."
                            />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 'var(--space-2)',
                        marginTop: 'var(--space-6)',
                        paddingTop: 'var(--space-4)',
                        borderTop: '1px solid var(--gray-200)'
                    }}>
                        <button type="button" className="btn btn-outline" onClick={onClose}>Annulla</button>
                        <button type="submit" className="btn btn-primary">
                            {staff ? 'Salva Modifiche' : 'Aggiungi Dipendente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StaffForm

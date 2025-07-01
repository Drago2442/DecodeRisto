import React, { useState } from 'react'

function TimbratureForm({ staff, tipiTimbratura, onClose, onSave }) {
    const [formData, setFormData] = useState({
        staffId: staff[0]?.id || '',
        tipo: 'entrata',
        ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        note: ''
    })

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.staffId || !formData.tipo || !formData.ora) {
            alert('Compila tutti i campi obbligatori')
            return
        }

        const payload = {
            staffId: parseInt(formData.staffId),
            tipo: formData.tipo,
            ora: formData.ora,
            note: formData.note.trim()
        }

        onSave(payload)
        onClose()
    }

    return (
        <div className="modal-backdrop">
            <div className="modal" style={{ maxWidth: '400px' }}>
                <div className="modal-header">
                    <h3>Nuova Timbratura</h3>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-content">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div>
                            <label>Dipendente *</label>
                            <select
                                className="input"
                                value={formData.staffId}
                                onChange={e => handleChange('staffId', e.target.value)}
                                required
                            >
                                {staff.map(d => (
                                    <option key={d.id} value={d.id}>
                                        {d.nome} {d.cognome} – {d.ruolo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Tipo *</label>
                            <select
                                className="input"
                                value={formData.tipo}
                                onChange={e => handleChange('tipo', e.target.value)}
                                required
                            >
                                {tipiTimbratura.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.icona} {t.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Ora *</label>
                            <input
                                type="time"
                                className="input"
                                value={formData.ora}
                                onChange={e => handleChange('ora', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Note</label>
                            <textarea
                                className="input"
                                value={formData.note}
                                onChange={e => handleChange('note', e.target.value)}
                                placeholder="Note opzionali..."
                                rows="2"
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-6)', textAlign: 'right' }}>
                        <button type="button" onClick={onClose} className="btn btn-outline">Annulla</button>
                        <button type="submit" className="btn btn-primary" style={{ marginLeft: 'var(--space-2)' }}>
                            Registra Timbratura
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TimbratureForm

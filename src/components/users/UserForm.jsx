import React, { useState, useEffect } from 'react'

function UserForm({ initialData, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        ruolo: ''
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                full_name: initialData.full_name,
                email: initialData.email,
                ruolo: initialData.ruolo
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.full_name || !formData.email || !formData.ruolo) {
            alert('Compila tutti i campi')
            return
        }

        const user = { ...initialData, ...formData }
        onSave(user)
    }

    return (
        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
            <div className="card-header">
                <h3>{initialData ? 'Modifica Utente' : 'Nuovo Utente'}</h3>
            </div>
            <form className="card-content" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                    <label>Nome completo *</label>
                    <input
                        className="input"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email *</label>
                    <input
                        className="input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Ruolo *</label>
                    <select
                        className="input"
                        name="ruolo"
                        value={formData.ruolo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleziona...</option>
                        <option value="titolare">Titolare</option>
                        <option value="manager">Manager</option>
                        <option value="cassiere">Cassiere</option>
                        <option value="cuoco">Cuoco</option>
                        <option value="barista">Barista</option>
                        <option value="cameriere">Cameriere</option>
                    </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                    <button type="button" className="btn btn-outline" onClick={onCancel}>Annulla</button>
                    <button type="submit" className="btn btn-primary">{initialData ? 'Salva' : 'Aggiungi'}</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm

import React, { useState, useEffect } from 'react'

function MenuForm({ initialData, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nome: '',
        descrizione: '',
        prezzo: '',
        categoria: ''
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                nome: initialData.nome,
                descrizione: initialData.descrizione,
                prezzo: initialData.prezzo,
                categoria: initialData.categoria
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.nome || !formData.prezzo || !formData.categoria) {
            alert('Compila i campi obbligatori')
            return
        }

        const piatto = {
            ...initialData,
            ...formData,
            prezzo: parseFloat(formData.prezzo)
        }

        onSave(piatto)
    }

    return (
        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
            <div className="card-header">
                <h3>{initialData ? 'Modifica Piatto' : 'Nuovo Piatto'}</h3>
            </div>
            <form className="card-content" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                    <label>Nome *</label>
                    <input
                        className="input"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrizione</label>
                    <textarea
                        className="input"
                        name="descrizione"
                        value={formData.descrizione}
                        onChange={handleChange}
                        rows="2"
                    />
                </div>
                <div>
                    <label>Prezzo (€) *</label>
                    <input
                        className="input"
                        name="prezzo"
                        type="number"
                        step="0.01"
                        value={formData.prezzo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoria *</label>
                    <select
                        className="input"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleziona...</option>
                        <option value="Antipasto">Antipasto</option>
                        <option value="Primo">Primo</option>
                        <option value="Secondo">Secondo</option>
                        <option value="Contorno">Contorno</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Bevanda">Bevanda</option>
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

export default MenuForm

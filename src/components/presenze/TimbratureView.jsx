import React, { useState } from 'react'
import { PlusIcon, TrashIcon } from '../shared/Icons'

function TimbratureView() {
    const [data, setData] = useState(new Date().toISOString().split('T')[0])
    const [timbrature, setTimbrature] = useState([
        { id: 1, nome: 'Marco Verdi', tipo: 'entrata', orario: '09:00' },
        { id: 2, nome: 'Lucia Neri', tipo: 'uscita', orario: '13:00' }
    ])
    const [nuovaTimbratura, setNuovaTimbratura] = useState({
        nome: '',
        tipo: 'entrata',
        orario: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setNuovaTimbratura(prev => ({ ...prev, [name]: value }))
    }

    const aggiungiTimbratura = (e) => {
        e.preventDefault()
        if (!nuovaTimbratura.nome || !nuovaTimbratura.orario) {
            alert('Compila tutti i campi')
            return
        }
        const nuova = {
            ...nuovaTimbratura,
            id: Date.now()
        }
        setTimbrature(prev => [...prev, nuova])
        setNuovaTimbratura({ nome: '', tipo: 'entrata', orario: '' })
    }

    const eliminaTimbratura = (id) => {
        if (!confirm('Eliminare la timbratura?')) return
        setTimbrature(prev => prev.filter(t => t.id !== id))
    }

    return (
        <>
            <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>Timbrature</h2>
                    <p>{timbrature.length} registrazioni</p>
                </div>
                <input
                    type="date"
                    className="input"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="card-header">
                    <h3>Nuova Timbratura</h3>
                </div>
                <form className="card-content" onSubmit={aggiungiTimbratura} style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <input
                        className="input"
                        name="nome"
                        placeholder="Nome dipendente"
                        value={nuovaTimbratura.nome}
                        onChange={handleChange}
                        required
                        style={{ flex: 2 }}
                    />
                    <select
                        className="input"
                        name="tipo"
                        value={nuovaTimbratura.tipo}
                        onChange={handleChange}
                        required
                        style={{ flex: 1 }}
                    >
                        <option value="entrata">Entrata</option>
                        <option value="uscita">Uscita</option>
                    </select>
                    <input
                        className="input"
                        name="orario"
                        type="time"
                        value={nuovaTimbratura.orario}
                        onChange={handleChange}
                        required
                        style={{ flex: 1 }}
                    />
                    <button className="btn btn-primary" type="submit" style={{ flexShrink: 0 }}>
                        <PlusIcon /> Aggiungi
                    </button>
                </form>
            </div>

            <div className="card">
                <div className="card-content">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Nome</th>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Tipo</th>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Orario</th>
                                <th style={{ padding: '0.5rem' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {timbrature.map(t => (
                                <tr key={t.id}>
                                    <td style={{ padding: '0.5rem' }}>{t.nome}</td>
                                    <td style={{ padding: '0.5rem' }}>{t.tipo}</td>
                                    <td style={{ padding: '0.5rem' }}>{t.orario}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <button className="btn btn-sm btn-outline" onClick={() => eliminaTimbratura(t.id)}>
                                            <TrashIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TimbratureView

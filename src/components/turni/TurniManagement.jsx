import React, { useState } from 'react'
import { PlusIcon, TrashIcon } from '../shared/Icons'

function TurniManagement() {
    const [turni, setTurni] = useState([
        { id: 1, nome: 'Marco Verdi', giorno: 'Lunedì', inizio: '09:00', fine: '13:00', ruolo: 'cameriere' },
        { id: 2, nome: 'Lucia Neri', giorno: 'Martedì', inizio: '17:00', fine: '22:00', ruolo: 'cuoco' }
    ])

    const [nuovoTurno, setNuovoTurno] = useState({
        nome: '',
        giorno: 'Lunedì',
        inizio: '',
        fine: '',
        ruolo: ''
    })

    const giorniSettimana = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']

    const handleChange = (e) => {
        const { name, value } = e.target
        setNuovoTurno(prev => ({ ...prev, [name]: value }))
    }

    const aggiungiTurno = (e) => {
        e.preventDefault()
        const { nome, giorno, inizio, fine, ruolo } = nuovoTurno
        if (!nome || !giorno || !inizio || !fine || !ruolo) {
            alert('Compila tutti i campi')
            return
        }
        setTurni(prev => [...prev, { ...nuovoTurno, id: Date.now() }])
        setNuovoTurno({ nome: '', giorno: 'Lunedì', inizio: '', fine: '', ruolo: '' })
    }

    const eliminaTurno = (id) => {
        if (!confirm('Eliminare questo turno?')) return
        setTurni(prev => prev.filter(t => t.id !== id))
    }

    return (
        <>
            <div className="content-header">
                <h2>Gestione Turni</h2>
                <p>{turni.length} turno/i pianificato/i</p>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="card-header">
                    <h3>Nuovo Turno</h3>
                </div>
                <form className="card-content" onSubmit={aggiungiTurno} style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                    <input
                        className="input"
                        placeholder="Nome dipendente"
                        name="nome"
                        value={nuovoTurno.nome}
                        onChange={handleChange}
                        style={{ flex: 2 }}
                        required
                    />
                    <select
                        className="input"
                        name="giorno"
                        value={nuovoTurno.giorno}
                        onChange={handleChange}
                        style={{ flex: 1 }}
                    >
                        {giorniSettimana.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                    <input
                        type="time"
                        className="input"
                        name="inizio"
                        value={nuovoTurno.inizio}
                        onChange={handleChange}
                        style={{ flex: 1 }}
                        required
                    />
                    <input
                        type="time"
                        className="input"
                        name="fine"
                        value={nuovoTurno.fine}
                        onChange={handleChange}
                        style={{ flex: 1 }}
                        required
                    />
                    <select
                        className="input"
                        name="ruolo"
                        value={nuovoTurno.ruolo}
                        onChange={handleChange}
                        style={{ flex: 1 }}
                        required
                    >
                        <option value="">Ruolo...</option>
                        <option value="cameriere">Cameriere</option>
                        <option value="cuoco">Cuoco</option>
                        <option value="barista">Barista</option>
                        <option value="lavapiatti">Lavapiatti</option>
                        <option value="manager">Manager</option>
                    </select>
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
                                <th style={{ padding: '0.5rem' }}>Giorno</th>
                                <th style={{ padding: '0.5rem' }}>Orario</th>
                                <th style={{ padding: '0.5rem' }}>Ruolo</th>
                                <th style={{ padding: '0.5rem' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {turni.map((t, i) => (
                                <tr key={i}>
                                    <td style={{ padding: '0.5rem' }}>{t.nome}</td>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{t.giorno}</td>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{t.inizio} – {t.fine}</td>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{t.ruolo}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button className="btn btn-sm btn-outline" onClick={() => eliminaTurno(t.id)}>
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

export default TurniManagement
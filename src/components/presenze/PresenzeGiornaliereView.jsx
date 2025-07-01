import React, { useState } from 'react'

function PresenzeGiornaliereView() {
    const [data, setData] = useState(new Date().toISOString().split('T')[0])

    const timbrature = [
        { nome: 'Marco Verdi', tipo: 'entrata', orario: '08:00' },
        { nome: 'Marco Verdi', tipo: 'uscita', orario: '12:30' },
        { nome: 'Lucia Neri', tipo: 'entrata', orario: '09:15' },
        { nome: 'Lucia Neri', tipo: 'uscita', orario: '13:00' },
        { nome: 'Franco Blu', tipo: 'entrata', orario: '10:00' },
    ]

    const presenze = []

    const raggruppate = {}

    for (let t of timbrature) {
        if (!raggruppate[t.nome]) raggruppate[t.nome] = {}
        raggruppate[t.nome][t.tipo] = t.orario
    }

    for (let nome in raggruppate) {
        const entrata = raggruppate[nome].entrata
        const uscita = raggruppate[nome].uscita
        if (entrata && uscita) {
            const ore = calcolaOreLavorate(entrata, uscita)
            presenze.push({ nome, entrata, uscita, ore })
        }
    }

    function calcolaOreLavorate(da, a) {
        const [h1, m1] = da.split(':').map(Number)
        const [h2, m2] = a.split(':').map(Number)
        const start = h1 * 60 + m1
        const end = h2 * 60 + m2
        const diff = end - start
        return `${Math.floor(diff / 60)}h ${diff % 60}m`
    }

    return (
        <>
            <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Presenze del giorno</h2>
                <input
                    type="date"
                    className="input"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>

            <div className="card">
                <div className="card-content">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Nome</th>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Entrata</th>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Uscita</th>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Ore lavorate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presenze.map((p, i) => (
                                <tr key={i}>
                                    <td style={{ padding: '0.5rem' }}>{p.nome}</td>
                                    <td style={{ padding: '0.5rem' }}>{p.entrata}</td>
                                    <td style={{ padding: '0.5rem' }}>{p.uscita}</td>
                                    <td style={{ padding: '0.5rem' }}>{p.ore}</td>
                                </tr>
                            ))}
                            {presenze.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-muted" style={{ padding: '1rem' }}>
                                        Nessuna presenza rilevata
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PresenzeGiornaliereView

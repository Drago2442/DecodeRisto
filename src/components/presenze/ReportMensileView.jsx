import React, { useState } from 'react'

function ReportMensileView() {
    const [mese, setMese] = useState(new Date().toISOString().slice(0, 7))

    const report = [
        { nome: 'Marco Verdi', giorni: 18, ore: 140 },
        { nome: 'Lucia Neri', giorni: 21, ore: 158 },
        { nome: 'Franco Blu', giorni: 15, ore: 120 }
    ]

    return (
        <>
            <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Report Mensile</h2>
                <input
                    type="month"
                    className="input"
                    value={mese}
                    onChange={(e) => setMese(e.target.value)}
                />
            </div>

            <div className="card">
                <div className="card-content">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Nome</th>
                                <th style={{ padding: '0.5rem' }}>Giorni</th>
                                <th style={{ padding: '0.5rem' }}>Ore Totali</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.map((r, i) => (
                                <tr key={i}>
                                    <td style={{ padding: '0.5rem' }}>{r.nome}</td>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{r.giorni}</td>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{r.ore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ReportMensileView


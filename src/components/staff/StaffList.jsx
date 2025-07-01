import React, { useState } from 'react'

function StaffList({ getRoleColor }) {
    const [staff, setStaff] = useState([
        { id: 1, nome: 'Marco', cognome: 'Verdi', ruolo: 'cameriere' },
        { id: 2, nome: 'Lucia', cognome: 'Neri', ruolo: 'cuoco' },
        { id: 3, nome: 'Franco', cognome: 'Blu', ruolo: 'barista' },
        { id: 4, nome: 'Elisa', cognome: 'Rossi', ruolo: 'manager' }
    ])

    return (
        <>
            <div className="content-header">
                <h2>Staff</h2>
                <p>{staff.length} membro/i</p>
            </div>

            <div className="card">
                <div className="card-content">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 'var(--space-4)'
                    }}>
                        {staff.map(d => (
                            <div key={d.id} style={{
                                border: '1px solid var(--gray-200)',
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--space-4)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-4)'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: getRoleColor(d.ruolo),
                                    borderRadius: '50%',
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {d.nome.charAt(0)}{d.cognome.charAt(0)}
                                </div>
                                <div>
                                    <div><strong>{d.nome} {d.cognome}</strong></div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{d.ruolo}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffList

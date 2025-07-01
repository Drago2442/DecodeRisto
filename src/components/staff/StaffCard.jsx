import React from 'react'

function StaffCard({ person, onEdit, onDelete, onToggleStatus, getRoleColor }) {
    const getInitials = (nome, cognome) => `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase()

    const getStatusBadge = (stato) => stato === 'attivo' ? 'badge-ready' : 'badge-default'

    const getAntichita = (dataAssunzione) => {
        const data = new Date(dataAssunzione)
        const oggi = new Date()
        const anni = oggi.getFullYear() - data.getFullYear()
        const mesi = oggi.getMonth() - data.getMonth()
        if (anni > 0) return `${anni} ${anni === 1 ? 'anno' : 'anni'}`
        if (mesi > 0) return `${mesi} ${mesi === 1 ? 'mese' : 'mesi'}`
        return 'Meno di un mese'
    }

    return (
        <div className="card" style={{ opacity: person.stato === 'attivo' ? 1 : 0.7 }}>
            <div className="card-content">
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            backgroundColor: getRoleColor(person.ruolo),
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '1.125rem'
                        }}>
                            {getInitials(person.nome, person.cognome)}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--gray-900)', marginBottom: 'var(--space-1)' }}>
                                {person.nome} {person.cognome}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: getRoleColor(person.ruolo) }}>
                                    {person.ruolo}
                                </span>
                                <span className={`badge ${getStatusBadge(person.stato)}`}>
                                    {person.stato === 'attivo' ? 'Attivo' : 'Inattivo'}
                                </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                                Dal {new Date(person.dataAssunzione).toLocaleDateString('it-IT')} • {getAntichita(person.dataAssunzione)}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        <span>📧</span><span style={{ color: 'var(--gray-600)' }}>{person.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span>📱</span><span style={{ color: 'var(--gray-600)' }}>{person.telefono}</span>
                    </div>
                </div>

                {person.note && (
                    <div style={{
                        backgroundColor: 'var(--gray-50)',
                        padding: 'var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: 'var(--space-4)'
                    }}>
                        <p style={{ color: 'var(--gray-700)' }}>💬 {person.note}</p>
                    </div>
                )}

                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => onEdit(person)} style={{ flex: 1 }}>
                        ✏️ Modifica
                    </button>
                    <button
                        className={`btn btn-sm ${person.stato === 'attivo' ? 'btn-outline' : 'btn-primary'}`}
                        onClick={() => onToggleStatus(person.id)}
                    >
                        {person.stato === 'attivo' ? '⏸️ Disattiva' : '▶️ Attiva'}
                    </button>
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={() => onDelete(person.id)}
                        style={{ color: 'var(--red-500)' }}
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StaffCard

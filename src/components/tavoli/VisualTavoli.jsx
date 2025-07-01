import React from 'react'

function VisualTavoli({ sale, onToggleTavolo }) {
  return (
    <div>
      <h2>Visualizzazione Tavoli</h2>
      {sale.map((sala, index) => (
        <div key={index} style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>{sala.nome}</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '1rem'
          }}>
            {sala.tavoli.map(tavolo => (
              <div
                key={tavolo.numero}
                onClick={() => onToggleTavolo(tavolo.numero)}
                style={{
                  backgroundColor: tavolo.stato === 'libero' ? '#dcfce7' : '#fecaca',
                  border: `2px solid ${tavolo.stato === 'libero' ? '#16a34a' : '#b91c1c'}`,
                  color: tavolo.stato === 'libero' ? '#14532d' : '#7f1d1d',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  textAlign: 'center',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Tavolo {tavolo.numero}
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  {tavolo.stato === 'libero' ? 'Libero' : 'Occupato'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default VisualTavoli

import React, { useState } from 'react'
import TimbratureView from './TimbratureView'
import PresenzeGiornaliereView from './PresenzeGiornaliereView'
import ReportMensileView from './ReportMensileView'

function PresenzeManagement({ staff, presenze, setPresenze, getRoleColor }) {
    const [activeView, setActiveView] = useState('timbrature')
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
    const [filtroStaff, setFiltroStaff] = useState('all')
    const [showTimbraForm, setShowTimbraForm] = useState(false)

    const [timbrature, setTimbrature] = useState([
        { id: 1, staffId: 1, data: '2024-01-15', tipo: 'entrata', ora: '09:00', note: '' },
        { id: 2, staffId: 1, data: '2024-01-15', tipo: 'pausa_inizio', ora: '13:00', note: 'Pausa pranzo' },
        { id: 3, staffId: 1, data: '2024-01-15', tipo: 'pausa_fine', ora: '14:00', note: 'Fine pausa pranzo' },
        { id: 4, staffId: 1, data: '2024-01-15', tipo: 'uscita', ora: '18:00', note: '' },
        { id: 5, staffId: 2, data: '2024-01-15', tipo: 'entrata', ora: '10:00', note: '' },
        { id: 6, staffId: 2, data: '2024-01-15', tipo: 'uscita', ora: '19:00', note: '' },
        { id: 7, staffId: 3, data: '2024-01-15', tipo: 'entrata', ora: '12:00', note: '' },
        { id: 8, staffId: 3, data: '2024-01-15', tipo: 'uscita', ora: '22:30', note: 'Straordinario' }
    ])

    const aggiungiTimbratura = (nuovaTimbratura) => {
        const id = Math.max(...timbrature.map(t => t.id), 0) + 1
        setTimbrature([...timbrature, {
            ...nuovaTimbratura,
            id,
            data: selectedDate,
            ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
        }])
    }

    const eliminaTimbratura = (id) => {
        if (confirm('Sei sicuro di voler eliminare questa timbratura?')) {
            setTimbrature(timbrature.filter(t => t.id !== id))
        }
    }

    const calcolaOreGiornaliere = (staffId, data) => {
        const timbratureGiorno = timbrature.filter(t => t.staffId === staffId && t.data === data)

        let entrata = null
        let uscita = null
        let pauseTotali = 0
        let pauseInizio = null

        timbratureGiorno.forEach(t => {
            switch (t.tipo) {
                case 'entrata':
                    entrata = t.ora
                    break
                case 'uscita':
                    uscita = t.ora
                    break
                case 'pausa_inizio':
                    pauseInizio = t.ora
                    break
                case 'pausa_fine':
                    if (pauseInizio) {
                        const inizio = new Date(`1970-01-01T${pauseInizio}:00`)
                        const fine = new Date(`1970-01-01T${t.ora}:00`)
                        pauseTotali += (fine - inizio) / 60000
                        pauseInizio = null
                    }
                    break
            }
        })

        if (entrata && uscita) {
            const oraIn = new Date(`1970-01-01T${entrata}:00`)
            const oraOut = new Date(`1970-01-01T${uscita}:00`)
            const minutiLavorati = (oraOut - oraIn) / 60000 - pauseTotali
            const ore = Math.max(0, minutiLavorati / 60)
            return {
                entrata,
                uscita,
                oreLavorate: ore.toFixed(2),
                pauseTotali: Math.round(pauseTotali),
                completo: true
            }
        }

        return {
            entrata: entrata || '-',
            uscita: uscita || '-',
            oreLavorate: '0.00',
            pauseTotali: Math.round(pauseTotali),
            completo: false
        }
    }

    const presenzeGiorno = staff.map(d => {
        const dati = calcolaOreGiornaliere(d.id, selectedDate)
        const timbratureGiorno = timbrature.filter(t => t.staffId === d.id && t.data === selectedDate)
        return {
            ...d,
            ...dati,
            timbrature: timbratureGiorno
        }
    })

    const statistiche = {
        presentiOggi: presenzeGiorno.filter(p => p.completo).length,
        oreTotaliOggi: presenzeGiorno.reduce((sum, p) => sum + parseFloat(p.oreLavorate || 0), 0),
        straordinariOggi: presenzeGiorno.reduce((sum, p) => {
            const ore = parseFloat(p.oreLavorate || 0)
            return sum + Math.max(0, ore - 8)
        }, 0)
    }

    const esportaExcel = () => {
        // Stub logico - eventualmente aggiungiamo export completo
        alert('Esportazione non implementata qui (usa il codice in App.jsx se serve).')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="card">
                <div className="card-content">
                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                        <button
                            className={`btn ${activeView === 'timbrature' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                            onClick={() => setActiveView('timbrature')}
                        >
                            🕒 Timbrature
                        </button>
                        <button
                            className={`btn ${activeView === 'presenze' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                            onClick={() => setActiveView('presenze')}
                        >
                            📊 Presenze Giornaliere
                        </button>
                        <button
                            className={`btn ${activeView === 'report' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                            onClick={() => setActiveView('report')}
                        >
                            📈 Report Mensile
                        </button>
                    </div>

                    {/* Statistiche */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-4)' }}>
                        <div style={{ textAlign: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--green-50)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--green-600)' }}>
                                {statistiche.presentiOggi}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--green-700)' }}>Presenti Oggi</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--primary-50)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-600)' }}>
                                {statistiche.oreTotaliOggi.toFixed(1)}h
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--primary-700)' }}>Ore Totali</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--orange-50)', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--orange-600)' }}>
                                {statistiche.straordinariOggi.toFixed(1)}h
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--orange-700)' }}>Straordinari</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vista Attiva */}
            {activeView === 'timbrature' && (
                <TimbratureView
                    staff={staff}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    timbrature={timbrature}
                    aggiungiTimbratura={aggiungiTimbratura}
                    eliminaTimbratura={eliminaTimbratura}
                    getRoleColor={getRoleColor}
                    showTimbraForm={showTimbraForm}
                    setShowTimbraForm={setShowTimbraForm}
                />
            )}

            {activeView === 'presenze' && (
                <PresenzeGiornaliereView
                    presenzeGiorno={presenzeGiorno}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    getRoleColor={getRoleColor}
                />
            )}

            {activeView === 'report' && (
                <ReportMensileView
                    staff={staff}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    filtroStaff={filtroStaff}
                    setFiltroStaff={setFiltroStaff}
                    timbrature={timbrature}
                    calcolaOreGiornaliere={calcolaOreGiornaliere}
                    esportaExcel={esportaExcel}
                    getRoleColor={getRoleColor}
                />
            )}
        </div>
    )
}

export default PresenzeManagement

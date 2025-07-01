import React, { useState } from 'react'
import ComandaCard from './ComandaCard'
import NewComandaForm from './NewComandaForm'
import { PlusIcon } from '../shared/Icons'

function ComandeManagement({
    comande,
    setComande,
    tavoli,
    onAggiungiComanda,
    onChiudiComanda,
    onPrendiComanda
}) {
    const [showForm, setShowForm] = useState(false)
    const [tavoloPreselezionato, setTavoloPreselezionato] = useState(null)

    const handleNuovaComanda = (dati) => {
        onAggiungiComanda(dati)
        setShowForm(false)
        setTavoloPreselezionato(null)
    }

    const handleApriFormPerTavolo = (numero) => {
        setTavoloPreselezionato(numero)
        setShowForm(true)
    }

    const handleChiudiComanda = (id, tavolo) => {
        setComande(prev => prev.filter(c => c.id !== id))
        onChiudiComanda(tavolo)
    }

    return (
        <>
            <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>Comande</h2>
                    <p>{comande.length} attiva/e</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <PlusIcon /> Nuova Comanda
                </button>
            </div>

            {showForm && (
                <NewComandaForm
                    tavoloPreselezionato={tavoloPreselezionato}
                    onSave={handleNuovaComanda}
                    onCancel={() => {
                        setShowForm(false)
                        setTavoloPreselezionato(null)
                    }}
                />
            )}

            <div className="card">
                <div className="card-content card-grid">
                    {comande.map(c => (
                        <ComandaCard
                            key={c.id}
                            comanda={c}
                            onDelete={() => handleChiudiComanda(c.id, c.tavolo)}
                            onPrendi={() => onPrendiComanda(c.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ComandeManagement

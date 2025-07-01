import React, { useEffect, useState } from "react";

export default function Dashboard() {
    const [tavoliOccupatiSenzaComanda, setTavoliOccupatiSenzaComanda] = useState([]);

    useEffect(() => {
        // Simulazione dati (sganciato dal backend)
        setTavoliOccupatiSenzaComanda([
            { numero: 1 },
            { numero: 5 },
            { numero: 8 }
        ]);
    }, []);

    const onApriComandaDaDashboard = (numeroTavolo) => {
        alert(`Apri comanda per tavolo ${numeroTavolo}`);
        // Qui si può navigare o aggiornare lo stato
        setTavoliOccupatiSenzaComanda(prev =>
            prev.filter(t => t.numero !== numeroTavolo)
        );
    };

    return (
        <div>
            <h2 className="text-lg">Benvenuto su DecodeRisto!</h2>
            <p className="text-muted">Controlla rapidamente le comande da prendere.</p>

            {Array.isArray(tavoliOccupatiSenzaComanda) && tavoliOccupatiSenzaComanda.length > 0 && (
                <>
                    <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Comande da prendere</h3>
                    <div className="card-grid">
                        {tavoliOccupatiSenzaComanda.map(tavolo => (
                            <div
                                key={tavolo.numero}
                                className="card"
                                style={{
                                    border: '2px solid var(--red-600)',
                                    backgroundColor: '#fee2e2',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: '0.5rem'
                                }}
                            >
                                <h4 style={{ color: '#b91c1c' }}>Tavolo {tavolo.numero}</h4>
                                <p className="text-muted">Comanda da prendere</p>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => onApriComandaDaDashboard(tavolo.numero)}
                                >
                                    Prendi Comanda
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

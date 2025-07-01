const BASE_URL = 'http://localhost:8000' // aggiorna se il backend è su altra porta

export async function apiFetch(path, options = {}) {
    const defaultOptions = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    }

    try {
        const response = await fetch(`${BASE_URL}${path}`, config)

        if (response.status === 401) {
            localStorage.removeItem('decoderisto_user')
            window.location.reload()
            return
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || 'Errore di rete')
        }

        return await response.json()
    } catch (err) {
        console.error('API Error:', err.message)
        throw err
    }
}

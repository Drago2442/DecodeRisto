import { useState } from 'react'

export default function useAuth() {
    const [user, setUser] = useState(null)

    const login = async (username, password) => {
        if (username === 'admin' && password === 'admin') {
            const userFinto = {
                id: 1,
                full_name: 'Mario Admin',
                email: 'admin@example.com',
                ruolo: 'titolare'
            }
            setUser(userFinto)
            return true
        }

        return false
    }

    const logout = () => setUser(null)

    return { user, login, logout }
}

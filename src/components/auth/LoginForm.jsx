import React, { useState } from "react";
import useAuth from "./useAuth"; // default export!

export default function LoginForm() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errore, setErrore] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (!success) {
            setErrore("Credenziali non valide");
        }
    };

    return (
        <div className="form-container">
            <div className="card" style={{ maxWidth: 400, margin: "4rem auto" }}>
                <h2 className="text-center">Accedi a DecodeRisto</h2>
                <form onSubmit={handleSubmit} className="form-grid" style={{ marginTop: "1rem" }}>
                    <input
                        className="input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errore && <p className="text-muted" style={{ color: "red" }}>{errore}</p>}
                    <button type="submit" className="btn btn-primary w-full">
                        Accedi
                    </button>
                </form>
            </div>
        </div>
    );
}

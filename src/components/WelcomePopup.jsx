import { useEffect, useState } from "react";
import { sendEmail } from "../contexts/mailingApi";

export default function WelcomePopup() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setShow(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await sendEmail(email);
            setSent(true);
        } catch (err) {
            console.error("Errore invio email:", err);

            const status = err.response?.status;
            if (status === 409) {
                setError("Email già iscritta alla newsletter.");
            } else {
                setError("Errore durante l'invio, riprova.");
            }
        }
    };

    if (!show) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 z-3">
            <div className="bg-white p-4 rounded shadow text-center" style={{ maxWidth: "400px" }}>
                {!sent ? (
                    <>
                        <h5>&#127918; Benvenuto!</h5>
                        <p>Inserisci la tua email per ricevere una sorpresa</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                className="form-control mb-3"
                                placeholder="Inserisci la tua email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary">Invia</button>
                        </form>
                        {error && <p className="text-danger mt-2">&#9888;&#65039;{error}</p>}
                    </>
                ) : (
                    <p className="text-success">&#9989; Email inviata! Controlla la tua casella  &#128521;</p>
                )}
                <button className="btn btn-secondary mt-3" onClick={() => setShow(false)}>Chiudi</button>
            </div>
        </div>
    );
};
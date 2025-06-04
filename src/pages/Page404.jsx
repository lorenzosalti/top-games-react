import { Link } from 'react-router-dom';

export default function Page404() {
    return (
        <main className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-white text-center px-4">
            <h1
                className="display-1 fw-bold text-danger mb-3"
                style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '3px' }}
            >
                GAME OVER
            </h1>

            <h2 className="text-warning fw-bold mb-4">
                Errore 404 - Pagina Non Trovata
            </h2>

            <p className="fs-5 mb-3">
                Hai perso una vita cercando qualcosa che non esiste.
            </p>

            <p className="fs-5 mb-4">
                Torna alla <Link to="/" className="text-info fw-bold text-decoration-none">Home</Link> e riprova la missione.
            </p>

            <p className="text-muted small mt-5">
                Premi Start per continuare...
            </p>
        </main>
    );
}
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import axios from "axios";
import GlobalContext from '../contexts/globalContext';
import { Modal } from 'bootstrap';

const inizionalData = {
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cardCvv: '',
    cardExpiryDate: ''
};

function Checkout() {

    const { cartStorage, setCartStorage, totalPrice } = useContext(GlobalContext);

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(inizionalData);
    const [fieldErrors, setFieldErrors] = useState({});
    const [orderSuccess, setOrderSuccess] = useState(null); // null = no tentativo, true = successo, false = errore

    const formRef = useRef(null);

    function handleFormData(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const errors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            errors.email = "Inserisci un'email valida.";
        }

        if (formData.cardNumber.length !== 16 || isNaN(formData.cardNumber)) {
            errors.cardNumber = "Devi inserire 16 cifre nel campo Numero Carta.";
        }

        if (formData.cardCvv.length !== 3 || isNaN(formData.cardCvv)) {
            errors.cardCvv = "Devi inserire 3 cifre nel campo CVV.";
        }

        const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryPattern.test(formData.cardExpiryDate)) {
            errors.cardExpiryDate = "Inserisci una data valida nel formato MM/AA.";
        }

        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            setValidated(false);
            setOrderSuccess(false);
            openModal();
        } else {
            submitOrder();
        }
    }

    async function submitOrder() {
        try {
            const orderData = {
                customer_email: formData.email,
                customer_name: formData.name,
                customer_address: formData.address,
                total_price: totalPrice,
                games: cartStorage.map(game => ({
                    game_id: game.id,
                    quantity: game.quantity || 1,
                    price: game.discount ?
                        (game.price - (game.price * game.discount / 100)) :
                        game.price
                }))
            };

            const response = await axios.post('http://127.0.0.1:3000/order', orderData);

            if (response.status === 201) {
                const form = formRef.current;
                form.classList.add("was-validated");
                setValidated(true);
                setOrderSuccess(true);
                setFormData(inizionalData);
                setCartStorage([]);
                openModal();
                console.log('Ordine creato:', response.data);
            } else {
                setValidated(false);
                setOrderSuccess(false);
                openModal();
            }
        } catch (error) {
            console.error('Errore creazione ordine:', error);
            console.error('Dettagli errore:', error.response?.data);
            setValidated(false);
            setOrderSuccess(false);
            openModal();
        }
    }

    function openModal() {
        const modalEl = document.getElementById('exampleModal');
        if (modalEl) {
            const modal = new Modal(modalEl);
            modal.show();
        }
    }

    return (
        <>
            <div className="container mt-5 p-4 border rounded shadow bg-light" style={{ maxWidth: "600px" }}>
                <h4 className="mb-3">🛒 Riepilogo Carrello</h4>
                {cartStorage.length ? (
                    <>
                        <ul className="list-group mb-3">
                            {cartStorage.map((game, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">
                                            {game.title}
                                            {game.quantity && (
                                                <span className="ms-2 px-2 py-1 bg-warning text-dark rounded">x {game.quantity}</span>
                                            )}
                                        </h6>
                                        <small className="text-muted">{game.platform}</small>
                                    </div>
                                    <span className="text-muted">
                                        € {game.discount ?
                                            ((game.price - (game.price * game.discount / 100)) * (game.quantity || 1)).toFixed(2) :
                                            (game.price * (game.quantity || 1)).toFixed(2)
                                        }
                                    </span>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>Totale: {totalPrice.toFixed(2)}€ </strong>
                            </li>
                        </ul>
                    </>
                ) : (
                    <p>Il carrello è vuoto.</p>
                )}
            </div>

            <form
                className="container mt-5 mb-5 p-4 border rounded shadow bg-white needs-validation"
                style={{ maxWidth: "600px" }}
                onSubmit={handleSubmit}
                ref={formRef}
                noValidate
            >
                <h2 className="mb-4 text-center">Checkout</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome completo</label>
                    <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleFormData} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`} value={formData.email} onChange={handleFormData} required />
                    {fieldErrors.email && (
                        <div className="invalid-feedback">{fieldErrors.email}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Indirizzo di spedizione</label>
                    <input type="text" id="address" name="address" className="form-control" value={formData.address} onChange={handleFormData} required />
                </div>

                <div className="row">
                    <div className="col-md-8 mb-3">
                        <label htmlFor="cardNumber" className="form-label">Numero carta</label>
                        <input type="text" id="cardNumber" name="cardNumber" className={`form-control ${fieldErrors.cardNumber ? "is-invalid" : ""}`} value={formData.cardNumber} onChange={handleFormData} required />
                        {fieldErrors.cardNumber && (
                            <div className="invalid-feedback">{fieldErrors.cardNumber}</div>
                        )}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="cardCvv" className="form-label">CVV</label>
                        <input type="text" id="cardCvv" name="cardCvv" className={`form-control ${fieldErrors.cardCvv ? "is-invalid" : ""}`} value={formData.cardCvv} onChange={handleFormData} required />
                        {fieldErrors.cardCvv && (
                            <div className="invalid-feedback">{fieldErrors.cardCvv}</div>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="cardExpiryDate" className="form-label">Data di scadenza</label>
                    <input type="text" id="cardExpiryDate" name="cardExpiryDate" className={`form-control ${fieldErrors.cardExpiryDate ? "is-invalid" : ""}`} placeholder="MM/AA" value={formData.cardExpiryDate} onChange={handleFormData} required />
                    {fieldErrors.cardExpiryDate && (
                        <div className="invalid-feedback">{fieldErrors.cardExpiryDate}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Conferma
                </button>
            </form>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    {orderSuccess === true ? (
                        <div className="modal-content border border-success">
                            <div className="modal-header bg-success text-white">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    ✅ Pagamento Riuscito!
                                </h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Grazie per l'acquisto! Riceverai una mail di conferma.
                            </div>
                        </div>
                    ) : orderSuccess === false ? (
                        <div className="modal-content border border-danger">
                            <div className="modal-header bg-danger text-white">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    ❌ Errore Pagamento
                                </h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Ci sono errori nel modulo o un problema durante la transazione. Controlla i dati e riprova.
                            </div>
                        </div>
                    ) : (

                        <div className="modal-content">
                            <div className="modal-body">
                                Attendere...
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Checkout;
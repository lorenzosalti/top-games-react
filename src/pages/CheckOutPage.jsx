import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import GlobalContext from '../contexts/globalContext';
import axios from "axios";

const inizionalData = {
    Intestatario: '',
    address_billing: '',
    city_billing: '',
    postal_code_billing: '',
    country_billing: '',
    region_billing: '',
    cardNumber: '',
    cardCvv: '',
    cardExpiryDate: ''
};

const customersData = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    address_shipping: '',
    city_shipping: '',
    postal_code_shipping: '',
    country_shipping: '',
    region_shipping: ''
};

function Checkout() {

    const { cartStorage, setCartStorage, totalPrice } = useContext(GlobalContext);

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(inizionalData);
    const [userData, setUserData] = useState(customersData);
    const [fieldErrors, setFieldErrors] = useState({});
    const formRef = useRef(null);
    const userFormRef = useRef(null);

    function handleFormData(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));
    }

    function handleUserData(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUserData((userData) => ({
            ...userData,
            [e.target.name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cartStorage.length) {
            alert('Il carrello è vuoto!');
            return;
        }

        const form = formRef.current;
        const errors = {};

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

        if (!userData.email.includes('@')) {
            errors.email = 'Email non valida';
        }

        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            setValidated(false);
            return;
        }

        form.classList.add("was-validated");
        setValidated(true);

        const orderPay = {
            total_price: totalPrice,
            date: new Date().toISOString().split('T')[0],
            address_billing: formData.address_billing,
            city_billing: formData.city_billing,
            postal_code_billing: formData.postal_code_billing,
            country_billing: formData.country_billing,
            region_billing: formData.region_billing
        };

        try {
            const res = await axios.post('http://127.0.0.1:3000/order/', orderPay);
            const createdOrderId = res.data.id_order;

            const orderUser = {
                id_order: createdOrderId,
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                phone: userData.phone,
                address_shipping: userData.address_shipping,
                city_shipping: userData.city_shipping,
                postal_code_shipping: userData.postal_code_shipping,
                country_shipping: userData.country_shipping,
                region_shipping: userData.region_shipping
            };

            await axios.post('http://127.0.0.1:3000/order/customer', orderUser);
            await axios.post('http://127.0.0.1:3000/order/vendor', {
                customer: userData,
                order: orderPay,
                games: cartStorage
            });

            console.log('Ordine completato con successo');
            setFormData(inizionalData);
            setUserData(customersData);
            setCartStorage([]);
        } catch (err) {
            console.error('Errore durante l’elaborazione dell’ordine:', err);
            setValidated(false);
        }
    }


    return (
        <>
            <div className="container mt-5 p-4 border rounded shadow bg-light bg-dark" style={{ maxWidth: "600px" }}>
                <h4 className="mb-3 text-white">🛒 Riepilogo Carrello</h4>
                {cartStorage.length ? (
                    <>
                        <ul className="list-group mb-3">
                            {cartStorage.map((game, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between lh-sm bg-dark text-white">
                                    <div>
                                        <h6 className="my-0">
                                            {game.title}
                                            {game.quantity && (
                                                <span className="ms-2 px-2 py-1 bg-warning text-dark rounded text-black">x {game.quantity}</span>
                                            )}
                                        </h6>
                                        <small className="text-white">{game.platform}</small>
                                    </div>
                                    <span className="text-white"> € {game.discount ? ((game.price - (game.price * game.discount / 100)) * game.quantity).toFixed(2) : (game.price * game.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between bg-dark text-white">
                                <strong>Totale: {totalPrice.toFixed(2)} € </strong>
                            </li>
                        </ul>
                    </>
                ) : (
                    <p className="text-white">Il carrello è vuoto.</p>
                )}
            </div>

            <form className="container mt-5 mb-5 p-4 border rounded shadow bg-dark text-white needs-validation" style={{ maxWidth: "600px" }} ref={userFormRef} noValidate>
                <h2 className="mb-4 text-center">Dati Cliente</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input type="text" id="name" name="name" className="form-control" value={userData.name} onChange={handleUserData} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Cognome</label>
                    <input type="text" id="surname" name="surname" className="form-control" value={userData.surname} onChange={handleUserData} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" value={userData.email} onChange={handleUserData} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Telefono</label>
                    <input type="text" id="phone" name="phone" className="form-control" value={userData.phone} onChange={handleUserData} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="address_shipping" className="form-label">Indirizzo di spedizione</label>
                    <input type="text" id="address_shipping" name="address_shipping" className="form-control" value={userData.address_shipping} onChange={handleUserData} required />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="city_shipping" className="form-label">Città</label>
                        <input type="text" id="city_shipping" name="city_shipping" className="form-control" value={userData.city_shipping} onChange={handleUserData} required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="postal_code_shipping" className="form-label">CAP</label>
                        <input type="text" id="postal_code_shipping" name="postal_code_shipping" className="form-control" value={userData.postal_code_shipping} onChange={handleUserData} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="country_shipping" className="form-label">Nazione</label>
                        <input type="text" id="country_shipping" name="country_shipping" className="form-control" value={userData.country_shipping} onChange={handleUserData} required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="region_shipping" className="form-label">Regione</label>
                        <input type="text" id="region_shipping" name="region_shipping" className="form-control" value={userData.region_shipping} onChange={handleUserData} required />
                    </div>
                </div>
            </form>


            <form className="container mt-5 mb-5 p-4 border rounded shadow bg-dark text-white needs-validation" style={{ maxWidth: "600px" }} onSubmit={handleSubmit} ref={formRef} noValidate>
                <h2 className="mb-4 text-center">Checkout</h2>

                <div className="mb-3">
                    <label htmlFor="Intestatario" className="form-label">Intestatario</label>
                    <input type="text" id="Intestatario" name="Intestatario" className="form-control" value={formData.Intestatario} onChange={handleFormData} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="address_billing" className="form-label">Indirizzo di fatturazione</label>
                    <input type="text" id="address_billing" name="address_billing" className="form-control" value={formData.address_billing} onChange={handleFormData} required />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="city_billing" className="form-label">Città</label>
                        <input type="text" id="city_billing" name="city_billing" className="form-control" value={formData.city_billing} onChange={handleFormData} required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="postal_code_billing" className="form-label">CAP</label>
                        <input type="text" id="postal_code_billing" name="postal_code_billing" className="form-control" value={formData.postal_code_billing} onChange={handleFormData} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="country_billing" className="form-label">Nazione</label>
                        <input type="text" id="country_billing" name="country_billing" className="form-control" value={formData.country_billing} onChange={handleFormData} required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="region_billing" className="form-label">Regione</label>
                        <input type="text" id="region_billing" name="region_billing" className="form-control" value={formData.region_billing} onChange={handleFormData} required />
                    </div>
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

                <button type="submit" className="btn btn-warning text-black" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Conferma
                </button>
            </form>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    {validated ? (
                        <div className="modal-content border border-success">

                            <div className="modal-header bg-success text-white">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    ✅ Pagamento Riuscito!
                                </h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <p>Grazie per il tuo acquisto! Il tuo videogame preferito ti aspetta 🎉</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal">Grazie!!</button>
                            </div>

                        </div>
                    ) : (
                        <div className="modal-content border border-danger">

                            <div className="modal-header bg-danger text-white">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    ❌ Pagamento non riuscito
                                </h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <p>Controlla i dati inseriti e riprova. Non mollare! 💪</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Chiudi e riprova</button>
                            </div>

                        </div>
                    )}


                </div>
            </div>
        </>
    );

}


export default Checkout;

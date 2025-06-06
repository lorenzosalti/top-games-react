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

    const { cartStorage, setCartStorage, grossPrice } = useContext(GlobalContext);

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(inizionalData);
    const [userData, setUserData] = useState(customersData);
    const [fieldErrors, setFieldErrors] = useState({});
    const formRef = useRef(null);
    const userFormRef = useRef(null);

    const [discountList, setDiscountList] = useState([])
    const [discountData, setDiscountData] = useState('')
    const [netDiscount, setNetDiscount] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)

    const shippingPrice = (grossPrice >= 100 ? 0 : 4.99);

    useEffect(() => {
        const newTotal = grossPrice + shippingPrice - netDiscount;
        setTotalPrice(newTotal);
    }, [grossPrice, shippingPrice, netDiscount]);

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

    function handleDiscountData(e) {
        const value = e.target.value;
        setDiscountData(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
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

        axios.post('http://127.0.0.1:3000/order/', orderPay)
            .then((res) => {
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

                return axios.post('http://127.0.0.1:3000/order/customer', orderUser);
            })
            .then((res) => {
                console.log('Cliente inserito:', res.data);
                setValidated(true)
                setFormData(inizionalData);
                setUserData(customersData);
                setCartStorage([]);
            })
            .catch((err) => {
                console.error('Errore nell’invio dei dati:', err);
                setValidated(false);
            });
    }

    function handleDiscount(e) {
        e.preventDefault();
        axios.get('http://127.0.0.1:3000/order/discount')
            .then(res => {
                setDiscountList(res.data)
                getNetPrice(res.data)
            })
            .catch((err) => {
                console.error('Errore discount code:', err);
            });
    }

    function getNetPrice(data) {
        const currentDate = new Date();
        const discount = data.find(d => d.discount_code === discountData);

        if (discount) {

            const discountStart = new Date(discount.discount_start);
            const discountFinish = new Date(discount.discount_finish);

            if (discountStart < currentDate && currentDate < discountFinish) {
                setNetDiscount(parseFloat(grossPrice * discount.discount_value / 100));
            } else setNetDiscount('')

        } else setNetDiscount('')

    }


    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8 col-lg-6">
                        <div className="container p-4 border rounded shadow bg-dark text-white">
                            <h4 className="mb-3 text-white text-center fs-3">🛒 Riepilogo Carrello</h4>
                            {cartStorage.length ? (
                                <>
                                    <ul className="list-group mb-3">
                                        {cartStorage.map((game, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between lh-sm bg-dark text-white text-start">
                                                <div>
                                                    <h6 className="my-0 fs-4">
                                                        {game.title}
                                                        {game.quantity && (
                                                            <span className="ms-2 px-2 py-1 bg-warning text-dark rounded text-black fs-5">x {game.quantity}</span>
                                                        )}
                                                    </h6>
                                                    <small className="text-white">{game.platform}</small>
                                                </div>
                                                <span className="text-white">€ {game.discount ? ((game.price - (game.price * game.discount / 100)) * game.quantity).toFixed(2) : (game.price * game.quantity).toFixed(2)}</span>
                                            </li>
                                        ))}
                                        {netDiscount && <li className="list-group-item d-flex justify-content-between bg-dark text-white">
                                            <strong>Codice Sconto:</strong> <span className="text-danger">- {netDiscount.toFixed(2)} €</span>
                                        </li>}
                                        <li className="list-group-item d-flex justify-content-between bg-dark text-white">
                                            <strong>Spedizione:</strong> <span>{shippingPrice.toFixed(2)} €</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between bg-dark text-white">
                                            <strong>Totale:</strong> <span>{totalPrice.toFixed(2)} €</span>
                                        </li>
                                    </ul>

                                    <div className="d-flex align-items-center justify-content-between bg-dark text-white p-3 border rounded row">
                                        <label htmlFor="discount-input" className="form-label mb-0 me-2 col-12 col-md-3">Codice sconto:</label>
                                        <input type="text" className="form-control me-2 fs-5 col-6 col-md-6" id="discount-input" style={{ flex: 1 }} onChange={handleDiscountData} />
                                        <button type="button" className="btn btn-warning text-black fs-4 col-6 col-md-3" data-bs-toggle="modal" data-bs-target="#discountModal" onClick={handleDiscount}>
                                            Applica
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-white text-center  fs-4">Il carrello è vuoto.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6 mb-4">
                        <form className="container p-4 border rounded shadow bg-dark text-white needs-validation h-100" ref={userFormRef} noValidate>
                            <h2 className="mb-4 text-center">Dati Cliente</h2>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input type="text" id="name" name="name" className="form-control fs-5" value={userData.name} onChange={handleUserData} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="surname" className="form-label">Cognome</label>
                                <input type="text" id="surname" name="surname" className="form-control fs-5" value={userData.surname} onChange={handleUserData} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" id="email" name="email" className="form-control fs-5" value={userData.email} onChange={handleUserData} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Telefono</label>
                                <input type="text" id="phone" name="phone" className="form-control fs-5" value={userData.phone} onChange={handleUserData} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address_shipping" className="form-label">Indirizzo di spedizione</label>
                                <input type="text" id="address_shipping" name="address_shipping" className="form-control fs-5" value={userData.address_shipping} onChange={handleUserData} required />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="city_shipping" className="form-label">Città</label>
                                    <input type="text" id="city_shipping" name="city_shipping" className="form-control fs-5" value={userData.city_shipping} onChange={handleUserData} required />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="postal_code_shipping" className="form-label">CAP</label>
                                    <input type="text" id="postal_code_shipping" name="postal_code_shipping" className="form-control fs-5" value={userData.postal_code_shipping} onChange={handleUserData} required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="country_shipping" className="form-label">Nazione</label>
                                    <input type="text" id="country_shipping" name="country_shipping" className="form-control fs-5" value={userData.country_shipping} onChange={handleUserData} required />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="region_shipping" className="form-label">Regione</label>
                                    <input type="text" id="region_shipping" name="region_shipping" className="form-control fs-5" value={userData.region_shipping} onChange={handleUserData} required />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-lg-6 mb-4">
                        <form className="container p-4 border rounded shadow bg-dark text-white needs-validation h-100" onSubmit={handleSubmit} ref={formRef} noValidate>
                            <h2 className="mb-4 text-center">Checkout</h2>

                            <div className="mb-3">
                                <label htmlFor="Intestatario" className="form-label">Intestatario</label>
                                <input type="text" id="Intestatario" name="Intestatario" className="form-control fs-5" value={formData.Intestatario} onChange={handleFormData} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address_billing" className="form-label">Indirizzo di fatturazione</label>
                                <input type="text" id="address_billing" name="address_billing" className="form-control fs-5" value={formData.address_billing} onChange={handleFormData} required />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="city_billing" className="form-label">Città</label>
                                    <input type="text" id="city_billing" name="city_billing" className="form-control fs-5" value={formData.city_billing} onChange={handleFormData} required />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="postal_code_billing" className="form-label">CAP</label>
                                    <input type="text" id="postal_code_billing" name="postal_code_billing" className="form-control fs-5" value={formData.postal_code_billing} onChange={handleFormData} required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="country_billing" className="form-label">Nazione</label>
                                    <input type="text" id="country_billing" name="country_billing" className="form-control fs-5" value={formData.country_billing} onChange={handleFormData} required />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="region_billing" className="form-label">Regione</label>
                                    <input type="text" id="region_billing" name="region_billing" className="form-control fs-5" value={formData.region_billing} onChange={handleFormData} required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="cardNumber" className="form-label">Numero carta</label>
                                    <input type="text" id="cardNumber" name="cardNumber" className={`form-control fs-5 ${fieldErrors.cardNumber ? "is-invalid" : ""}`} value={formData.cardNumber} onChange={handleFormData} required />
                                    {fieldErrors.cardNumber && (
                                        <div className="invalid-feedback">{fieldErrors.cardNumber}</div>
                                    )}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="cardCvv" className="form-label">CVV</label>
                                    <input type="text" id="cardCvv" name="cardCvv" className={`form-control fs-5 ${fieldErrors.cardCvv ? "is-invalid" : ""}`} value={formData.cardCvv} onChange={handleFormData} required />
                                    {fieldErrors.cardCvv && (
                                        <div className="invalid-feedback">{fieldErrors.cardCvv}</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cardExpiryDate" className="form-label">Data di scadenza</label>
                                <input type="text" id="cardExpiryDate" name="cardExpiryDate" className={`form-control fs-5 ${fieldErrors.cardExpiryDate ? "is-invalid" : ""}`} placeholder="MM/AA" value={formData.cardExpiryDate} onChange={handleFormData} required />
                                {fieldErrors.cardExpiryDate && (
                                    <div className="invalid-feedback">{fieldErrors.cardExpiryDate}</div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-warning text-black w-100  fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Conferma
                            </button>
                        </form>
                    </div>
                </div>

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
                                <div className="modal-body bg-dark text-white">
                                    <p>Grazie per il tuo acquisto! Il tuo ordine ti aspetta 🎉</p>
                                </div>
                                <div className="modal-footer bg-dark d-flex justify-content-center">
                                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Grazie!</button>
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
                                <div className="modal-body bg-dark text-white">
                                    <p>Controlla i dati inseriti e riprova.</p>
                                </div>
                                <div className="modal-footer bg-dark d-flex justify-content-center">
                                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Chiudi</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal fade" id="discountModal" tabIndex="-1" aria-labelledby="discountModalLabel" aria-hidden="true">                    <div className="modal-dialog">
                    {netDiscount ? (
                        <div className="modal-content border border-success">
                            <div className="modal-header bg-success text-white">
                                <h1 className="modal-title fs-5" id="discountModalLabel">
                                    ✅ Codice sconto applicato!
                                </h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-footer bg-dark d-flex justify-content-center">
                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Grazie!</button>
                            </div>
                        </div>
                    ) : (
                        <div className="modal-content border border-danger">
                            <div className="modal-header bg-danger text-white">
                                <h1 className="modal-title fs-5" id="discountModalLabel">
                                    ❌ Codice sconto non valido
                                </h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-footer bg-dark d-flex justify-content-center">
                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Chiudi</button>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>

        </>
    );

}


export default Checkout;

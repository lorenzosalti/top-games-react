import { useEffect, useState } from "react";



const inizionalData = {
    name: '',
    address: '',
    cardNumber: '',
    cardCvv: '',
    cardExpiryDate: ''
}

function Checkout() {

    const [validated, setValidated] = useState(false)
    const [formData, setFormData] = useState(inizionalData)


    function handleFormData(e) {
        const value =
            e.target.type === "checkbox" ?
                e.target.checked : e.target.value;
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: value,
        }));

    }




    function handleSubmit(e) {

        e.preventDefault()
        console.log(formData)


        const errors = []

        if (formData.cardNumber.length !== 16 || isNaN(formData.cardNumber)) {
            errors.push('Devi inserire almeno 16 cifre nel campo Numero Carta')
        }

        if (formData.cardCvv.length !== 3 || isNaN(formData.cardCvv)) {
            errors.push('Devi inserire almeno 3 cifre Nel campo CVV')
        }


        //.test() è una funzione degli oggetti REgExp in JS e ha il compito di verificare se la stringa rispetta un certo pattern
        const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryPattern.test(formData.cardExpiryDate)) {
            errors.push('Inserisci una data valida nel formato MM/AA.');
        }

        if (errors.length > 0) {
            alert(errors)
            setValidated(false)
        } else {
            setValidated(true)
            console.log(formData)
            alert('pagamaneto confermato')

        }

    }


    return (
        <>
            <form className="container mt-5 mb-5 p-4 border rounded shadow bg-white" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Checkout</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">nome completo</label>
                    <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleFormData} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">indirizzo di spedizione</label>
                    <input type="text" id="address" name="address" className="form-control" value={formData.address} onChange={handleFormData} required />
                </div>

                <div className="row">
                    <div className="col-md-8 mb-3">
                        <label htmlFor="cardNumber" className="form-label">Numero carta</label>
                        <input type="text" id="cardNumber" name="cardNumber" className="form-control" value={formData.cardNumber} onChange={handleFormData} required />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="cardCvv" className="form-label">CVV</label>
                        <input type="text" id="cardCvv" name="cardCvv" className="form-control" value={formData.cardCvv} onChange={handleFormData} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="cardExpiryDate" className="form-label">Data di scadenza</label>
                    <input type="text" id="cardExpiryDate" name="cardExpiryDate" className="form-control" placeholder="MM/AA" value={formData.cardExpiryDate} onChange={handleFormData} required />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-4">
                    Conferma e caccia li sordi
                </button>
            </form>


            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default Checkout
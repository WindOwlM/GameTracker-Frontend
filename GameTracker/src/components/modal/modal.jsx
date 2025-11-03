import { useState } from "react";
import "./modal.css";
import CloseButton from "../buttons/close/closeButton";
import Input from "../inputs/text/formInput";
import SubmitButton from "../buttons/submit/submitButton";

export default function Modal() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const submit = () => {
        alert("Formulario enviado 🚀");
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    return (
        <>
        <button className="btn-modal" onClick={toggleModal}>
            Agregar juego
        </button>

        {modal && (
            <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal-content">
                
                <div className="modal-header">
                <h2>Add Videogame</h2>
                <CloseButton closeAction={toggleModal} />
                </div>

                <div className="inputs-grid">
                    <Input text="Título del juego" />
                    <Input text="Género" />
                    <Input text="Plataforma" />
                    <Input text="Año de lanzamiento" />
                </div>

                <div className="modal-footer">
                <SubmitButton submitAction={submit} text="Enviar" />
                </div>
            </div>
            </div>
        )}
        </>
    );
}
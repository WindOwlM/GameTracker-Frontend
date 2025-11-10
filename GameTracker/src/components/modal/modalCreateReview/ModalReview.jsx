import { useState } from "react";
import "./modalReview.css";
import { useGames } from "../../../hooks/useGames";
import ToastContainer from "../../toast/ToastContainer";
import useToast from "../../../hooks/useToast";

export default function ModalReview() {
    const { toasts, removeToast, success, errorT, warning, info, loadingT ,dismissLoading  } = useToast();
    const {createGame} = useGames()
    const [hoveredStar, setHoveredStar] = useState(0)
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '6904e48d10dcfca0449d3361',
        score: '',
        review: '',
        hoursPlayed: '',
        difficulty: '',
        recommend: '',
    });

    const handleStarClick = (rating) => {
        setFormData({
        ...formData,
        rating
        })
    }

    const displayRating = hoveredStar || formData.rating

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        const {loadingId} = loadingT("Creando juego")
        alert("Formulario enviado 🚀");
        console.log(formData);

        try {
            await createGame(formData)
            dismissLoading(loadingId)
        } catch (error) {
            dismissLoading(loadingId)
            errorT(error)
        }


        toggleModal();
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    return (
        <>
            <button className="btn-modal" onClick={toggleModal}>
            Agregar review
            </button>

            {modal && (
            <div className="modal">
                <div className="overlay" onClick={toggleModal}></div>
                <div className="modal-content">
                <ToastContainer 
                toasts={toasts} 
                onRemove={removeToast}
                position="top-right"
                />
                <div className="modal-header">
                    <h2>Add Review</h2>
                    <button className="close-btn" onClick={toggleModal}>
                    ×
                    </button>
                </div>

                <div className="modal-body">
                    <div className="star-rating-container">
                <div className="star-rating-label">Tu Calificación</div>
                <div className="stars-wrapper">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                        key={star}
                        className={`star ${star <= displayRating ? 'filled' : 'empty'}`}
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        >
                        ★
                        </span>
                    ))}
                    </div>
                    <div className="rating-text">
                    {displayRating} de 5 estrellas
                    </div>
                </div>
                    <div className="inputs-grid">
                    
                    <div className="brutalist-container">
                        <input 
                        type="text" 
                        name="title"
                        placeholder="ESCRIBE AQUÍ"
                        className="brutalist-input" 
                        onChange={handleChange}
                        />
                        <label className="brutalist-label">Título del juego</label>
                    </div>
                
                    <div className="brutalist-container">
                        <input 
                        type="text" 
                        name="genres"
                        placeholder="ESCRIBE AQUÍ"
                        className="brutalist-input" 
                        onChange={handleChange}
                        />
                        <label className="brutalist-label">Género</label>
                    </div>

                    <div className="brutalist-container">
                        <select 
                        name="platform"
                        className="brutalist-select"                        
                        onChange={handleChange}
                        >
                        <option value="">SELECCIONAR</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="Multi-plataforma">Multi-plataforma</option>
                        </select>
                        <label className="brutalist-label">Plataforma</label>
                    </div>

                    <div className="brutalist-container">
                        <input 
                        type="number" 
                        name="released"
                        placeholder="2025"
                        className="brutalist-input" 
                        onChange={handleChange}
                        min="1970"
                        max="2030"
                        />
                        <label className="brutalist-label">Año de lanzamiento</label>
                    </div>

                    <div className="brutalist-container">
                        <input 
                        type="text" 
                        name="developer"
                        placeholder="ESCRIBE AQUÍ"
                        className="brutalist-input" 
                        onChange={handleChange}
                        />
                        <label className="brutalist-label">Desarrollador</label>
                    </div>

                    <div className="brutalist-container">
                        <input 
                        type="url" 
                        name="coverImage"
                        placeholder="HTTPS://..."
                        className="brutalist-input" 
                        onChange={handleChange}
                        />
                        <label className="brutalist-label">Imagen Portada (URL)</label>
                    </div>

                    <div className="brutalist-container textarea-container">
                        <textarea 
                        name="description"
                        placeholder="DESCRIPCIÓN DEL JUEGO..."
                        className="brutalist-textarea"
                        onChange={handleChange}
                        />
                        <label className="brutalist-label">Descripción</label>
                    </div>

                    </div>
                </div>

                <div className="modal-footer">
                    <button 
                    type="button" 
                    className="action-button cancel-button"
                    onClick={toggleModal}
                    >
                    Cancelar
                    </button>
                    <button 
                    type="button" 
                    className="action-button submit-button"
                    onClick={submit}
                    >
                    Enviar
                    </button>
                </div>

                </div>
            </div>
            )}
        </>
    );
}
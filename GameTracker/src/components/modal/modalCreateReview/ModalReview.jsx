import { useState, useEffect } from "react";
import "./modalReview.css";
import { useGames } from "../../../hooks/useGames";
import { useReview } from "../../../hooks/useReview";

export default function ModalReview() {
    const {createGame,games} = useGames()
    const {createReview} = useReview()
    const [hoveredStar, setHoveredStar] = useState(0)
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '6904e48d10dcfca0449d3361',
        game_id: '',
        rating: '',
        review: '',
        hoursPlayed: '',
        difficulty: '',
        recommend: false,
    });

    const [storedGames,setStoredGame] = useState({
        game_id: '',
        title: '',
    })

    useEffect(() => {
        setStoredGame(games.map(g => ({
            game_id :g._id,
            title: g.title
        })));
    }, [games]);

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
        alert("Formulario enviado");

        try {
            await createReview(formData)
        } catch (error) {
            console.log(error)
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
                        <select 
                            name="game_id"
                            className="brutalist-select"
                            value={formData.game_id}
                            onChange={handleChange}
                        >
                            <option value="">SELECCIONAR</option>
                            {storedGames.map((g) => (
                                <option key={g.game_id} value={g.game_id}>{g.title}</option>
                            ))}
                        </select>
                        <label className="brutalist-label">Juego</label>
                    </div>

                    <div className="brutalist-container">
                        <select 
                        name="difficulty"
                        className="brutalist-select"                        
                        onChange={handleChange}
                        >
                        <option value="">SELECCIONAR</option>
                        <option value="easy">Facil</option>
                        <option value="mid">Intermedio</option>
                        <option value="hard">Hard</option>
                        </select>
                        <label className="brutalist-label">Dificultad</label>
                    </div>

                    <div className="brutalist-container">
                        <input 
                        type="number" 
                        name="hoursPlayed"
                        placeholder="100..."
                        className="brutalist-input" 
                        onChange={handleChange}
                        min="0"
                        max="1000"
                        />
                        <label className="brutalist-label">Horas Jugadas</label>
                    </div>

                    <div className="brutalist-container" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <input 
                            type="checkbox" 
                            name="recommend"
                            id="recommend"
                            checked={formData.recommend}
                            onChange={(e) => setFormData({...formData, recommend: e.target.checked})}
                            style={{width: '24px', height: '24px', cursor: 'pointer'}}
                        />
                        <label htmlFor="recommend" style={{fontWeight: 'bold', cursor: 'pointer'}}>
                            ¿Recomendarias el juego?
                        </label>
                    </div>

                    <div className="brutalist-container textarea-container">
                        <textarea 
                        name="review"
                        placeholder="DESCRIPCIÓN DEL JUEGO..."
                        className="brutalist-textarea"
                        onChange={handleChange}
                        />
                        <label className="brutalist-label">Reseña</label>
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
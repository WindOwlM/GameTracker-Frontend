import { useState, useEffect } from "react"
import "./modalGames.css"
import { useGames } from "../../../hooks/useGames"
import useToast from "../../../hooks/useToast"

export default function ModalGames({ gameData = null, gameId = null, buttonText = "Agregar juego" }) {
    const { success, errorT, warning, loadingT, dismissLoading } = useToast()
    const { createGame, editGame } = useGames()
    const [modal, setModal] = useState(false)
    const isEditMode = !!gameData
    const [formData, setFormData] = useState({
        title: '',
        genres: '',
        platform: '',
        released: '',
        developer: '',
        coverImage: '',
        description: '',
        completed: false
    })

    useEffect(() => {
        if (gameData) {
            setFormData({
                title: gameData.title || '',
                genres: gameData.genres || '',
                platform: gameData.platform || '',
                released: gameData.released || '',
                developer: gameData.developer || '',
                coverImage: gameData.coverImage || '',
                description: gameData.description || '',
                completed: gameData.completed || false
            })
        }
    }, [gameData])

    const toggleModal = () => {
        setModal(!modal)
        if (modal && !gameData) {
            setFormData({
                title: '',
                genres: '',
                platform: '',
                released: '',
                developer: '',
                coverImage: '',
                description: '',
                completed: false
            })
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault()

        if (!formData.title || !formData.genres || !formData.platform) {
            warning('Por favor completa los campos obligatorios: Título, Género y Plataforma')
            return
        }

        const loadingId = loadingT(isEditMode ? "Actualizando juego..." : "Creando juego...")
        
        try {
            if (isEditMode) {
                await editGame(gameId, formData)
                dismissLoading(loadingId)
                success('¡Juego actualizado exitosamente! ✅')
            } else {
                await createGame(formData)
                dismissLoading(loadingId)
                success('¡Juego creado exitosamente! 🎮')
                
                setFormData({
                    title: '',
                    genres: '',
                    platform: '',
                    released: '',
                    developer: '',
                    coverImage: '',
                    description: '',
                    completed: false
                })
            }
            
            toggleModal()
        } catch (error) {
            dismissLoading(loadingId)
            errorT(error.message || 'Error al procesar la solicitud')
        }
    }

    if (modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal")
    }

    return (
        <>
            <button 
                className={`btn-modal ${isEditMode ? 'btn-edit' : ''}`}
                onClick={(e) => {
                    e.stopPropagation()
                    toggleModal()
                }}
                type="button"
            >
                {buttonText}
            </button>

            {modal && (
                <div className="modal">
                    <div 
                        className="overlay" 
                        onMouseDown={(e) => {
                            e.stopPropagation()
                            toggleModal()
                        }}
                    ></div>
                    <div 
                        className="modal-content" 
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        
                        <div className="modal-header">
                            <h2>{isEditMode ? 'Edit Videogame' : 'Add Videogame'}</h2>
                            <button className="close-btn" onClick={toggleModal}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="inputs-grid">
                                
                                <div className="brutalist-container">
                                    <input 
                                        type="text" 
                                        name="title"
                                        placeholder="ESCRIBE AQUÍ"
                                        className="brutalist-input" 
                                        value={formData.title}
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
                                        value={formData.genres}
                                        onChange={handleChange}
                                    />
                                    <label className="brutalist-label">Género</label>
                                </div>

                                <div className="brutalist-container">
                                    <select 
                                        name="platform"
                                        className="brutalist-select"
                                        value={formData.platform}
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
                                        value={formData.released}
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
                                        value={formData.developer}
                                        onChange={handleChange}
                                    />
                                    <label className="brutalist-label">Desarrollador</label>
                                </div>

                                <div className="brutalist-container">
                                    <input 
                                        type="url" 
                                        name="coverImage"
                                    
                                        className="brutalist-input" 
                                        value={formData.coverImage}
                                        onChange={handleChange}
                                    />
                                    <label className="brutalist-label">Imagen Portada (URL)</label>
                                </div>

                                <div className="brutalist-container textarea-container">
                                    <textarea 
                                        name="description"
                                        placeholder="DESCRIPCIÓN DEL JUEGO..."
                                        className="brutalist-textarea"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                    <label className="brutalist-label">Descripción</label>
                                </div>

                            </div>

                            <div className="brutalist-container" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <input 
                                    type="checkbox" 
                                    name="completed"
                                    id="completed"
                                    checked={formData.completed}
                                    onChange={(e) => setFormData({...formData, completed: e.target.checked})}
                                    style={{width: '24px', height: '24px', cursor: 'pointer'}}
                                />
                                <label htmlFor="completed" style={{fontWeight: 'bold', cursor: 'pointer'}}>
                                    ¿Juego completado?
                                </label>
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
                                {isEditMode ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}
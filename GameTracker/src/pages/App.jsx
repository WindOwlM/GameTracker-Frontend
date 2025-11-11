import { useState } from "react"
import "../styles/App.css"
import GameCard from "../components/cards/card"
import {useGames} from '../hooks/useGames'
import { useReview } from "../hooks/useReview"
import ModalGames from "../components/modal/modalCreateGame/ModalGames"
import ModalReview from "../components/modal/modalCreateReview/ModalReview"
import { dateFormat } from "../utils/dateFormat"

function App(){
  const { games, deleteGame, refresh, error } = useGames()
  const { reviews } = useReview()
  const [activeTab, setActiveTab] = useState('juegos')
  const [reviewFilter, setReviewFilter] = useState('hechas')

  const handleDeleteGame = async (id) => {
    try {
      await deleteGame(id)
    } catch (error) {
      console.log(error.message)
    }
  } 

  return (
    <>
      <div className="container">
        <div className="profile-card">
          <div className="header">
            <div className="profile-section">
              <div className="profile-photo">
                <svg className="profile-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              
              <div className="user-info">
                <h2>Usuario</h2>
                <p>user@email.com</p>
                <p>Miembro desde: 2024</p>
              </div>
            </div>

            <div className="right-section">
              {activeTab === 'juegos' ? <ModalGames /> : <ModalReview />}
              
              <div className="tabs">
                <button
                  className={`tab-btn ${activeTab === 'juegos' ? 'active' : 'inactive'}`}
                  onClick={() => setActiveTab('juegos')}
                >
                  Juegos
                </button>
                <button
                  className={`tab-btn ${activeTab === 'reseñas' ? 'active' : 'inactive'}`}
                  onClick={() => setActiveTab('reseñas')}
                >
                  Reseñas
                </button>
              </div>

              <div className="content-area">
                {activeTab === 'juegos' ? (
                  <div className="games-grid">
                    {games.length === 0 ? (
                      <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '2rem'}}>
                        <p>No hay juegos todavía. ¡Agrega tu primer juego!</p>
                      </div>
                    ) : (
                      games.map((game) => (
                        <GameCard 
                          key={game._id}
                          id={game._id}
                          title={game.title} 
                          desc={game.description} 
                          date={dateFormat(game.createdAt)}
                          image={game.coverImage}
                          genres={game.genres}
                          platform={game.platform}
                          developer={game.developer}
                          released={game.released}
                          coverImage={game.coverImage}
                          completed={game.completed}
                          handleDeleteGame={handleDeleteGame}
                        />
                      ))
                    )}
                  </div>
                ) : (
                  <div className="reviews-section">
                    <div className="review-filters">
                      <button
                        className={`filter-btn ${reviewFilter === 'hechas' ? 'active' : 'inactive'}`}
                        onClick={() => setReviewFilter('hechas')}
                      >
                        Reseñas Hechas
                      </button>
                      <button
                        className={`filter-btn ${reviewFilter === 'globales' ? 'active' : 'inactive'}`}
                        onClick={() => setReviewFilter('globales')}
                      >
                        Reseñas Globales
                      </button>
                    </div>

                    <div className="reviews-list">
                      {reviewFilter === 'hechas' ? (
                        reviews.length === 0 ? (
                          <div style={{textAlign: 'center', padding: '2rem'}}>
                            <p>No has hecho reseñas todavía</p>
                          </div>
                        ) : (
                          reviews.map((review) => (
                            <div key={review.id} className="review-card">
                              <div className="review-header">
                                <div className="review-info">
                                  <h3>{review.game}</h3>
                                  <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i}>
                                        {i < review.rating ? '★' : '☆'}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="review-actions">
                                  <button className="action-btn edit-btn">
                                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                    Edit
                                  </button>
                                  <button className="action-btn delete-btn">
                                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                    Del
                                  </button>
                                </div>
                              </div>
                              <p className="review-comment">{review.comment}</p>
                            </div>
                          ))
                        )
                      ) : (
                        <div style={{textAlign: 'center', padding: '2rem'}}>
                          <p>No hay reseñas globales todavía</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
import { useState } from "react"
import "../styles/App.css"
import GameCard from "../components/cards/gameCard/card"
import ReviewCard from "../components/cards/reviewCard/reviewCard"
import {useGames} from '../hooks/useGames'
import { useReview } from "../hooks/useReview"
import ModalGames from "../components/modal/modalCreateGame/ModalGames"
import ModalReview from "../components/modal/modalCreateReview/ModalReview"
import { dateFormat } from "../utils/dateFormat"

function App(){
  const { games, deleteGame } = useGames()
  const { reviews, deleteReview, fetchReview } = useReview()
  const [activeTab, setActiveTab] = useState('juegos')
  const [reviewFilter, setReviewFilter] = useState('hechas')

  const handleDeleteGame = async (id) => {
    try {
      await deleteGame(id)
    } catch (error) {
      console.log(error.message)
    }
  } 

    const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id)
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
              {activeTab === 'juegos' ? <ModalGames /> : <ModalReview onUpdate={fetchReview} />}
              
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
                            <ReviewCard
                            key={review._id}
                            id={review._id}
                            game_id={review.game_id?._id}
                            hoursPlayed={review.hoursPlayed}
                            difficulty={review.difficulty}
                            username={review.user_id?.username}
                            title={review.game_id?.title}
                            rating={review.rating}
                            review={review.review}
                            recommend={review.recommend}
                            onUpdate={fetchReview}
                            handleDeleteReview={handleDeleteReview}/>
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
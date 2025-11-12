import './card.css'
import ModalGames from '../../modal/modalCreateGame/ModalGames'

export function GameCard({id, title, desc, date, genres, platform, image, developer, released, coverImage, completed, handleDeleteGame}) {

  const gameData = {
    title,
    description: desc,
    genres,
    platform,
    developer,
    released,
    coverImage: image,
    completed
  }

  return (
    <>
      <div key={id} className="game-card">
        <div className="game-card-image">
          {image ? <img src={image} alt={title} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : title.charAt(0)}
        </div>
        <div className="game-card-content">
          <h3 className="game-card-title">{title}</h3>
          <p className="game-card-description">{desc}</p>
          <div className="game-card-details">
            <div className="game-detail-item">
              <span className="game-detail-label">LANZAMIENTO:</span>
              <span>{date}</span>
            </div>
            <div className="game-detail-item">
              <span className="game-detail-label">GÉNERO:</span>
              <span>{genres}</span>
            </div>
            <div className="game-detail-item">
              <span className="game-detail-label">PLATAFORMA:</span>
              <span>{platform}</span>
            </div>
            <div className="game-detail-item">
              <span className="game-detail-label">DESCRIPCION:</span>
              <span>{desc}</span>
            </div>
            <div className="game-detail-item">
              <span className="game-detail-label">DESARROLLADOR:</span>
              <span>{developer}</span>
            </div>
            <div className="game-detail-item">
              <span className="game-detail-label">COMPLETADO:</span>
              <span>{completed ? "Completado" : "Sin completar"}</span>
            </div>
          </div>
          <div className="game-card-actions">
            <ModalGames 
              gameData={gameData}
              gameId={id}
              buttonText={
                <div className="game-action-btn game-edit-btn">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit
                </div>
              }
            />
            
            <button 
              className="game-action-btn game-delete-btn"
              onClick={() => handleDeleteGame(id)}
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Del
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default GameCard
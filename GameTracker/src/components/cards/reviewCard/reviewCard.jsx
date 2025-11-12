import './reviewCard.css'
import ModalReview from '../../modal/modalCreateReview/ModalReview'

export function ReviewCard({id,game_id,username, hoursPlayed,title, rating,review,recommend,difficulty, handleDeleteReview,onUpdate}) {

    const reviewData = {
        game_id,
        rating,
        review,
        recommend,
        hoursPlayed,
        difficulty
    }

  return(
    <>
    <div key={id} className="review-card">
    <div className="review-header">
    <div className="review-info">
        <h3>{username}</h3>
        <div className="rating">
        {[...Array(5)].map((_, i) => (
            <span key={i}>
            {i < rating ? '★' : '☆'}
            </span>
        ))}
        </div>
    </div>
    <div className="review-info">
        <h1>{title}</h1>
    </div>
    <div className="review-actions">
        <ModalReview 
        key={id}
        gameId={game_id}
        title={title}
        reviewData={reviewData}
        onUpdate={onUpdate}
        onClick={() => onUpdate()}
        buttonText={
            <div className="action-btn edit-btn">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
            </div>
        }/>
        <button className="action-btn delete-btn" onClick={() => handleDeleteReview(id)}>
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
        Del
        </button>
    </div>
    </div>
    <p className="review-comment">{review}</p>
    <hr />
    <p className="review-comment">{recommend? "Recomendado" : "NO recomendado"} |||| Horas jugadas: {hoursPlayed} |||| Dificultad: {difficulty}</p>
    </div>
    </>
  )

}

export default ReviewCard
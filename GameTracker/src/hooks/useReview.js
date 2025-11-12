import { useEffect, useState } from "react"
import {reviewAPI} from "../api/reviewApi"

export const useReview = () => {
    const [reviews, setReview] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchReview()
    }, [])

    const fetchReview = async () => {
        setError(null)
        try {
            const data = await reviewAPI.getAll()
            setReview([...data])
        } catch (err) {
            setError(err.message)
            console.error('Error fetching reviews:', err)
        }
    }
    const createReview = async (reviewData) => {
        setError(null)
        try {

        if (!reviewData.game_id || !reviewData.rating) {
            throw new Error('Juego y estrellas son campos obligatorios')
        }
        const newReview = await reviewAPI.create(reviewData)
        return newReview
        } catch (err) {
        setError(err.message)
        console.error('Error creating game:', err)
        throw err
        }
    }

    const editReview = async (gameId,body) => {
        setError(null)
        try {
            const updatedReview = await reviewAPI.patch(gameId,body)
            return updatedReview
        } catch (err) {
            setError(err.message)
            console.error('Error al actualizar:', err)
            throw err
        } finally {
            fetchReview()
        }
    }

    const deleteReview = async (id) => {
        setError(null)
    
        try {
            await reviewAPI.delete(id)
            setReview(prev => prev.filter(review => 
                review._id !== id
            ))
        } catch (err) {
            setError(err.message)
            console.error('Error deleting review:', err)
            throw err
        }
    }

    return {
    reviews,
    fetchReview,
    createReview,
    editReview,
    deleteReview,
    error,
    }
}
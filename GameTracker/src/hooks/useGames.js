import { useEffect, useState } from "react"
import {gamesAPI} from "../api/gamesApi"

export const useGames = () => {
    const [games, setGames] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchGames()
    }, [])

    const fetchGames = async () => {
        setError(null)
        try {
        const data = await gamesAPI.getAll()
        setGames(data)
        } catch (err) {
        setError(err.message)
        console.error('Error fetching games:', err)
        } finally {
        }
    }

    const createGame = async (gameData) => {
        setError(null)
        try {

        if (!gameData.title || !gameData.genres || !gameData.platform) {
            throw new Error('Título, género y plataforma son campos obligatorios')
        }
        const newGame = await gamesAPI.create(gameData)
        setGames(prev => [...prev, newGame])
        return newGame
        } catch (err) {
        setError(err.message)
        console.error('Error creating game:', err)
        throw err
        }
    }

    const editGame = async (id,body) => {
        setError(null)
        try {
            const updatedGame = await gamesAPI.patch(id,body)
            setGames(prev => prev.map(game => 
                game._id === id ? updatedGame : game
            ))
            return updatedGame
        } catch (err) {
            setError(err.message)
            console.error('Error al actualizar:', err)
            throw err
        }
    }

    const deleteGame = async (id) => {
        setError(null)
    
        try {
            await gamesAPI.delete(id)
            setGames(prev => prev.filter(game => 
                game._id !== id
            ))
        } catch (err) {
            setError(err.message)
            console.error('Error deleting game:', err)
            throw err
        }
    }

    return {
    games,
    fetchGames,
    createGame,
    editGame,
    error,
    deleteGame,
    }
}

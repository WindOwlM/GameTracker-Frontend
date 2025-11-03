import {useState, useEffect} from 'react'
import "../styles/App.css"
import GameCard from "../components/cards/card"
import Modal from "../components/modal/modal"
import Success from '../components/notify/success/success'
import Error from '../components/notify/error/error'
import Warning from '../components/notify/warning/warning'
import Input from '../components/inputs/text/formInput'

function App(){
const [games, setGames] = useState([])
const [title,setTitle] = useState(null)
const [achieve,setAchieve] = useState(null)
const API_url = "http://localhost:3000/games"


useEffect(() => {

  fetch(API_url)
  .then(res => res.json())
  .then(data => setGames(data))

}, [] )


const createGame = () =>{
  const newGame = {
    title: title,
    totalAchievements: achieve
  }

  fetch(API_url,{
  method: "POST",
  headers: {"Content-Type" : "application/json"},
  body: JSON.stringify(newGame)
})
    .then(res => res.json())
    .then(data => {
      setGames([...games, data])
      setTitle("")
      setAchieve("")
    })
}

const eliminarGame = (id) => {
  console.log(`${API_url}/${id}`)
  fetch(`${API_url}/${id}`,{
    method: "DELETE"
  })
    .then( () => {
      games.filter(game => game.id !== id)
    })
}


  return(
    <>
      <Modal />
      <div className='form'>
        <h2>agregar juegos</h2>

        <input 
        type="text" 
        placeholder='Nombre del juego'
        value={title}
        onChange={e => setTitle(e.target.value)}
        />

        <input 
        type="number" 
        placeholder='Logros del juego'
        value={achieve}
        onChange={e => setAchieve(e.target.value)}
        />

        <button onClick={createGame}>Gaurdar</button>
      </div>

      <ul>
        {games.map((game) => (
          <li key={game._id}>
            {game.title}
            {game.totalAchievements}

            <button onClick={eliminarGame}>Eliminar</button>
            </li>
            
        ))}
      </ul>
      
    </>
  )
}

export default App;
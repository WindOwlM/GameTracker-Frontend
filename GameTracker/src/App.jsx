import "./App.css"
import logo from "./assets/react.svg"

function App(){

  const nombre = "Maicol"
  const edad = "20"
  const profesion = "dev"
  const trabajando = false
  const front = ["HTML", "CSS", "JS"]
  const back = ["PYTHON", "JS"]

  return(
    <>
      <div className="container">
        <h1 className="nombre">Hola a {nombre} desde el componente</h1>
        <h2>Presentando</h2>
        <h2>Mi tarjeta de presentacion</h2>
        <img src={logo} alt="" />
        <p>Mi edad es: {edad}</p>
        <p>Estado: {trabajando ? "Contratado" : "Disponible"}</p>
        <p>Lenguajes para front: {front.join('-')}</p>
        <p>Lenguajes para back: {back.join('-')}</p>
      </div>
    </>
  )
}

export default App;
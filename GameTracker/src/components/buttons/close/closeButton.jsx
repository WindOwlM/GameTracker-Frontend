import './closeButton.css'

export default function CloseButton ({closeAction}) {
    
    return(
    <>
        <button className="button"  onClick={closeAction}>
            <span className="X"></span>
            <span className="Y"></span>
            <div className="close">Cerrar</div>
        </button>

    </>)
}

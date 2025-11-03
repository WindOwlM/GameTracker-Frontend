import './submitButton.css'

export default function SubmitButton ({submitAction, text}) {
    
    return(
    <>
        <button className="button-sub" onClick={submitAction}>{text}</button>
    </>)
}

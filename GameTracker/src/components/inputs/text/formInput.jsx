import './formInput.css'

export default function Input({text}) {
  return (
      <div className="brutalist-container">
        <input placeholder="TYPE HERE" className="brutalist-input smooth-type" type="text" />
        <label className="brutalist-label">{text}</label>
      </div>
  );
}

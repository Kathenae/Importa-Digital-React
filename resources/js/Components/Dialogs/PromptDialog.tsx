import { DialogState } from "./types";

export default function PromptDialog({ open, title, description, value, onChange, onClose, onConfirm }: DialogState) {
  return (
    <dialog open={open}>
      <article>
        <h3>{title}</h3>
        <div>
          <label htmlFor="">{description}</label>
          {onChange && <input type="text" step={1} value={value} onChange={(evt) => onChange(evt.target.value)} /> }
        </div>
        <footer>
          <a href="#cancel" role="button" className="secondary" onClick={onClose}>Cancel</a>
          <a href="#confirm" role="button" onClick={onConfirm}>Confirm</a>
        </footer>
      </article>
    </dialog>
  )
}
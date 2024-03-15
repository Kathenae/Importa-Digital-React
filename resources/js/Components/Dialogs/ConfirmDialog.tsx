import { DialogState } from "./types";

export default function ConfirmDialog({open, title, description, onClose, onConfirm} : DialogState) {
  return (
    <dialog open={open}>
      <article>
        <h3>{title}</h3>
        <p>{description}</p>
        <footer>
          <a href="#cancel" role="button" className="secondary" onClick={onClose}>Cancel</a>
          <a href="#confirm" role="button" onClick={onConfirm}>Confirm</a>
        </footer>
      </article>
    </dialog>
  )
}

import { DialogState } from "./types";

export default function AlertDialog({open, title, description, onConfirm} : DialogState) {
  return (
    <dialog open={open}>
      <article>
        <h3>{title}</h3>
        <p>{description}</p>
        <footer>
          <a href="#confirm" role="button" onClick={onConfirm}>Ok</a>
        </footer>
      </article>
    </dialog>
  )
}
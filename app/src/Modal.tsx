import { ReactNode } from 'react';
import './Modal.css'

interface ModalProps {
  app: { id: number; name: string; icon: string; content: ReactNode } | null;
  onClose: () => void;
}

const Modal = ({ app, onClose }: ModalProps) => {
  if (!app) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{app.name}</h2>
        <div>{app.content}</div>
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};
export default Modal
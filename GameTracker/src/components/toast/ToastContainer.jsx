import Toast from './Toast'
import './toast.css'

const ToastContainer = ({ toasts, onRemove, position = 'top-right' }) => {
    if (toasts.length === 0) return null

    const getPositionClass = () => {
        const positions = {
        'top-right': 'toast-container-top-right',
        'top-left': 'toast-container-top-left',
        'top-center': 'toast-container-top-center',
        'bottom-right': 'toast-container-bottom-right',
        'bottom-left': 'toast-container-bottom-left',
        'bottom-center': 'toast-container-bottom-center'
        }
        return positions[position] || 'toast-container-top-right'
    }

    return (
        <div className={`toast-container ${getPositionClass()}`}>
        {toasts.map(toast => (
            <Toast 
            key={toast.id} 
            toast={toast} 
            onClose={onRemove} 
            />
        ))}
        </div>
    )
}

export default ToastContainer
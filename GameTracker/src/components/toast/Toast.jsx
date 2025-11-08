import { useState, useEffect } from 'react'
import './toast.css'
import Loading from '../Loading/Loading'

const Toast = ({ toast, onClose }) => {
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (toast.type === 'loading') return
        
        if (toast.duration > 0) {
        const timer = setTimeout(() => {
            handleClose()
        }, toast.duration)
        return () => clearTimeout(timer)
        }
    }, [toast.duration, toast.type])

    const handleClose = () => {
        if (toast.type === 'loading' && !toast.allowClose) return
        
        setIsExiting(true)
        setTimeout(() => onClose(toast.id), 300)
    }

    const getIcon = () => {
        const icons = {
        success: '✓',
        error: '!',
        warning: '⚠',
        info: 'i',
        loading: <Loading />
        }
        return icons[toast.type] || '✓'
    }

    const getColors = () => {
        const colors = {
        success: {
            bg: '#d4edda',
            border: '#28a745',
            icon: '#28a745',
            text: '#155724'
        },
        error: {
            bg: '#f8d7da',
            border: '#dc3545',
            icon: '#dc3545',
            text: '#721c24'
        },
        warning: {
            bg: '#fff3cd',
            border: '#ffc107',
            icon: '#ffc107',
            text: '#856404'
        },
        info: {
            bg: '#d1ecf1',
            border: '#17a2b8',
            icon: '#17a2b8',
            text: '#0c5460'
        },
        loading: {
            bg: '#e7f3ff',
            border: '#000',
            icon: '#fff',
            text: '#000'
        }
        }
        return colors[toast.type] || colors.success
    }

    const colors = getColors()
    const isLoading = toast.type === 'loading'

    return (
        <div 
        className={`toast-item toast-${toast.type} ${isExiting ? 'toast-exit' : ''}`}
        style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
            color: colors.text
        }}
        role="alert"
        aria-live="polite"
        >
        <div 
            className={`toast-icon ${isLoading ? 'toast-icon-loading' : ''}`}
            style={{
            backgroundColor: isLoading ? 'transparent' : colors.icon,
            borderColor: colors.border,
            border: isLoading ? 'none' : '3px solid'
            }}
            aria-hidden="true"
        >
            {getIcon()}
        </div>
        
        <div className="toast-message">
            {toast.message}
        </div>
        
        {(!isLoading || toast.allowClose) && (
            <button 
            className="toast-close"
            onClick={handleClose}
            style={{
                color: colors.text,
                borderColor: colors.border
            }}
            aria-label="Cerrar notificación"
            >
            ×
            </button>
        )}
        
        {toast.duration > 0 && !isLoading && (
            <div 
            className="toast-progress"
            style={{
                animationDuration: `${toast.duration}ms`,
                backgroundColor: colors.border
            }}
            />
        )}
        </div>
    )
}

export default Toast
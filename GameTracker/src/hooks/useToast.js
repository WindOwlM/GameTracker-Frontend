import { useState } from 'react'

const useToast = () => {
    const [toasts, setToasts] = useState([])

    const addToast = (message, type = 'success', duration = 4000, options = {}) => {
        const id = Date.now() + Math.random()
        const newToast = { id, message, type, duration, ...options }
        
        setToasts(prev => [...prev, newToast])

        if (duration > 0 && type !== 'loading') {
        setTimeout(() => removeToast(id), duration)
        }

        return id
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    const removeAllToasts = () => {
        setToasts([])
    }

    const success = (message, duration = 4000) => 
        addToast(message, 'success', duration)
    
    const errorT = (message, duration = 5000) => 
        addToast(message, 'error', duration)
    
    const warning = (message, duration = 4000) => 
        addToast(message, 'warning', duration)
    
    const info = (message, duration = 3000) => 
        addToast(message, 'info', duration)

    const loadingT = (message = 'Cargando...') => {
        const id = addToast(message, 'loading', 0, { allowClose: false })
        return id
    }

    const dismissLoading = (id) => {
        removeToast(id)
    }

    const updateToast = (id, message, type = 'success', duration = 4000) => {
        removeToast(id)
        return addToast(message, type, duration)
    }

    return {
        toasts,
        addToast,
        removeToast,
        removeAllToasts,
        success,
        errorT,
        warning,
        info,
        loadingT,
        dismissLoading,
        updateToast
    }
}

export default useToast
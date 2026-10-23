import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // <-- 1. Añade esta importación

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App /> {/* <-- 2. Añade tu componente aquí dentro */}
    </StrictMode>,
)

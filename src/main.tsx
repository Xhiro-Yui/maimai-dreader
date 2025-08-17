import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ThemeProvider} from './context/theme/ThemeProvider.tsx';
import {SongDataProvider} from "./context/data/SongDataProvider.tsx";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <SongDataProvider>
                <App/>
            </SongDataProvider>
        </ThemeProvider>
    </StrictMode>,
)

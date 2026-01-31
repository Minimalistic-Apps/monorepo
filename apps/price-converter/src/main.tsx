import { ThemeProvider } from '@minimalistic-apps/components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './index.css';
import { createStoreCompositionRoot } from './app/state/compositionRoot';

const main = () => {
    const services = createStoreCompositionRoot();
    services.loadInitialState();

    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </React.StrictMode>,
    );
};

main();

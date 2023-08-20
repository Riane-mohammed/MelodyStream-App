import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateProvider } from './utils/StateProvider';
import reducer, { initialState } from './utils/Reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>
);
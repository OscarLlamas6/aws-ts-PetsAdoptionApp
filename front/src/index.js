import React from 'react';
import Routes from './routes/routes'; 
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Routes />);
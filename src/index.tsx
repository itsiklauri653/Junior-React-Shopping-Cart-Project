import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  rootElement
);

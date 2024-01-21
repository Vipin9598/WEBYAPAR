import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import { Toaster } from 'react-hot-toast';  
import userSlice from './slices/userSlice';
import {combineReducers} from "@reduxjs/toolkit"

const rootreducer = combineReducers({
  user:userSlice
})

const store = configureStore({
  reducer:rootreducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


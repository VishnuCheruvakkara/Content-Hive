import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './routes/RouterConfig';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from './components/ui/Spinner';
import useCSRF from './hooks/useCSRF';
import NavigationRegistrar from './services/Navigation/NavigationRegistrar';
import AuthInitializer from './auth/authInitializer';

function App() {

  // initialize CSRF token on app load
  useCSRF();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <BrowserRouter>
            <NavigationRegistrar />
            <Toaster position="top-right" reverseOrder={false} />
            <AuthInitializer>
              <RouterConfig />
            </AuthInitializer>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App

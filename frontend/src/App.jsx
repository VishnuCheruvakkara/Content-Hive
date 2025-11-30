import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './routes/RouterConfig';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from './components/ui/Spinner';

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <BrowserRouter>
            <Toaster position="top-right" reverseOrder={false} />
            <RouterConfig />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App

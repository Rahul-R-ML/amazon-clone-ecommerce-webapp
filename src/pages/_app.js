import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
import '../styles/custom.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';
import StorageService from '../services/StorageService';
import { hydrate } from '../slices/basketSlice';

import { SessionProvider } from '../contexts/authContext';

store.subscribe(() => {
  StorageService.set('basket', JSON.stringify(store.getState().basket));
});

let basket = StorageService.get('basket');
basket = basket ? JSON.parse(basket) : { items: [] };
store.dispatch(hydrate(basket));

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer transition={Zoom} />
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;

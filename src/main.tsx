import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import './index.css';
import { StoreProvider } from './providers/StoreProvider';
import { router } from './router';
import './services/db';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </Provider>
);

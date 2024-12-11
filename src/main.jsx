
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Routes } from './Route/Routes.jsx';
import { NextUIProvider } from '@nextui-org/system';
import { AuthProviders } from './Components/Providers/AuthProviders.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
 
    <AuthProviders>
      <NextUIProvider>
        {/* Wrap the app with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Routes}></RouterProvider>
        </QueryClientProvider>
      </NextUIProvider>
    </AuthProviders>
 
);

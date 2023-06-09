import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Auth } from '@supabase/auth-ui-react'

import View from 'view'

import { supabase } from 'configs'
import reportWebVitals from 'reportWebVitals'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import UiProvider from 'providers/ui.provider'
import DesigerProvider from 'providers/desiger.provider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <UiProvider>
      <QueryClientProvider client={queryClient}>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <DesigerProvider>
            <View />
            <ToastContainer />
          </DesigerProvider>
        </Auth.UserContextProvider>
      </QueryClientProvider>
    </UiProvider>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

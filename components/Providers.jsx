'use client'
import React, { useEffect } from 'react'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
function Providers({children}) {
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
}

export default Providers
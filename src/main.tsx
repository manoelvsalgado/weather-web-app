import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@chakra-ui/react/preset'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)

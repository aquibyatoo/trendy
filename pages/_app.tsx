import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { withErrorBoundary } from 'react-error-boundary'
import { FullPageErrorFallback } from 'src/components/lib'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default withErrorBoundary(MyApp, {
  FallbackComponent: FullPageErrorFallback
})

import { QueryClientProvider, QueryClient } from 'react-query'

interface QueryClientProviderProps {
  children: React.ReactNode
}
const QueryProvider = (props: QueryClientProviderProps) => {
  const { children } = props
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider

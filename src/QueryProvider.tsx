import { QueryClientProvider, QueryClient } from 'react-query'

interface QueryClientProviderProps {
  children: React.ReactNode
}
const QueryProvider = (props: QueryClientProviderProps) => {
  const { children } = props
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider

import { AuthProvider } from '@/contexts/JWTContext';

function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;

'use client';

import { ThemeProvider } from 'next-themes';
import AuthProvider from '@/components/auth/AuthProvider';

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default Providers;

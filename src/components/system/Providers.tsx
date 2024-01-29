'use client';

import { ThemeProvider } from 'next-themes';

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default Providers;

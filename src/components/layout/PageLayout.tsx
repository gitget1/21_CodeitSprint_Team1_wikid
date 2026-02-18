import type { ReactNode } from 'react';

import Footer from './Footer';
import Navbar from './NavBar';

interface PageLayoutProps {
  children: ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>

      <main className="flex min-w-0 flex-1 w-full max-w-full mx-auto overflow-x-hidden">
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PageLayout;

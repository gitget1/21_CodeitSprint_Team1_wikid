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

      <main className="flex grow w-full max-w-480 mx-auto bg-gray-50">{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PageLayout;

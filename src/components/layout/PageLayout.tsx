import { ReactNode } from 'react';

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

      <main className="flex w-full max-w-480 mx-auto">{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PageLayout;

'use client';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ScrollTop from '@/components/ScrollTop';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body>
        {isLoginPage || isAdminPage ? (
          <>{children}</>
        ) : (
          <>
            <Navbar />
            <main style={{ paddingTop: 90 }}>
              {children}
            </main>
            <Footer />
            <Chatbot />
            <ScrollTop />
          </>
        )}
      </body>
    </html>
  );
}

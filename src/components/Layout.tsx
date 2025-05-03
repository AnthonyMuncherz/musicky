import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-foreground/10 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Musicky
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-foreground/70">
              Home
            </Link>
            <Link href="/upload" className="hover:text-foreground/70">
              Upload
            </Link>
            <Link href="/about" className="hover:text-foreground/70">
              About
            </Link>
            <Link href="/algorithm" className="hover:text-foreground/70">
              Algorithm Analysis
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t border-foreground/10 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/60">
          © {new Date().getFullYear()} Musicky. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 
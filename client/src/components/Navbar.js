"use client";
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              NEVERMIND <span className="text-gray-400 font-light">THE MUSIC</span>
            </Link>
          </div>
          {/* Menu */}
          <div className="hidden md:flex space-x-10">
            <Link href="/" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">Guitarras</Link>
            <Link href="/bajos" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Bajos</Link>
            <Link href="/amplificadores" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Amplificadores</Link>
            <Link href="/accesorios" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Accesorios</Link>
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-gray-400 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>
            <button className="text-gray-400 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <Link href="/carrito" className="text-gray-400 hover:text-gray-900 transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

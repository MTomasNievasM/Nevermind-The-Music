import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Navbar Minimalista */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">
                Nevermind <span className="font-medium text-gray-400">The Music</span>
              </span>
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
              <button className="text-gray-400 hover:text-gray-900 transition-colors relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch border border-gray-100 min-h-[450px]">
          {/* Texto Hero */}
          <div className="p-10 md:p-16 md:w-1/2 flex flex-col justify-center bg-white z-10">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-4">Nueva Colección</span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Encuentra tu<br/>sonido ideal.
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-md font-light">
              Explora nuestra cuidada selección de instrumentos. Calidad premium para músicos que no se conforman.
            </p>
            <div>
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-colors hover:shadow-lg hover:shadow-blue-600/30">
                Ver Catálogo
              </button>
            </div>
          </div>
          {/* Imagen Hero */}
          <div className="w-full md:w-1/2 relative bg-gray-50 min-h-[300px]">
             <Image 
              src="/hero_guitar_light.png" 
              alt="Guitarra principal" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      </div>

      {/* Categorías (Novedad en e-commerce) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Guitarras Eléctricas', 'Guitarras Acústicas', 'Amplificadores', 'Pedales y Efectos'].map((cat, i) => (
            <div key={i} className="bg-white py-6 px-4 rounded-2xl border border-gray-100 text-center cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Más Vendidos</h2>
            <p className="text-gray-500 mt-2">Los instrumentos favoritos de nuestra comunidad.</p>
          </div>
          <a href="#" className="hidden sm:block text-blue-600 hover:text-blue-700 font-semibold transition-colors">Ver todo el catálogo &rarr;</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-64 w-full bg-[#f4f4f4] rounded-2xl overflow-hidden mb-6 flex justify-center items-center">
              <Image 
                src="/electric_guitar_white.png" 
                alt="Guitarra Eléctrica" 
                fill 
                className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
              />
              <span className="absolute top-4 left-4 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                TOP
              </span>
            </div>
            <div className="px-2">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">Fender Stratocaster Classic</h3>
              <p className="text-sm text-gray-500 mb-4">Color Sunburst</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-gray-900">1.250€</span>
                <button className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors hover:shadow-lg hover:shadow-blue-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-64 w-full bg-[#f4f4f4] rounded-2xl overflow-hidden mb-6 flex justify-center items-center">
              <Image 
                src="/acoustic_guitar_white.png" 
                alt="Guitarra Acústica" 
                fill 
                className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="px-2">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">Taylor Grand Auditorium</h3>
              <p className="text-sm text-gray-500 mb-4">Madera maciza</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-gray-900">980€</span>
                <button className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors hover:shadow-lg hover:shadow-blue-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-64 w-full bg-[#f4f4f4] rounded-2xl overflow-hidden mb-6 flex justify-center items-center">
              <Image 
                src="/vintage_amp_white.png" 
                alt="Amplificador" 
                fill 
                className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="px-2">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">Marshall Vintage 30W</h3>
              <p className="text-sm text-gray-500 mb-4">Válvulas 100%</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-gray-900">1.450€</span>
                <button className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors hover:shadow-lg hover:shadow-blue-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-gray-900 uppercase mb-4 md:mb-0">
            Nevermind <span className="font-medium text-gray-400">The Music</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">© 2026 Nevermind The Music. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}

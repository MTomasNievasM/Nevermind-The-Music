import Image from "next/image";
import Link from "next/link";

export default function AccesoriosPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Navbar Minimalista */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link href="/">
                <span className="text-xl font-black tracking-tighter text-gray-900 uppercase hover:text-blue-600 transition-colors">
                  Nevermind <span className="font-medium text-gray-400">The Music</span>
                </span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-10">
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Guitarras</Link>
              <Link href="/bajos" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Bajos</Link>
              <Link href="/amplificadores" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Amplificadores</Link>
              <Link href="/accesorios" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">Accesorios</Link>
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

      {/* Header Accesorios */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 pr-8">
            <div className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Categoría
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Los Pequeños <br/>Grandes Detalles
            </h1>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              El tono perfecto no solo depende de la guitarra. Explora nuestra selección de pedales de boutique, cables premium, correas de cuero y todo lo que necesitas.
            </p>
          </div>
          <div className="md:w-1/2 w-full h-[350px] relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-[#f4f4f4]">
            <Image 
              src="/hero_accessories_light.png" 
              alt="Accesorios Header" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Catálogo Accesorios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Todos</button>
            <button className="bg-white text-gray-600 border border-gray-200 px-5 py-2 rounded-full text-sm font-medium hover:border-gray-900 transition-colors">Pedales</button>
            <button className="bg-white text-gray-600 border border-gray-200 px-5 py-2 rounded-full text-sm font-medium hover:border-gray-900 transition-colors">Correas</button>
            <button className="bg-white text-gray-600 border border-gray-200 px-5 py-2 rounded-full text-sm font-medium hover:border-gray-900 transition-colors">Cables</button>
          </div>
          <span className="text-sm text-gray-500 font-medium">Mostrando 3 productos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Accesorio 1 */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-72 w-full bg-[#f4f4f4] rounded-2xl overflow-hidden mb-6 flex justify-center items-center">
              <Image 
                src="/accessory_pedal_white.png" 
                alt="Overdrive Pedal" 
                fill 
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
              />
              <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                EFECTOS
              </span>
            </div>
            <div className="px-3 pb-3">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Classic Vintage Overdrive</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">El mítico pedal verde. Añade un overdrive cremoso y dinámico que respeta el tono original de tu instrumento.</p>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div>
                  <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider mb-1">Precio</span>
                  <span className="text-2xl font-black text-gray-900">145€</span>
                </div>
                <button className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg shadow-blue-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Accesorio 2 */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-72 w-full bg-[#f4f4f4] rounded-2xl overflow-hidden mb-6 flex justify-center items-center">
              <Image 
                src="/accessory_strap_white.png" 
                alt="Leather Strap" 
                fill 
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
              />
              <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                ARTESANÍA
              </span>
            </div>
            <div className="px-3 pb-3">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Correa Premium Cuero</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">Correa de cuero genuino trabajada a mano. Extremadamente cómoda para esos conciertos largos. Envejece con gracia.</p>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div>
                  <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider mb-1">Precio</span>
                  <span className="text-2xl font-black text-gray-900">85€</span>
                </div>
                <button className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg shadow-blue-600/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Accesorio 3 (Placeholder as there's only 2 generated products, reusing one or generic) */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 group opacity-70">
            <div className="relative h-72 w-full bg-[#f4f4f4] rounded-2xl overflow-hidden mb-6 flex justify-center items-center">
              {/* No image generated for the 3rd, just text */}
              <span className="text-gray-400 font-medium">Cable Instrumento 3m</span>
            </div>
            <div className="px-3 pb-3">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Cable Profesional</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">Cable libre de oxígeno con conectores bañados en oro. Señal perfecta sin pérdida de agudos.</p>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div>
                  <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider mb-1">Precio</span>
                  <span className="text-2xl font-black text-gray-900">45€</span>
                </div>
                <button className="bg-gray-200 text-gray-400 w-12 h-12 rounded-full flex items-center justify-center cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
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

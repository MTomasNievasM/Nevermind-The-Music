"use client";
import Link from "next/link";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      
      if (res.ok) {
        alert("¡Bienvenido de nuevo, " + data.nombre + "!");
        localStorage.setItem("token", data.access_token);
        window.location.href = "/";
      } else {
        alert("Error: " + (data.message || "Credenciales incorrectas"));
      }
    } catch (error) {
      alert("Error de conexión con el servidor. ¿Está NestJS encendido?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Navbar Minimalista */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link href="/">
                <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">
                  Nevermind <span className="font-medium text-gray-400">The Music</span>
                </span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-10">
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Volver a la Tienda</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Formulario de Login */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Bienvenido</h1>
            <p className="text-gray-500 text-sm">Inicia sesión para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Correo electrónico</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-gray-700">Contraseña</label>
                <a href="#" className="text-xs text-blue-600 hover:underline font-medium">¿Olvidaste tu contraseña?</a>
              </div>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-600/30 mt-4 flex justify-center items-center"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8 font-medium">
            ¿No tienes cuenta? <Link href="/registro" className="text-blue-600 hover:underline">Regístrate gratis</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

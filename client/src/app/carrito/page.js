"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';

export default function CarritoPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  
  // Checkout states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment, 3: Loading, 4: Success
  const [loadingText, setLoadingText] = useState("");
  const [orderId, setOrderId] = useState("");
  
  // Form fields
  const [shippingForm, setShippingForm] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  });
  
  const [paymentForm, setPaymentForm] = useState({
    titular: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Auto-fill values for testing/demonstration
  const handleDemoFill = () => {
    setShippingForm({
      nombre: 'Tomás Nievas',
      email: 'tomas.nievas@estudio.edu',
      direccion: 'Av. de la Música 45, 3º B',
      ciudad: 'Madrid',
      codigoPostal: '28001'
    });
    setPaymentForm({
      titular: 'TOMAS NIEVAS',
      numeroTarjeta: '4111 2222 3333 4444',
      expiracion: '12/28',
      cvv: '123'
    });
    setFormErrors({});
  };

  // Format card number with spaces every 4 digits
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setPaymentForm({ ...paymentForm, numeroTarjeta: formatted });
  };

  // Format expiry MM/AA
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setPaymentForm({ ...paymentForm, expiracion: value });
  };

  // Card type helper
  const getCardType = (number) => {
    const cleaned = number.replace(/\s+/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    return 'Unknown';
  };

  // Validate Step 1 (Shipping)
  const validateShipping = () => {
    const errors = {};
    if (!shippingForm.nombre.trim()) errors.nombre = 'El nombre es obligatorio';
    if (!shippingForm.email.trim() || !/\S+@\S+\.\S+/.test(shippingForm.email)) errors.email = 'Introduce un email válido';
    if (!shippingForm.direccion.trim()) errors.direccion = 'La dirección es obligatoria';
    if (!shippingForm.ciudad.trim()) errors.ciudad = 'La ciudad es obligatoria';
    if (!shippingForm.codigoPostal.trim() || shippingForm.codigoPostal.length < 5) errors.codigoPostal = 'Código postal no válido';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Step 2 (Payment)
  const validatePayment = () => {
    const errors = {};
    if (!paymentForm.titular.trim()) errors.titular = 'El nombre del titular es obligatorio';
    const cardClean = paymentForm.numeroTarjeta.replace(/\s+/g, '');
    if (cardClean.length !== 16) errors.numeroTarjeta = 'Tarjeta inválida (deben ser 16 dígitos)';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentForm.expiracion)) errors.expiracion = 'Formato MM/AA inválido';
    if (paymentForm.cvv.length < 3) errors.cvv = 'CVV inválido';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (checkoutStep === 1) {
      if (validateShipping()) setCheckoutStep(2);
    }
  };

  const handleConfirmPurchase = () => {
    if (!validatePayment()) return;
    
    // Start fake loading flow
    setCheckoutStep(3);
    
    const loadingPhrases = [
      "Estableciendo conexión encriptada de 256 bits...",
      "Validando datos de envío y facturación...",
      "Procesando pago seguro 3D-Secure...",
      "Autorizando transacción con el banco emisor...",
      "Generando recibo y confirmación digital..."
    ];
    
    let currentIdx = 0;
    setLoadingText(loadingPhrases[currentIdx]);
    
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < loadingPhrases.length) {
        setLoadingText(loadingPhrases[currentIdx]);
      }
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      // Generate dynamic order ID
      const randomOrder = 'NVM-' + Math.floor(100000 + Math.random() * 900000) + '-2026';
      setOrderId(randomOrder);
      setCheckoutStep(4);
    }, 4000);
  };

  const handleCloseSuccess = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep(1);
    clearCart();
  };

  // PDF / Invoice simulator on client
  const handleDownloadInvoice = () => {
    const invoiceContent = `
=========================================
      NEVERMIND THE MUSIC - FACTURA
=========================================
Nº PEDIDO: ${orderId}
FECHA: ${new Date().toLocaleDateString('es-ES')}
ESTADO: PAGADO (Simulación Autorizada)
-----------------------------------------
CLIENTE:
${shippingForm.nombre}
${shippingForm.email}
${shippingForm.direccion}
${shippingForm.ciudad}, ${shippingForm.codigoPostal}
-----------------------------------------
DETALLE DEL PEDIDO:
${cartItems.map(item => `- ${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()}€`).join('\n')}
-----------------------------------------
SUBTOTAL: ${(totalPrice * 0.79).toFixed(2)}€
IVA (21%): ${(totalPrice * 0.21).toFixed(2)}€
ENVÍO: GRATIS (Promoción Especial)
TOTAL: ${totalPrice.toLocaleString()}€
=========================================
¡Gracias por confiar en Nevermind The Music!
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Factura_${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-gray-900 pb-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-black tracking-tight mb-8">TU CESTA DE COMPRA</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center shadow-sm max-w-2xl mx-auto mt-10">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Tu cesta está vacía</h2>
            <p className="text-gray-500 mb-8 font-light max-w-sm mx-auto">
              Parece que aún no has añadido ningún producto a tu bolsa. ¡Date una vuelta por nuestro catálogo!
            </p>
            <Link href="/" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-600/20">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Products List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="relative w-28 h-28 bg-[#f8f9fa] rounded-2xl flex-shrink-0 flex items-center justify-center p-2 overflow-hidden border border-gray-50">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2"
                      />
                    ) : (
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow text-center sm:text-left">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                      {item.category || 'Instrumentos'}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm font-medium mt-1">Precio Unitario: {item.price.toLocaleString()}€</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors shadow-sm"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors shadow-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Pricing and Delete */}
                  <div className="text-center sm:text-right sm:ml-4 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto">
                    <span className="text-xl font-black text-gray-900">
                      {(item.price * item.quantity).toLocaleString()}€
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Eliminar producto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Side Panel */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-28">
              <h2 className="text-2xl font-bold mb-6">RESUMEN DEL PEDIDO</h2>
              
              <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span className="font-light">Subtotal</span>
                  <span className="font-medium">{totalPrice.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span className="font-light">Envío</span>
                  <span className="font-medium text-blue-600">Gratis (Promoción)</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span className="font-light">Impuestos (IVA 21% incluido)</span>
                  <span className="font-medium">{(totalPrice * 0.21).toLocaleString(undefined, {maximumFractionDigits: 0})}€</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-lg font-bold">Total del Pedido</span>
                <span className="text-3xl font-black text-gray-900">{totalPrice.toLocaleString()}€</span>
              </div>

              <button 
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-gray-900 text-white py-4 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 group"
              >
                <span>Finalizar Compra</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Pago y Envío 100% Protegidos</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-gray-100 max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
              <div>
                <h3 className="text-xl font-bold">Pasarela de Compra Segura</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Nevermind The Music • Licencia Académica</p>
              </div>
              {checkoutStep !== 3 && (
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-150 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shadow-sm"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Demonstration Banner */}
            {checkoutStep < 3 && (
              <div className="bg-amber-50 border-b border-amber-100 px-6 py-3 flex justify-between items-center text-xs text-amber-800 flex-shrink-0 font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><strong>Modo de Pruebas:</strong> Las compras son totalmente ficticias y gratuitas.</span>
                </div>
                <button 
                  onClick={handleDemoFill}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-full transition-colors whitespace-nowrap shadow-sm shadow-amber-600/10"
                >
                  Autorellenar Datos de Prueba
                </button>
              </div>
            )}

            {/* Modal Body / Scrollable */}
            <div className="p-8 overflow-y-auto flex-grow">
              
              {/* Steps Progress Indicator */}
              {checkoutStep < 3 && (
                <div className="flex justify-between items-center mb-8 max-w-sm mx-auto text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${checkoutStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</span>
                    <span className={checkoutStep === 1 ? 'text-gray-900' : 'text-gray-400 font-normal'}>Envío</span>
                  </div>
                  <div className="h-px bg-gray-200 flex-grow mx-4"></div>
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${checkoutStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</span>
                    <span className={checkoutStep === 2 ? 'text-gray-900' : 'text-gray-400 font-normal'}>Pago Falso</span>
                  </div>
                </div>
              )}

              {/* STEP 1: SHIPPING */}
              {checkoutStep === 1 && (
                <div className="space-y-5 animate-slide-in">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre Completo</label>
                    <input 
                      type="text"
                      value={shippingForm.nombre}
                      onChange={(e) => setShippingForm({ ...shippingForm, nombre: e.target.value })}
                      placeholder="Ej. Tomás Nievas"
                      className={`w-full px-4 py-3 rounded-xl border ${formErrors.nombre ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors`}
                    />
                    {formErrors.nombre && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.nombre}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Correo Electrónico</label>
                    <input 
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      placeholder="ejemplo@email.com"
                      className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Dirección de Envío</label>
                    <input 
                      type="text"
                      value={shippingForm.direccion}
                      onChange={(e) => setShippingForm({ ...shippingForm, direccion: e.target.value })}
                      placeholder="Calle, número, piso, puerta..."
                      className={`w-full px-4 py-3 rounded-xl border ${formErrors.direccion ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors`}
                    />
                    {formErrors.direccion && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.direccion}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ciudad</label>
                      <input 
                        type="text"
                        value={shippingForm.ciudad}
                        onChange={(e) => setShippingForm({ ...shippingForm, ciudad: e.target.value })}
                        placeholder="Ej. Madrid"
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.ciudad ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors`}
                      />
                      {formErrors.ciudad && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.ciudad}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Código Postal</label>
                      <input 
                        type="text"
                        value={shippingForm.codigoPostal}
                        onChange={(e) => setShippingForm({ ...shippingForm, codigoPostal: e.target.value })}
                        placeholder="28001"
                        maxLength="5"
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.codigoPostal ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors`}
                      />
                      {formErrors.codigoPostal && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.codigoPostal}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SIMULATED PAYMENT */}
              {checkoutStep === 2 && (
                <div className="space-y-5 animate-slide-in">
                  
                  {/* Interactive Card Preview */}
                  <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden h-44 flex flex-col justify-between border border-white/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                    <div className="flex justify-between items-start">
                      <div className="font-mono text-xs uppercase tracking-widest text-white/60">Tarjeta de Pruebas</div>
                      <span className="text-xl font-bold italic tracking-tighter">
                        {getCardType(paymentForm.numeroTarjeta) === 'Unknown' ? 'NEVERMIND' : getCardType(paymentForm.numeroTarjeta).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="font-mono text-xl tracking-[0.2em] py-2">
                      {paymentForm.numeroTarjeta || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex justify-between font-mono text-xs uppercase text-white/80">
                      <div>
                        <div className="text-[9px] text-white/40">Titular</div>
                        <div className="truncate max-w-[200px]">{paymentForm.titular || 'NOMBRE Y APELLIDOS'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-white/40">Vence</div>
                        <div>{paymentForm.expiracion || 'MM/AA'}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre del Titular</label>
                    <input 
                      type="text"
                      value={paymentForm.titular}
                      onChange={(e) => setPaymentForm({ ...paymentForm, titular: e.target.value.toUpperCase() })}
                      placeholder="COMO APARECE EN LA TARJETA"
                      className={`w-full px-4 py-3 rounded-xl border ${formErrors.titular ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors uppercase`}
                    />
                    {formErrors.titular && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.titular}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Número de Tarjeta de Crédito</label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={paymentForm.numeroTarjeta}
                        onChange={handleCardNumberChange}
                        placeholder="4111 2222 3333 4444"
                        className={`w-full pl-4 pr-12 py-3 rounded-xl border ${formErrors.numeroTarjeta ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {getCardType(paymentForm.numeroTarjeta)}
                      </div>
                    </div>
                    {formErrors.numeroTarjeta && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.numeroTarjeta}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Fecha Expiración</label>
                      <input 
                        type="text"
                        value={paymentForm.expiracion}
                        onChange={handleExpiryChange}
                        placeholder="MM/AA"
                        maxLength="5"
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.expiracion ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors`}
                      />
                      {formErrors.expiracion && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.expiracion}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CVV / Cód. Seguridad</label>
                      <input 
                        type="password"
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        placeholder="123"
                        maxLength="3"
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.cvv ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors`}
                      />
                      {formErrors.cvv && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: LOADING FLOW */}
              {checkoutStep === 3 && (
                <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center animate-pulse">
                  <div className="relative w-20 h-20">
                    <span className="absolute inset-0 rounded-full border-4 border-gray-100"></span>
                    <span className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-gray-900">Procesando Pago Seguro</h4>
                    <p className="text-sm text-gray-500 font-light max-w-sm mx-auto animate-fade-in">{loadingText}</p>
                  </div>
                </div>
              )}

              {/* STEP 4: SUCCESS RECEIPT */}
              {checkoutStep === 4 && (
                <div className="text-center py-6 space-y-8 animate-slide-in">
                  
                  {/* Checked Animation Icon */}
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-150 animate-bounce">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-3xl font-black text-gray-900 tracking-tight">¡PAGO PROCESADO CON ÉXITO!</h4>
                    <p className="text-gray-500 font-light max-w-md mx-auto">
                      Tu pedido ha sido recibido y se encuentra en camino. La transacción simulada se ha registrado correctamente.
                    </p>
                  </div>

                  {/* Receipt Breakdown Card */}
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-150 max-w-md mx-auto text-left text-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3 font-semibold">
                      <span>Nº Pedido:</span>
                      <span className="font-mono text-gray-900">{orderId}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-light">
                      <span>Titular:</span>
                      <span className="font-medium text-gray-900">{shippingForm.nombre}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-light">
                      <span>Destino:</span>
                      <span className="font-medium text-gray-900 truncate max-w-[200px]">{shippingForm.direccion}, {shippingForm.ciudad}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-light">
                      <span>Método de Pago:</span>
                      <span className="font-medium text-gray-900">Tarjeta {getCardType(paymentForm.numeroTarjeta)} (Demo)</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-light border-t border-gray-200 pt-3">
                      <span>Entrega estimada:</span>
                      <span className="font-semibold text-blue-600">En 3 días laborables</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="font-bold text-base">Importe Pagado:</span>
                      <span className="font-black text-xl text-gray-900">{totalPrice.toLocaleString()}€</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <button 
                      onClick={handleDownloadInvoice}
                      className="bg-white border border-gray-200 text-gray-900 font-bold px-6 py-3.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2 flex-1"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Descargar Recibo</span>
                    </button>
                    
                    <button 
                      onClick={handleCloseSuccess}
                      className="bg-gray-900 text-white font-bold px-6 py-3.5 rounded-full hover:bg-blue-600 transition-colors shadow-md flex-1"
                    >
                      Seguir Comprando
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer buttons (only Step 1 and 2) */}
            {checkoutStep < 3 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center flex-shrink-0">
                {checkoutStep === 2 ? (
                  <button 
                    onClick={() => setCheckoutStep(1)}
                    className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    &larr; Volver a Envío
                  </button>
                ) : (
                  <div className="text-xs text-gray-400 font-medium">Paso 1 de 2: Datos de Entrega</div>
                )}

                <button 
                  onClick={checkoutStep === 1 ? handleNextStep : handleConfirmPurchase}
                  className="bg-blue-600 hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md shadow-blue-600/10"
                >
                  {checkoutStep === 1 ? 'Continuar al Pago' : `Autorizar Pago por ${totalPrice.toLocaleString()}€`}
                </button>
              </div>
            )}

          </div>
        </div>
      )}
      
      {/* Dynamic Keyframe Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(15px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </main>
  );
}

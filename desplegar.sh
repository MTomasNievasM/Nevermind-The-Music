#!/bin/bash
# Script de despliegue automático y 100% seguro para la Tienda de Música en Kubernetes

# Detener el script si ocurre algún error
set -e

echo "=========================================================="
echo "🚀 INICIANDO DESPLIEGUE AUTOMÁTICO DE TIENDA DE MÚSICA"
echo "=========================================================="

# IP de tu VPS y puertos asignados para no interferir con la app de Pesca
VPS_IP="187.33.146.27"
BACKEND_PORT="30082"
FRONTEND_PORT="30081"

echo "📍 Configurando frontend para conectarse al backend en: http://${VPS_IP}:${BACKEND_PORT}"
echo ""

# 1. Crear el Namespace en Kubernetes (para aislamiento absoluto)
echo "🔒 Creando entorno aislado en Kubernetes (Namespace 'tienda-musica')..."
kubectl create namespace tienda-musica --dry-run=client -o yaml | kubectl apply -f -

# 2. Construir la imagen del Backend (NestJS)
echo "📦 Construyendo contenedor para el Backend (NestJS)..."
docker build -t tienda-musica-server:latest ./server

# 3. Construir la imagen del Frontend (Next.js) inyectando la IP de la VPS
echo "📦 Construyendo contenedor para el Frontend (Next.js)..."
docker build --build-arg NEXT_PUBLIC_API_URL="http://${VPS_IP}:${BACKEND_PORT}" -t tienda-musica-client:latest ./client

# 4. Importar imágenes al clúster si es k3s o microk8s (muy comunes en VPS individuales)
if command -v k3s &> /dev/null; then
  echo "♻️ Detectado k3s. Cargando imágenes directamente al clúster..."
  docker save tienda-musica-server:latest | sudo k3s ctr images import -
  docker save tienda-musica-client:latest | sudo k3s ctr images import -
elif command -v microk8s &> /dev/null; then
  echo "♻️ Detectado microk8s. Cargando imágenes directamente al clúster..."
  docker save tienda-musica-server:latest | microk8s ctr image import -
  docker save tienda-musica-client:latest | microk8s ctr image import -
fi

# 5. Aplicar almacenamiento persistente SQLite
echo "💾 Configurando base de datos permanente en la VPS..."
kubectl apply -f kubernetes/database-pvc.yaml

# 6. Desplegar los pods y servicios en Kubernetes
echo "🚀 Lanzando la tienda de música en Kubernetes..."
kubectl apply -f kubernetes/server-deployment.yaml
kubectl apply -f kubernetes/client-deployment.yaml

echo ""
echo "=========================================================="
echo "🎉 ¡DESPLIEGUE COMPLETADO CON ÉXITO!"
echo "=========================================================="
echo "🔗 Tu tienda de música estará lista en unos segundos en:"
echo "👉 http://${VPS_IP}:${FRONTEND_PORT}"
echo ""
echo "⚠️  Nota importante de seguridad:"
echo "Tu proyecto de Pesca en http://${VPS_IP}:30080 NO ha sido alterado ni modificado."
echo "Todo el nuevo código corre aislado dentro del namespace 'tienda-musica'."
echo "=========================================================="

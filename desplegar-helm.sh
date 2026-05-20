#!/bin/bash
# Script de despliegue con Helm para TiendaMusica

set -e

VPS_IP="187.33.146.27"
BACKEND_PORT="30082"
FRONTEND_PORT="30081"

echo "[Deploy-Helm] Creando el namespace tienda-musica si no existe..."
kubectl create namespace tienda-musica --dry-run=client -o yaml | kubectl apply -f -

echo "[Deploy-Helm] Construyendo imagen de Docker para el Servidor..."
docker build -t tienda-musica-server:latest ./server

echo "[Deploy-Helm] Construyendo imagen de Docker para el Cliente..."
docker build --build-arg NEXT_PUBLIC_API_URL="http://${VPS_IP}:${BACKEND_PORT}" -t tienda-musica-client:latest ./client

if command -v k3s &> /dev/null; then
  echo "[Deploy-Helm] Importando imágenes de Docker a k3s..."
  docker save tienda-musica-server:latest | sudo k3s ctr images import -
  docker save tienda-musica-client:latest | sudo k3s ctr images import -
elif command -v microk8s &> /dev/null; then
  echo "[Deploy-Helm] Importando imágenes de Docker a microk8s..."
  docker save tienda-musica-server:latest | microk8s ctr image import -
  docker save tienda-musica-client:latest | microk8s ctr image import -
fi

echo "[Deploy-Helm] Desplegando el Chart de Helm..."
helm upgrade --install tienda-musica ./helm/tienda-musica \
  --namespace tienda-musica \
  --set global.vpsIp="${VPS_IP}" \
  --set server.service.nodePort="${BACKEND_PORT}" \
  --set client.service.nodePort="${FRONTEND_PORT}"

echo "[Deploy-Helm] ¡Todo listo! Aplicación desplegada mediante Helm."
echo "[Deploy-Helm] Backend expuesto en puerto: ${BACKEND_PORT}"
echo "[Deploy-Helm] Frontend expuesto en puerto: ${FRONTEND_PORT}"

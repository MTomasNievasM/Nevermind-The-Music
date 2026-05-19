#!/bin/bash
# Deploy script for TiendaMusica

set -e

VPS_IP="187.33.146.27"
BACKEND_PORT="30082"
FRONTEND_PORT="30081"

echo "[Deploy] Setting up namespace..."
kubectl create namespace tienda-musica --dry-run=client -o yaml | kubectl apply -f -

echo "[Deploy] Building server image..."
docker build -t tienda-musica-server:latest ./server

echo "[Deploy] Building client image..."
docker build --build-arg NEXT_PUBLIC_API_URL="http://${VPS_IP}:${BACKEND_PORT}" -t tienda-musica-client:latest ./client

if command -v k3s &> /dev/null; then
  echo "[Deploy] Importing images to k3s..."
  docker save tienda-musica-server:latest | sudo k3s ctr images import -
  docker save tienda-musica-client:latest | sudo k3s ctr images import -
elif command -v microk8s &> /dev/null; then
  echo "[Deploy] Importing images to microk8s..."
  docker save tienda-musica-server:latest | microk8s ctr image import -
  docker save tienda-musica-client:latest | microk8s ctr image import -
fi

echo "[Deploy] Applying Kubernetes manifests..."
kubectl apply -f kubernetes/database-pvc.yaml
kubectl apply -f kubernetes/server-deployment.yaml
kubectl apply -f kubernetes/client-deployment.yaml
kubectl apply -f kubernetes/ingress.yaml

echo "[Deploy] Done. Service running on port ${FRONTEND_PORT}."

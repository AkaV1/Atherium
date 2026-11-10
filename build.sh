#!/bin/bash
# Compila la ISO de Atherium. Debe ejecutarse como root en Debian/Ubuntu
# (o dentro de un contenedor debian:trixie con --privileged).
set -euo pipefail

cd "$(dirname "$0")"

if [ "$(id -u)" -ne 0 ]; then
    echo "Ejecuta como root: sudo ./build.sh" >&2
    exit 1
fi

echo "==> Instalando dependencias de compilacion"
apt-get update
apt-get install -y --no-install-recommends \
    live-build debootstrap squashfs-tools xorriso \
    grub-pc-bin grub-efi-amd64-bin grub-efi-amd64-signed shim-signed \
    mtools dosfstools syslinux syslinux-common isolinux \
    ca-certificates curl git

echo "==> Limpiando compilaciones previas"
lb clean --purge || true

echo "==> Configurando"
chmod +x auto/config
lb config

echo "==> Compilando (tarda 20-60 min segun tu conexion y CPU)"
lb build 2>&1 | tee build.log

ISO="$(ls -1 ./*.iso 2>/dev/null | head -n1 || true)"
if [ -z "$ISO" ]; then
    echo "No se genero ninguna ISO. Revisa build.log" >&2
    exit 1
fi

NEW="atherium-$(date +%Y.%m.%d)-amd64.iso"
mv "$ISO" "$NEW"
sha256sum "$NEW" > "$NEW.sha256"

echo "==> Listo: $NEW"

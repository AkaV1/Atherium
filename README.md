# Atherium

Sistema operativo basado en **Debian 13 (trixie)** con escritorio **XFCE** moderno y semitransparente, dock inferior (Plank) y logo ASCII propio en `neofetch`.

## Características

- XFCE con tema oscuro Materia + iconos Papirus-Dark
- Transparencias, blur y esquinas redondeadas con **picom**
- Dock **Plank** centrado en la parte inferior (zoom al pasar el cursor)
- Panel superior semitransparente
- Terminal translúcida con paleta galáctica
- `neofetch` muestra el logo de Atherium en ASCII (`/etc/atherium/logo.ascii`)
- Identidad propia: `/etc/os-release` -> `Atherium`
- Instalador de Debian (modo live) incluido en el menú de arranque

## Compilar la ISO

### Opción A: GitHub Actions (recomendada)

1. Sube el contenido de esta carpeta a la raíz del repositorio `galaxiumos`.
2. Ve a **Actions -> Build Atherium ISO -> Run workflow**.
3. Al terminar, descarga la ISO desde **Artifacts**. Si creas un tag (`git tag v1.0 && git push --tags`) se publica en **Releases**.

### Opción B: en tu equipo (Debian/Ubuntu)

```bash
sudo ./build.sh
```

Genera `atherium-AAAA.MM.DD-amd64.iso` y su `.sha256`. Se necesitan ~15 GB libres y conexión a internet.

## Probar

```bash
qemu-system-x86_64 -m 4G -enable-kvm -cdrom atherium-*.iso -boot d
```

Usuario live: `atherium` / contraseña: `live`.

## Personalizar

| Qué | Dónde |
|---|---|
| Paquetes | `config/package-lists/atherium.list.chroot` |
| Logo ASCII | `config/includes.chroot/etc/atherium/logo.ascii` |
| Fondo de pantalla | `config/includes.chroot/usr/share/backgrounds/atherium/wallpaper.png` |
| Transparencias | `config/includes.chroot/etc/skel/.config/picom/picom.conf` |
| Dock | `config/includes.chroot/etc/dconf/db/local.d/00-atherium` |
| Branding / os-release | `config/hooks/live/0100-atherium-branding.hook.chroot` |

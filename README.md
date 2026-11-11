# Atherium

Sistema operativo basado en **Ubuntu 24.04 LTS (noble)** con escritorio **GNOME** estilo macOS, dock inferior transparente y el logo de Atherium como icono de inicio.

## Características

- Base Ubuntu 24.04 con GNOME y GDM
- Estética tipo macOS: tema, iconos y cursores **WhiteSur**, fuente Inter (con Yaru como respaldo)
- Dock inferior transparente; el botón de aplicaciones es el logo de Atherium
- Terminal translúcida con la paleta de Atherium
- `neofetch` muestra el logo de Atherium en ASCII (`/etc/atherium/logo.ascii`)
- LibreOffice completo en español (Writer, Calc, Impress, Draw, Math, Base)
- Firefox (PPA de Mozilla, sin snap) con Epiphany como respaldo
- Instalador Calamares en el dock
- Identidad propia: `/etc/os-release` -> `Atherium`

## Compilar la ISO

### Opción A: GitHub Actions (recomendada)

1. **Actions -> Build Atherium ISO -> Run workflow**.
2. Al terminar, descarga la ISO desde **Artifacts**. Con un tag (`git tag v1.0 && git push --tags`) se publica en **Releases**.

### Opción B: en tu equipo (Debian/Ubuntu)

```bash
sudo ./build.sh
```

## Probar

```bash
qemu-system-x86_64 -m 4G -enable-kvm -cdrom atherium-*.iso -boot d
```

Usuario live: `atherium` (sin contraseña en la sesión live).

## Personalizar

| Qué | Dónde |
|---|---|
| Paquetes | `config/package-lists/atherium.list.chroot` |
| Ajustes de GNOME y dock | `config/includes.chroot/etc/dconf/db/local.d/00-atherium` |
| Logo de inicio (SVG simbólico) | `config/includes.chroot/usr/share/atherium/start-symbolic.svg` |
| Logo ASCII | `config/includes.chroot/etc/atherium/logo.ascii` |
| Fondo de pantalla | `config/includes.chroot/usr/share/backgrounds/atherium/wallpaper.png` |
| Branding, temas, Firefox | `config/hooks/live/0100-atherium-branding.hook.chroot` |

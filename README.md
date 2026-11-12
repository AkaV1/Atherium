# Atherium

Sistema operativo basado en **Ubuntu 24.04 LTS (noble)** con **GNOME**, estilo **Material You**, barra tipo **Windows 11** y el logo de Atherium como botón de inicio.

## Características

- **Menos Ubuntu:** sin ubuntu-session, Yaru, snap, apport, Pro ni anuncios del MOTD
- **Material You:** tema GTK/Shell Colloid (morado oscuro), fuente Roboto, cursor Bibata
- **Iconos tipo Android:** Tela-circle (iconos circulares de colores)
- **Barra tipo Windows 11:** Dash to Panel con iconos centrados y botón de inicio con tu logo (ArcMenu, menú estilo Windows 11, si está disponible)
- **Ventanas translúcidas** con botones ▲ minimizar, ▼ maximizar, ◆ cerrar (GTK3 y GTK4) y desenfoque con Blur my Shell
- **Pantalla de inicio de sesión y splash de arranque** propios
- **Optimizado:** zram con zstd, ajustes de sysctl, squashfs zstd, servicios innecesarios desactivados
- LibreOffice completo en español, Firefox sin snap, instalador Calamares
- `neofetch` con el logo de Atherium; `/etc/os-release` -> `Atherium`

## Usuario de la sesión live

Usuario `usuario1` (se muestra como **Usuario 1**), contraseña `live`. Entra solo y `sudo` no pide contraseña.

## Compilar la ISO

1. **Actions -> Build Atherium ISO -> Run workflow**.
2. Al terminar, descarga la ISO desde **Artifacts**. Con un tag (`git tag v1.0 && git push --tags`) se publica en **Releases**.

También: `sudo ./build.sh` en Debian/Ubuntu.

## Probar

```bash
qemu-system-x86_64 -m 4G -enable-kvm -cdrom atherium-*.iso -boot d
```

## Personalizar

| Qué | Dónde |
|---|---|
| Paquetes | `config/package-lists/atherium.list.chroot` |
| Ajustes de GNOME | `config/includes.chroot/etc/dconf/db/local.d/00-atherium` |
| Temas, barra, GDM, Plymouth | `config/hooks/live/0100-atherium-branding.hook.chroot` |
| Ventanas translúcidas (GTK4 / GTK3) | `.../usr/share/atherium/gtk4-overrides.css`, `.../etc/skel/.config/gtk-3.0/gtk.css` |
| Icono de inicio | `.../usr/share/atherium/start-icon.png` |
| Usuario live | `.../etc/live/config.conf.d/atherium.conf` |
| Fondos | `.../usr/share/backgrounds/atherium/` |

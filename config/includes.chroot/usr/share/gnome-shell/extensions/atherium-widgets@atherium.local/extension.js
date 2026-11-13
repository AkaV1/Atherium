import St from 'gi://St';
import GLib from 'gi://GLib';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const WIDTH = 330;
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function readText(path) {
    try {
        const [ok, bytes] = GLib.file_get_contents(path);
        return ok ? new TextDecoder().decode(bytes) : '';
    } catch (e) {
        return '';
    }
}

export default class AtheriumWidgets extends Extension {
    enable() {
        this._prev = null;
        this._card = new St.BoxLayout({
            vertical: true,
            reactive: false,
            width: WIDTH,
            style: 'background-color: rgba(29,27,32,0.55); border-radius: 28px; padding: 22px 28px; spacing: 6px;',
        });
        this._time = new St.Label({style: 'font-size: 64px; font-weight: 300; color: #e6e0e9;'});
        this._date = new St.Label({style: 'font-size: 15px; color: #d0bcff; margin-bottom: 12px;'});
        this._card.add_child(this._time);
        this._card.add_child(this._date);
        this._cpu = this._addMeter('Procesador', '#d0bcff');
        this._ram = this._addMeter('Memoria', '#efb8c8');
        Main.layoutManager._backgroundGroup.add_child(this._card);
        this._place();
        this._monId = Main.layoutManager.connect('monitors-changed', () => this._place());
        this._tick();
        this._timer = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 1, () => {
            this._tick();
            return GLib.SOURCE_CONTINUE;
        });
    }

    disable() {
        if (this._timer) GLib.source_remove(this._timer);
        this._timer = null;
        if (this._monId) Main.layoutManager.disconnect(this._monId);
        this._monId = null;
        this._card?.destroy();
        this._card = null;
    }

    _addMeter(title, color) {
        const row = new St.BoxLayout({vertical: true, style: 'spacing: 4px; margin-top: 6px;'});
        const label = new St.Label({text: title, style: 'font-size: 13px; color: #cac4d0;'});
        const track = new St.Widget({style: 'background-color: rgba(255,255,255,0.12); border-radius: 4px; height: 8px;'});
        const fill = new St.Widget({style: `background-color: ${color}; border-radius: 4px; height: 8px;`});
        fill.set_position(0, 0);
        fill.set_size(0, 8);
        track.add_child(fill);
        row.add_child(label);
        row.add_child(track);
        this._card.add_child(row);
        return {label, fill, title, track};
    }

    _setMeter(m, pct) {
        pct = Math.max(0, Math.min(100, pct));
        m.label.set_text(`${m.title}  ${Math.round(pct)} %`);
        m.fill.set_width(Math.round((WIDTH - 56) * pct / 100));
    }

    _place() {
        const mon = Main.layoutManager.primaryMonitor;
        if (!mon || !this._card) return;
        this._card.set_position(mon.x + mon.width - WIDTH - 48, mon.y + 64);
    }

    _tick() {
        const now = GLib.DateTime.new_now_local();
        this._time.set_text(now.format('%H:%M'));
        const d = now.get_day_of_week() % 7;
        this._date.set_text(`${DAYS[d]}, ${now.get_day_of_month()} de ${MONTHS[now.get_month() - 1]}`);

        const f = readText('/proc/stat').split('\n')[0].split(/\s+/).slice(1).map(Number);
        if (f.length > 4) {
            const idle = f[3] + (f[4] || 0);
            const total = f.reduce((a, b) => a + b, 0);
            if (this._prev) {
                const dt = total - this._prev.total;
                if (dt > 0) this._setMeter(this._cpu, 100 * (1 - (idle - this._prev.idle) / dt));
            }
            this._prev = {idle, total};
        }
        const mi = readText('/proc/meminfo');
        const tot = Number((mi.match(/MemTotal:\s+(\d+)/) || [])[1]);
        const av = Number((mi.match(/MemAvailable:\s+(\d+)/) || [])[1]);
        if (tot) this._setMeter(this._ram, 100 * (1 - av / tot));
    }
}

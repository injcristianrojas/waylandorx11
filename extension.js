'use strict';

const { Clutter, GLib, Gio, Meta, St, GObject } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const ERROR = 'error';

let WaylandOrX11 = GObject.registerClass(
    class WaylandOrX11 extends PanelMenu.Button {

        _init() {
            super._init(0, 'WaylandOrX11', false);
            this._icon = new St.Icon({
                style_class: 'system-status-icon',
            });
            this.add_actor(this._icon);
            this.state = ERROR;
            this.enable();
        }

        setWindowSystemIcon() {
            this.state = Meta.is_wayland_compositor() ? 'wayland' : 'x11';
            this._icon.gicon = Gio.icon_new_for_string(`${Me.path}/icons/${this.state}.svg`);            
        }

        enable() {
            this.setWindowSystemIcon();
        }

        disable() {
            // Intentional
        }

        log_this(string) {
            log(`[${Me.metadata.name} v${Me.metadata.version}] ${string}`);
        }
    }
);

let waylandorx11;

function init() {
    // Intentional
}

function enable() {
    waylandorx11 = new WaylandOrX11();
    Main.panel._addToPanelBox('waylandorx11', waylandorx11, 0, Main.panel._rightBox);
}

function disable() {
    waylandorx11.disable();
    waylandorx11.destroy();
    waylandorx11 = null;
}
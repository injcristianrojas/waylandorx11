'use strict';

const Clutter = imports.gi.Clutter;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const ExtensionUtils = imports.misc.extensionUtils;
const GObject = imports.gi.GObject;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const St = imports.gi.St;

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

        checkWindowSystem() {
            let command_array = ['printenv', 'XDG_SESSION_TYPE'];
            let [, out] = GLib.spawn_sync(null, command_array, null, GLib.SpawnFlags.SEARCH_PATH, null);
            if (out == null) {
                this.log_this("Error executing " + command_array.join(' '));
            }
            else {
                this.state = out.toString().slice(0, -1);
                this._icon.gicon = Gio.icon_new_for_string(`${Me.path}/icons/${this.state}.svg`);
            }
            
        }

        enable() {
            this.checkWindowSystem();
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
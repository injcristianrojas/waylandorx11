'use strict';

const Clutter = imports.gi.Clutter;
const GLib = imports.gi.GLib;
const ExtensionUtils = imports.misc.extensionUtils;
const GObject = imports.gi.GObject;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const St = imports.gi.St;

const ERROR = 'ERROR';

let WaylandOrX11 = GObject.registerClass(
    class WaylandOrX11 extends PanelMenu.Button {

        _init() {
            super._init(0, 'WaylandOrX11', false);

            // Label
            this.timeText = new St.Label({
                y_align: Clutter.ActorAlign.CENTER
            });

            let topBox = new St.BoxLayout();
            topBox.add_actor(this.timeText);
            this.add_actor(topBox);

            this.state = ERROR;

            this.enable();
        }

        checkWindowSystem() {
            let command_array = ['printenv', 'XDG_SESSION_TYPE'];
            let [, out] = GLib.spawn_sync(null, command_array, null, GLib.SpawnFlags.SEARCH_PATH, null);
            // TODO switch to icons: https://github.com/win0err/gnome-runcat/blob/master/src/iconProvider.js

            if (out == null) {
                this.log_this("Error executing " + command_array.join(' '));
            }
            else {
                this.state = out.toString().slice(0, -1);
            }
            
        }


        enable() {
            this.checkWindowSystem();
            this.timeText.set_text(this.state);
            this.log_this('Enabled. Window system: ' + this.state);
        }

        disable() {
            this.log_this('Disabled.');
        }

        log_this(string) {
            log(`[${Me.metadata.name}-${Me.metadata.version}] ${string}`);
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
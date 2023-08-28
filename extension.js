'use strict';

import Gio from 'gi://Gio';
import Meta from 'gi://Meta';
import St from 'gi://St';
import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const ERROR = 'error';
let waylandorx11;
export let extPath;
export let metadata;

const WaylandOrX11 = GObject.registerClass(
    class WaylandOrX11 extends PanelMenu.Button {

        _init() {
            super._init(0, 'WaylandOrX11', false);
            this._icon = new St.Icon({
                style_class: 'system-status-icon windower-icon',
            });
            this.add_actor(this._icon);
            this.set_track_hover(false);
            this.state = ERROR;
            this.enable();
        }

        setWindowSystemIcon() {
            this.state = Meta.is_wayland_compositor() ? 'wayland' : 'x11';
            this._icon.gicon = Gio.icon_new_for_string(`${extPath}/icons/${this.state}.svg`);
        }

        enable() {
            this.setWindowSystemIcon();
        }

        disable() {
            // Intentional
        }

        log_this(string) {
            console.log(`[${metadata.name} - v${metadata.version}] ${string}`);
        }
    }
);

export default class WaylandOrX11Extension extends Extension {

    enable() {
        extPath = this.path;
        metadata = this.metadata;
        waylandorx11 = new WaylandOrX11();
        Main.panel._addToPanelBox('waylandorx11', waylandorx11, 0, Main.panel._rightBox);
    }

    disable() {
        waylandorx11.disable();
        waylandorx11.destroy();
        waylandorx11 = null;
    }

}


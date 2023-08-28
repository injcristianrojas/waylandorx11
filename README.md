# Am I using Wayland or X11?

## Intro: The use case

Fedora 36 was launched on may 2022. It included full Wayland support. But some
meeting applications (Teams, Google Meet...) do not fully support Wayland. In
those applications, the camera works, but screen sharing doesn't. So I need to
switch my desktop between X11 and Wayland, and I wanted a quick and visual way
to see if my desktop is currently using X11 or Wayland.

So, I made this extension. It's very simple, it just shows an icon depending
on which of the window managers you are using.

X11:

![X11](img/x.png)

Wayland:

![X11](img/wayland.png)

## Install

### Automatic

Go to https://extensions.gnome.org/extension/5149/wayland-or-x11/ and turn on
the extension.

### Manual

Issue the following commands:

```
git clone https://github.com/injcristianrojas/waylandorx11.git
cd waylandorx11
make install
```

Restart GNOME and you should see the corresponding window manager icon.

## Support

This extension works on GNOME versions 45 and up. If you need legacy
support (GNOME versions 40-44), switch to the `gnome_40_44` branch.

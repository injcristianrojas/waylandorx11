# Am I using Wayland or X11?

## Intro: The use case

Fedora 36 was launched on may 2022. It included full Wayland support. But some
meeting applications (Zoom, Google Meet...) do not fully support Wayland. In
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

GNOME Extensions URL will be announced soon.

### Manual

Issue the following commands:

```
git clone https://github.com/injcristianrojas/waylandorx11.git
cd waylandorx11
make install
```

Restart GNOME and you should see the corresponding window manager icon.

## Support

This extension works on GNOME versions 40 and up.
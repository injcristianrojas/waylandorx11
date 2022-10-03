all: clean build

PLUGIN_LOCATION = ~/.local/share/gnome-shell/extensions/waylandorx11@injcristianrojas.github.com

build:
	zip waylandorx11.zip extension.js LICENSE metadata.json stylesheet.css icons/*

install:
	mkdir -p $(PLUGIN_LOCATION)
	cp -R extension.js LICENSE metadata.json stylesheet.css icons/ $(PLUGIN_LOCATION)
	echo 'Plugin installed. Restart GNOME Shell.'

uninstall:
	rm -rf $(PLUGIN_LOCATION)

reinstall: uninstall install

clean:
	rm -f *.zip
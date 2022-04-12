config:
	sudo cp /etc/lighttpd/lighttpd.conf
	sudo cp -r images/ index.html style.css script.js /srv/http/

all:
	sudo systemctl enable lighttpd
	sudo systemctl start lighttpd

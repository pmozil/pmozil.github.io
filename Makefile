config:
	sudo cp /etc/lighttpd/lighttpd.conf
	sudo cp -r public/* /srv/http/

all:
	sudo systemctl enable lighttpd
	sudo systemctl start lighttpd

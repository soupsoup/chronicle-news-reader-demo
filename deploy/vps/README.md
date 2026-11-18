# chronicle-reader.antderosa.com on the VPS

`next build` with `output: "standalone"` makes a self-contained server. Each deploy builds a release in `.releases/<sha>`; `chronicle-reader.service` runs it on 127.0.0.1 and nginx serves `/_next/static` itself. Builds on the server take turns (a shared lock), so two demos never build at once.

## Install (once, as root)

1. DNS: add an A record for `chronicle-reader` → 177.7.44.106 (antderosa.com DNS).
2. Clone and install:

```bash
git clone https://github.com/soupsoup/chronicle-news-reader-demo /var/www/chronicle-reader
/var/www/chronicle-reader/deploy/vps/install.sh
```


3. First deploy, then HTTPS:

```bash
systemctl start chronicle-reader-deploy && systemctl enable --now chronicle-reader-deploy.timer
journalctl -u chronicle-reader-deploy -n 20 --no-pager
systemctl status chronicle-reader --no-pager | head -5
certbot --nginx -d chronicle-reader.antderosa.com
```

After that, every push to main deploys within a minute. Roll back with
`sudo -u chronicle-reader /var/www/chronicle-reader/deploy/vps/deploy.sh --rollback <sha>`.

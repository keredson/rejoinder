# Developer Readme

If you just want to preview this extension before it's published on the Chrome Web Store, just follow "Install Extension Locally".

## Install Extension Locally

- Clone this repo.
- Go to `chrome://extensions`
- Toggle "Developer mode"
- Click "Load unpacked"
- Select the `rejoinder/chrome_ext` directory
- Go to (or reload) your meeting.

## Run Server Locally

You can run the server locally for testing.  Ex:
```bash
$ python rejoinder.py --ssl-cert ~/rejoinder.fullchain.pem --ssl-private-key ~/rejoinder.privkey.pem
```
If you leave out the SSL params, it will run in unencrypted mode (`ws://`).

**Note:** Change `ws_server_base` in `meet.js` if you want your local extension to talk to your local server.




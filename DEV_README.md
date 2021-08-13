# Developer Readme

If you just want to preview this extension before it's published on the Chrome Web Store, just follow "Install Extension Locally".

## Install Extension Locally

- Clone this repo (or [download a copy](https://github.com/keredson/rejoinder/archive/refs/heads/main.zip) and unzip).
- Go to `chrome://extensions` in Google Chrome.
- Toggle "Developer mode" (upper right corner)
- Click the "Load unpacked" button (top left)
- Select the `rejoinder/chrome_ext` directory in the file chooser.
- Go to (or reload) your meeting.

## Run Server Locally

You can run the server locally for testing.  Ex:
```bash
$ python rejoinder.py --ssl-cert ~/rejoinder.fullchain.pem --ssl-private-key ~/rejoinder.privkey.pem
```
If you leave out the SSL params, it will run in unencrypted mode (`ws://`).

**Note:** Change `ws_server_base` in `meet.js` if you want your local extension to talk to your local server.

## Server Performance

On my MacBook Pro (16-inch, 2019):
- 2.3 GHz 8-Core Intel Core i9
- 16 GB 2667 MHz DDR4

I'm getting about 37k messages/second with about 1000 concurrent clients.

```
~/rejoinder/server % python stress_test.py 1000 100
made 1000 connections in 0.8760318756103516 seconds
sent and recved 100000 messages in 5.300304889678955 seconds
```

Biggest limit seems to be open files.  (Tested w/ `ulimit -n 10240`.)


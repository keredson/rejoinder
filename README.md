# Rejoinder
Google Meet emoji tool, similar to Google's internal "MeetMoji" extension.

> **re·join·der**: noun; */rəˈjoindər/*<br/>
> a reply, especially a sharp or witty one.

## Install Locally (Dev)

- Clone this repo.
- Go to `chrome://extensions`
- Toggle "Developer mode"
- Click "Load unpacked"
- Select the `rejoinder/chrome_ext` directory
- Go to (or reload) your meeting.

## Run Server

You can run the server locally for testing.  Ex:
```bash
$ python rejoinder.py --ssl-cert ~/rejoinder.fullchain.pem --ssl-private-key ~/rejoinder.privkey.pem
```

If you leave out the SSL params, it will run in unencrypted mode (`ws://`).

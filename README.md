# Rejoinder
Google Meet emoji tool, similar to Google's internal "MeetMoji" extension.

> **re·join·der**: noun; */rəˈjoindər/*<br/>
> a reply, especially a sharp or witty one.

## Run Server

You can run the server locally for testing.  Ex:
```bash
$ python rejoinder.py --ssl-cert ~/rejoinder.fullchain.pem --ssl-private-key ~/rejoinder.privkey.pem
```

If you leave out the SSL params, it will run in unencrypted mode (`ws://`).

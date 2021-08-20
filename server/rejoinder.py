import asyncio
import collections
import json
import websockets
import darp
import ssl
import threading
import time


DEAD_MEETING_TIMEOUT_SECONDS = 10*60


class Meeting:

  def __init__(self, meeting_id) -> None:
      self.meeting_id = meeting_id
      self.users = set()
      self.touch()
  
  def touch(self):
      self.last_used = time.time()

  def add(self, user):
    self.touch()
    self.users.add(user)
    self.send_user_count()

  def send_user_count(self):
    asyncio.ensure_future(self._send(json.dumps({'user_count':len(self.users)}), users=[u for u in self.users if u.version]))

  def __len__(self):
    return len(self.users)

  async def send(self, frm, s):
    if len(s) not in (1,2): return # not a valid msg
    self.touch()
    msg = json.dumps({
      'name': frm.name,
      'img_src': frm.img_src,
      'm': s,
    })
    print(frm.name, 'sending', s, 'to', len(self.users), 'in', self.meeting_id)
    self._send(msg)

  async def _send(self, msg, users=None):
    if users is None:
      users = list(self.users)
    exceptions = await asyncio.gather(*[user.ws.send(msg) for user in users] + [asyncio.sleep(.1)], return_exceptions=True) # sleep is to rate limit users
    indices_of_dead_users = [i for i, e in enumerate(exceptions) if e]
    for i in indices_of_dead_users:
      self.left(users[i])
  
  def left(self, user):
    print(user.name, 'left', self.meeting_id)
    self.users.discard(user)
    self.send_user_count()


class User:

  def __init__(self, ws, name, img_src, version) -> None:
      self.name = name
      self.img_src = img_src
      self.ws = ws
      self.version = version


class keydefaultdict(collections.defaultdict):
  def __missing__(self, key):
    ret = self[key] = self.default_factory(key)
    return ret


meetings = keydefaultdict(Meeting)


async def hello(websocket, path):
  if not path.startswith('/ws/'): return
  meeting_id = path[4:].split('?')[0]
  user_data = json.loads(await websocket.recv())
  user = User(websocket, user_data['name'], user_data['img_src'], user_data.get('version'))
  print(user.name, 'joining', meeting_id, user.version)
  meetings[meeting_id].add(user)
  try:
    while True:
      msg = json.loads(await websocket.recv())
      await meetings[meeting_id].send(user, msg['m'])
  except websockets.exceptions.ConnectionClosedOK:
    meetings[meeting_id].left(user)


def serve(port:int=15842, ssl_cert:str=None, ssl_private_key:str=None):
  '''Pubsub server for Rejoinder'''

  def meeting_destroyer():
    while True:
      now = time.time()
      dead_meetings = [m for m in meetings.values() if not m.users and now - m.last_used > DEAD_MEETING_TIMEOUT_SECONDS]
      if dead_meetings:
        print(len(dead_meetings), 'meeting' if len(dead_meetings)==1 else 'meetings', 'died')
        for meeting in dead_meetings:
          meetings.pop(meeting.meeting_id, None)
      time.sleep(DEAD_MEETING_TIMEOUT_SECONDS)
  t = threading.Thread(target=meeting_destroyer)
  t.daemon = True
  t.start()

  context = None
  if ssl_cert and ssl_private_key:
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(ssl_cert, ssl_private_key)
  elif ssl_cert or ssl_private_key:
    raise Exception('you must set both ssl-cert and ssl-private-key if you specify either')

  print('running rejoinder on', port)
  start_server = websockets.serve(hello, "0.0.0.0", port, ssl=context)
  asyncio.get_event_loop().run_until_complete(start_server)
  asyncio.get_event_loop().run_forever()
  

if __name__=='__main__':
  darp.prep(serve).run()

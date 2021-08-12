import asyncio
import collections
import json
import websockets
import darp
import ssl


meetings = collections.defaultdict(set)

class User:
  def __init__(self, ws, name, img_src) -> None:
      self.name = name
      self.img_src = img_src
      self.ws = ws

async def hello(websocket, path):
  if not path.startswith('/ws/'): return
  meeting_id = path[4:].split('?')[0]
  user_data = json.loads(await websocket.recv())
  user = User(websocket, user_data['name'], user_data['img_src'])
  print('user', user.name, 'joining', meeting_id)
  meetings[meeting_id].add(user)
  while True:
    msg = json.loads(await websocket.recv())
    await send(user, msg['m'], meeting_id)

async def send(frm, s, meeting_id):
  msg = json.dumps({
    'name': frm.name,
    'img_src': frm.img_src,
    'm': s,
  })
  print(frm.name, 'is sending', s, 'to', len(meetings[meeting_id]), 'users in', meeting_id)
  await asyncio.wait([user.ws.send(msg) for user in meetings[meeting_id]] + [asyncio.sleep(.1)]) # sleep is to rate limit users


def serve(port:int=15842, ssl_cert:str=None, ssl_private_key:str=None):
  '''Pubsub server for Rejoinder'''

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

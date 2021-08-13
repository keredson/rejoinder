import asyncio
import json
import time
from typing import Awaitable
import websockets
import darp

def stress_test(clients:int, messages_per_client:int, host:str='localhost', port:int=15842, ssl:bool=False):
  '''Stress test tool for rejoinder server sub/pub.'''
  uri = "%s://%s:%i/ws/xxx-xxxx-xxx" % ('wss' if ssl else 'ws', host, port)

  asyncio.get_event_loop().run_until_complete(doit(uri, clients, messages_per_client))

async def doit(uri, clients, messages_per_client):
  start = time.time()
  wss = await asyncio.gather(*[connect(uri, i) for i in range(clients)])
  end = time.time()
  print('made', len(wss), 'connections in', end-start, 'seconds')

  async def send(ws):
    msg = json.dumps({'m':'👍'})
    for i in range(messages_per_client):
      await ws.send(msg)

  async def recv(ws):
    c = 0
    try:
      while c < messages_per_client:
        c += 1
        await ws.recv()
    except Exception as e:
      print(e)

  start = time.time()
  await asyncio.gather(*[recv(ws) for ws in wss] + [send(ws) for ws in wss])
  end = time.time()
  print('sent and recved', clients*messages_per_client, 'messages in', end-start, 'seconds')

async def connect(uri, i):
  ws = await websockets.connect(uri)
  msg = json.dumps({
    'name': 'name%i'%i,
    'img_src': 'http://img_src',
  })
  await ws.send(msg)
  #await ws.send()
  return ws

if __name__=='__main__':
  darp.prep(stress_test).run()

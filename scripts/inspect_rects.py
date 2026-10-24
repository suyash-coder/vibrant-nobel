import asyncio
import websockets
import json
import urllib.request

async def check():
    req = urllib.request.urlopen('http://127.0.0.1:9222/json')
    pages = json.loads(req.read().decode())
    target = next(p for p in pages if 'Happy Birthday' in p.get('title', ''))
    async with websockets.connect(target['webSocketDebuggerUrl']) as ws:
        async def evaluate(expr):
            await ws.send(json.dumps({'id': 100, 'method': 'Runtime.evaluate', 'params': {'expression': expr, 'returnByValue': True}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 100:
                    return msg.get('result', {}).get('result', {}).get('value')

        await evaluate('window.scrollTo(0, 800)')
        res = await evaluate("""(() => {
            const toObj = (r) => r ? ({ top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height }) : null;
            const cakeImg = document.querySelector('img[src="/images/cake.jpg"]');
            const nameEl = document.querySelector('h1');
            const sticky = document.querySelector('div.sticky');
            return {
                scrollY: window.scrollY,
                windowInnerHeight: window.innerHeight,
                stickyRect: toObj(sticky ? sticky.getBoundingClientRect() : null),
                cakeRect: toObj(cakeImg ? cakeImg.getBoundingClientRect() : null),
                nameRect: toObj(nameEl ? nameEl.getBoundingClientRect() : null),
            };
        })()""")
        print("Positions at scroll 800:", res)

asyncio.run(check())

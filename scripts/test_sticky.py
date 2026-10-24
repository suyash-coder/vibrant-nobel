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

        res = await evaluate("""(() => {
            // Remove overflow-x-hidden from body and main
            document.body.classList.remove('overflow-x-hidden');
            document.querySelector('main').classList.remove('overflow-x-hidden');
            
            // Check position: sticky
            const sticky = document.querySelector('div.sticky');
            window.scrollTo(0, 400);
            const rect = sticky.getBoundingClientRect();
            return {
                scrollY: window.scrollY,
                stickyTop: rect.top,
                stickyBottom: rect.bottom,
                stickyHeight: rect.height
            };
        })()""")
        print("After removing overflow-x-hidden, sticky rect at scroll 400:", res)

asyncio.run(check())

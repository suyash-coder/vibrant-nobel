import asyncio
import websockets
import json
import urllib.request

async def test_viewports():
    req = urllib.request.urlopen('http://127.0.0.1:9222/json')
    pages = json.loads(req.read().decode())
    target = next(p for p in pages if 'Happy Birthday' in p.get('title', ''))
    
    viewports = [
        ('Mobile 360x800', 360, 800),
        ('Mobile 390x844', 390, 844),
        ('Mobile 430x932', 430, 932),
        ('Desktop 1440x900', 1440, 900)
    ]

    async with websockets.connect(target['webSocketDebuggerUrl']) as ws:
        msg_id = 2000
        async def evaluate(expr):
            nonlocal msg_id
            msg_id += 1
            await ws.send(json.dumps({'id': msg_id, 'method': 'Runtime.evaluate', 'params': {'expression': expr, 'returnByValue': True}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == msg_id:
                    return msg.get('result', {}).get('result', {}).get('value')

        for name, w, h in viewports:
            msg_id += 1
            await ws.send(json.dumps({
                'id': msg_id,
                'method': 'Emulation.setDeviceMetricsOverride',
                'params': {'width': w, 'height': h, 'deviceScaleFactor': 1, 'mobile': w < 1000}
            }))
            await ws.recv()
            await asyncio.sleep(0.3)

            overflow_check = await evaluate('''(() => {
                const docWidth = document.documentElement.scrollWidth;
                const winWidth = window.innerWidth;
                const bodyWidth = document.body.scrollWidth;
                return {
                    docWidth,
                    winWidth,
                    hasOverflow: docWidth > winWidth
                };
            })()''')

            print(f"Viewport [{name}]: winWidth={w}, docWidth={overflow_check['docWidth']}, hasOverflow={overflow_check['hasOverflow']}")
            assert not overflow_check['hasOverflow'], f"Horizontal overflow detected on {name}!"

        print("ALL VIEWPORT SIZES VERIFIED WITHOUT OVERFLOW!")

asyncio.run(test_viewports())

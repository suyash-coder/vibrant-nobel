import asyncio
import websockets
import json
import urllib.request
import base64

async def test_and_capture():
    req = urllib.request.urlopen('http://127.0.0.1:9222/json')
    pages = json.loads(req.read().decode())
    target = next(p for p in pages if 'Happy Birthday' in p.get('title', ''))
    
    async with websockets.connect(target['webSocketDebuggerUrl']) as ws:
        msg_id = 9000
        async def evaluate(expr):
            nonlocal msg_id
            msg_id += 1
            await ws.send(json.dumps({'id': msg_id, 'method': 'Runtime.evaluate', 'params': {'expression': expr, 'returnByValue': True}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == msg_id:
                    return msg.get('result', {}).get('result', {}).get('value')

        async def capture(filename):
            nonlocal msg_id
            msg_id += 1
            await ws.send(json.dumps({'id': msg_id, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == msg_id:
                    with open(filename, 'wb') as f:
                        f.write(base64.b64decode(msg['result']['data']))
                    print(f"Captured: {filename}")
                    return

        # Reload cleanly
        await evaluate("window.location.reload()")
        await asyncio.sleep(1.2)

        # Set mobile viewport 390 x 844
        msg_id += 1
        await ws.send(json.dumps({
            'id': msg_id,
            'method': 'Emulation.setDeviceMetricsOverride',
            'params': {'width': 390, 'height': 844, 'deviceScaleFactor': 1, 'mobile': True}
        }))
        await ws.recv()

        # Step 0: Initial view (scroll=0)
        await evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        await capture(r"C:\Users\vbsuy\.gemini\antigravity\brain\eadcd52c-1e4e-4232-900c-1368739ac4c4\view_0_initial.png")

        # Step 1: Midway scroll (scroll=250)
        await evaluate("window.scrollTo(0, 250)")
        await asyncio.sleep(0.4)
        await capture(r"C:\Users\vbsuy\.gemini\antigravity\brain\eadcd52c-1e4e-4232-900c-1368739ac4c4\view_250_emerging.png")

        # Step 2: Full reveal (scroll=500)
        await evaluate("window.scrollTo(0, 500)")
        await asyncio.sleep(0.5)
        await capture(r"C:\Users\vbsuy\.gemini\antigravity\brain\eadcd52c-1e4e-4232-900c-1368739ac4c4\view_500_revealed.png")

        # Check element rects at scroll=500
        rects = await evaluate("""(() => {
            const cake = document.querySelector('img[src="/images/cake.jpg"]');
            const name = document.querySelector('h1');
            const letter = document.querySelector('img[src="/images/letters/h.png"]');
            const toObj = r => r ? ({ top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height) }) : null;
            return {
                scrollY: window.scrollY,
                letter: toObj(letter ? letter.getBoundingClientRect() : null),
                cake: toObj(cake ? cake.getBoundingClientRect() : null),
                name: toObj(name ? name.getBoundingClientRect() : null),
            };
        })()""")
        print("Element rects at scroll 500:", rects)

        # Step 3: Stage 2 Personal Note (scroll=1200)
        await evaluate("window.scrollTo(0, 1200)")
        await asyncio.sleep(0.5)
        await capture(r"C:\Users\vbsuy\.gemini\antigravity\brain\eadcd52c-1e4e-4232-900c-1368739ac4c4\view_1200_note.png")

        # Step 4: Stage 3 Scrapbook (scroll=1800)
        await evaluate("window.scrollTo(0, 1800)")
        await asyncio.sleep(0.5)
        await capture(r"C:\Users\vbsuy\.gemini\antigravity\brain\eadcd52c-1e4e-4232-900c-1368739ac4c4\view_1800_scrapbook.png")

asyncio.run(test_and_capture())

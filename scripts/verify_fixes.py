import asyncio
import websockets
import json
import urllib.request
import base64

async def test_user_fixes():
    req = urllib.request.urlopen('http://127.0.0.1:9222/json')
    pages = json.loads(req.read().decode())
    target = next(p for p in pages if 'Happy Birthday' in p.get('title', ''))
    
    async with websockets.connect(target['webSocketDebuggerUrl']) as ws:
        msg_id = 15000
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

        # 1. Reload page
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

        # Step 0: scroll = 0
        await evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(0.3)
        
        info0 = await evaluate("""(() => {
            const prompt = document.querySelector('span.font-handwriting');
            const cakeImg = document.querySelector('img[src="/images/cake.jpg"]');
            const cakeParent = cakeImg ? cakeImg.parentElement.parentElement : null;
            const letter = document.querySelector('img[src="/images/letters/h.png"]');
            const letterParent = letter ? letter.parentElement : null;
            return {
                scrollY: window.scrollY,
                promptText: prompt ? prompt.textContent.trim() : null,
                cakeDisplay: cakeParent ? cakeParent.style.display : null,
                letterOpacity: letterParent ? window.getComputedStyle(letterParent).opacity : null,
                letterY: letterParent ? letterParent.getBoundingClientRect().top : null
            };
        })()""")
        print("At scroll = 0:", info0)
        await capture(r"C:\Users\vbsuy\.gemini\antigravity\brain\eadcd52c-1e4e-4232-900c-1368739ac4c4\fixed_0.png")

        # Step 1: scroll = 300 (prompt gone, screen shifting, cake starting)
        await evaluate("window.scrollTo(0, 300)")
        await asyncio.sleep(0.4)
        info300 = await evaluate("""(() => {
            const cakeImg = document.querySelector('img[src="/images/cake.jpg"]');
            const cakeParent = cakeImg ? cakeImg.parentElement.parentElement : null;
            const letter = document.querySelector('img[src="/images/letters/h.png"]');
            const letterParent = letter ? letter.parentElement : null;
            return {
                scrollY: window.scrollY,
                cakeOpacity: cakeParent ? cakeParent.style.opacity : null,
                cakeDisplay: cakeParent ? cakeParent.style.display : null,
                letterOpacity: letterParent ? window.getComputedStyle(letterParent).opacity : null
            };
        })()""")
        print("At scroll = 300:", info300)
        await capture(r"C:\Users\vbsuy\.gemini\antigravity\brain\eadcd52c-1e4e-4232-900c-1368739ac4c4\fixed_300.png")

        # Step 2: scroll = 850 (full reveal: cake, balloons dropped, ANUSHREE)
        await evaluate("window.scrollTo(0, 850)")
        await asyncio.sleep(0.5)
        info850 = await evaluate("""(() => {
            const cakeImg = document.querySelector('img[src="/images/cake.jpg"]');
            const cakeParent = cakeImg ? cakeImg.parentElement.parentElement : null;
            const letter = document.querySelector('img[src="/images/letters/h.png"]');
            const letterParent = letter ? letter.parentElement : null;
            const name = document.querySelector('h1');
            return {
                scrollY: window.scrollY,
                cakeOpacity: cakeParent ? cakeParent.style.opacity : null,
                letterOpacity: letterParent ? window.getComputedStyle(letterParent).opacity : null,
                nameText: name ? name.textContent.trim() : null
            };
        })()""")
        print("At scroll = 850:", info850)
        await capture(r"C:\Users\vbsuy\.gemini\antigravity\brain\eadcd52c-1e4e-4232-900c-1368739ac4c4\fixed_850.png")

asyncio.run(test_user_fixes())

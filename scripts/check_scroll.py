import asyncio
import websockets
import json
import urllib.request
import base64

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

        async def capture(filename):
            await ws.send(json.dumps({'id': 200, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get('id') == 200:
                    with open(filename, 'wb') as f:
                        f.write(base64.b64decode(msg['result']['data']))
                    print(f"Captured {filename}")
                    return

        # 1. Reset scroll to 0 instantly
        await evaluate("document.documentElement.scrollTop = 0; window.scrollTo({top: 0, behavior: 'instant'});")
        await asyncio.sleep(0.5)
        st = await evaluate("window.scrollY")
        print(f"Current scrollY: {st}")

        # Check prompt visibility
        info = await evaluate('''(() => {
            const prompt = document.querySelector('span.font-handwriting');
            const cake = document.querySelector('img[src="/images/cake.jpg"]');
            return {
                promptText: prompt ? prompt.textContent : null,
                promptOpacity: prompt ? window.getComputedStyle(prompt.closest('div.pointer-events-none')).opacity : null,
                cakeOpacity: cake ? window.getComputedStyle(cake.closest('div')).opacity : null
            };
        })()''')
        print("At scroll = 0:", info)
        await capture("screen_0_initial.png")

        # 2. Scroll to 400px (midway through opening, cake fades in)
        await evaluate("window.scrollTo({top: 400, behavior: 'instant'});")
        await asyncio.sleep(0.5)
        info400 = await evaluate('''(() => {
            const cake = document.querySelector('img[src="/images/cake.jpg"]');
            return {
                scrollY: window.scrollY,
                cakeOpacity: cake ? window.getComputedStyle(cake.closest('div')).opacity : null
            };
        })()''')
        print("At scroll = 400:", info400)
        await capture("screen_400_cake_emerging.png")

        # 3. Scroll to 800px (full cake, balloons dropped, ANUSHREE name revealed)
        await evaluate("window.scrollTo({top: 800, behavior: 'instant'});")
        await asyncio.sleep(0.5)
        info800 = await evaluate('''(() => {
            const cake = document.querySelector('img[src="/images/cake.jpg"]');
            const name = document.querySelector('h1');
            return {
                scrollY: window.scrollY,
                cakeOpacity: cake ? window.getComputedStyle(cake.closest('div')).opacity : null,
                nameText: name ? name.textContent : null,
                nameOpacity: name ? window.getComputedStyle(name.closest('div')).opacity : null
            };
        })()''')
        print("At scroll = 800:", info800)
        await capture("screen_800_cake_balloons.png")

        # 4. Scroll to Stage 2: Personal Note (~1800px)
        await evaluate("window.scrollTo({top: 1800, behavior: 'instant'});")
        await asyncio.sleep(0.5)
        await capture("screen_1800_personal_note.png")

        # 5. Scroll to Stage 3: Scrapbook (~2800px)
        await evaluate("window.scrollTo({top: 2800, behavior: 'instant'});")
        await asyncio.sleep(0.5)
        await capture("screen_2800_scrapbook.png")

        # 6. Scroll to Footer / Ending (~4000px)
        await evaluate("window.scrollTo({top: 4200, behavior: 'instant'});")
        await asyncio.sleep(0.5)
        await capture("screen_4200_ending.png")

asyncio.run(check())

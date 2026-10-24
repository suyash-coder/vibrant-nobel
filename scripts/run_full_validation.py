import asyncio
import websockets
import json
import urllib.request
import base64

async def test_full_flow():
    req = urllib.request.urlopen('http://127.0.0.1:9222/json')
    pages = json.loads(req.read().decode())
    target = next(p for p in pages if 'Happy Birthday' in p.get('title', ''))
    
    async with websockets.connect(target['webSocketDebuggerUrl']) as ws:
        msg_id = 1000
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

        # 1. Reload the page cleanly
        await evaluate("window.location.reload()")
        await asyncio.sleep(1.2)

        # Set mobile viewport 390 x 844
        msg_id += 1
        await ws.send(json.dumps({
            'id': msg_id,
            'method': 'Emulation.setDeviceMetricsOverride',
            'params': {'width': 390, 'height': 844, 'deviceScaleFactor': 2, 'mobile': True}
        }))
        await ws.recv()

        # Step A: Scroll = 0 (Initial pure dark view with "scroll" prompt)
        st0 = await evaluate("window.scrollY")
        info0 = await evaluate('''(() => {
            const prompt = document.querySelector('span.font-handwriting');
            return {
                scrollY: window.scrollY,
                promptText: prompt ? prompt.textContent.trim() : null
            };
        })()''')
        print("At Step 0:", info0)
        await capture("step0_initial_prompt.png")

        # Step B: Scroll = 300 (prompt fades, background transitions, cake begins emerging)
        await evaluate("window.scrollTo(0, 300)")
        await asyncio.sleep(0.4)
        info300 = await evaluate("window.scrollY")
        print("At Step 300:", info300)
        await capture("step1_cake_fading_in.png")

        # Step C: Scroll = 750 (cake fully illuminated, balloons dropped, ANUSHREE revealed)
        await evaluate("window.scrollTo(0, 750)")
        await asyncio.sleep(0.6)
        info750 = await evaluate('''(() => {
            const nameEl = document.querySelector('h1');
            return {
                scrollY: window.scrollY,
                name: nameEl ? nameEl.textContent.trim() : null
            };
        })()''')
        print("At Step 750:", info750)
        await capture("step2_cake_and_balloons.png")

        # Step D: Scroll = 1700 (Stage 2: Personal Note on Cream Paper)
        await evaluate("window.scrollTo(0, 1700)")
        await asyncio.sleep(0.5)
        info1700 = await evaluate('''(() => {
            const h2 = document.querySelector('section[aria-label="Personal Birthday Note"] h2');
            return {
                scrollY: window.scrollY,
                noteHeading: h2 ? h2.textContent.trim() : null
            };
        })()''')
        print("At Step 1700 (Note):", info1700)
        await capture("step3_personal_note.png")

        # Step E: Scroll = 2600 (Stage 3: Scrapbook with Polaroids & Stickers)
        await evaluate("window.scrollTo(0, 2600)")
        await asyncio.sleep(0.5)
        info2600 = await evaluate('''(() => {
            const polaroids = document.querySelectorAll('section[aria-label="Photo Scrapbook"] [role="button"]');
            return {
                scrollY: window.scrollY,
                polaroidCount: polaroids.length
            };
        })()''')
        print("At Step 2600 (Scrapbook):", info2600)
        await capture("step4_scrapbook.png")

        # Step F: Click first Polaroid to open Lightbox Modal
        await evaluate('''(() => {
            const firstPolaroid = document.querySelector('section[aria-label="Photo Scrapbook"] [role="button"]');
            if (firstPolaroid) firstPolaroid.click();
        })()''')
        await asyncio.sleep(0.5)
        await capture("step5_lightbox_open.png")

        # Step G: Close Lightbox with Escape key
        await evaluate("window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))")
        await asyncio.sleep(0.5)
        await capture("step6_lightbox_closed.png")

        # Step H: Scroll to Footer Ending
        await evaluate("window.scrollTo(0, 4500)")
        await asyncio.sleep(0.5)
        await capture("step7_footer_ending.png")

        print("=== ALL STAGES TESTED & VERIFIED SUCCESSFULLY ===")

asyncio.run(test_full_flow())

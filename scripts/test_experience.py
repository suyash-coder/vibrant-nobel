import asyncio
import json
import urllib.request
import base64
import websockets

async def run_tests():
    # 1. Get WebSocket URL for the page
    req = urllib.request.urlopen('http://127.0.0.1:9222/json')
    pages = json.loads(req.read().decode())
    page_target = next(p for p in pages if 'Happy Birthday' in p.get('title', ''))
    ws_url = page_target['webSocketDebuggerUrl']
    print(f"Connecting to CDP: {ws_url}")

    async with websockets.connect(ws_url) as ws:
        msg_id = 1

        async def send_cmd(method, params=None):
            nonlocal msg_id
            msg_id += 1
            payload = {'id': msg_id, 'method': method, 'params': params or {}}
            await ws.send(json.dumps(payload))
            while True:
                resp = await ws.recv()
                data = json.loads(resp)
                if data.get('id') == msg_id:
                    return data.get('result', {})

        # Enable Page & Runtime
        await send_cmd('Page.enable')
        await send_cmd('Runtime.enable')

        # Set viewport to iPhone 15 Pro / mobile standard: 393 x 852
        await send_cmd('Emulation.setDeviceMetricsOverride', {
            'width': 393,
            'height': 852,
            'deviceScaleFactor': 2,
            'mobile': True,
        })

        # Check document element at 10, 10
        elem = await send_cmd('Runtime.evaluate', {
            'expression': 'document.elementFromPoint(10, 10) ? document.elementFromPoint(10, 10).tagName + "." + document.elementFromPoint(10, 10).className : "null"'
        })
        print("Element at (10, 10):", elem.get('result', {}).get('value'))

        # Check console errors
        eval_errors = await send_cmd('Runtime.evaluate', {
            'expression': 'window.__errors || []'
        })
        print("Window errors:", eval_errors)

        # Take screenshot at scroll = 0 (Initial Opening)
        snap1 = await send_cmd('Page.captureScreenshot', {'format': 'png'})
        with open('stage1_initial.png', 'wb') as f:
            f.write(base64.b64decode(snap1['data']))
        print("Saved stage1_initial.png")

        # Scroll to 40% of viewport to reveal cake & balloons
        await send_cmd('Runtime.evaluate', {'expression': 'window.scrollTo(0, 500)'})
        await asyncio.sleep(1)

        snap2 = await send_cmd('Page.captureScreenshot', {'format': 'png'})
        with open('stage1_cake_balloons.png', 'wb') as f:
            f.write(base64.b64decode(snap2['data']))
        print("Saved stage1_cake_balloons.png")

        # Scroll to Stage 2: Personal Note
        await send_cmd('Runtime.evaluate', {'expression': 'window.scrollTo(0, 1800)'})
        await asyncio.sleep(1)

        snap3 = await send_cmd('Page.captureScreenshot', {'format': 'png'})
        with open('stage2_note.png', 'wb') as f:
            f.write(base64.b64decode(snap3['data']))
        print("Saved stage2_note.png")

        # Scroll to Stage 3: Scrapbook
        await send_cmd('Runtime.evaluate', {'expression': 'window.scrollTo(0, 2600)'})
        await asyncio.sleep(1)

        snap4 = await send_cmd('Page.captureScreenshot', {'format': 'png'})
        with open('stage3_scrapbook.png', 'wb') as f:
            f.write(base64.b64decode(snap4['data']))
        print("Saved stage3_scrapbook.png")

        # Click the first polaroid to test Lightbox
        click_res = await send_cmd('Runtime.evaluate', {
            'expression': '''(() => {
                const polaroid = document.querySelector('[role="button"]');
                if (polaroid) {
                    polaroid.click();
                    return "clicked polaroid";
                }
                return "polaroid not found";
            })()'''
        })
        print("Click polaroid result:", click_res.get('result', {}).get('value'))
        await asyncio.sleep(0.5)

        snap5 = await send_cmd('Page.captureScreenshot', {'format': 'png'})
        with open('stage3_lightbox.png', 'wb') as f:
            f.write(base64.b64decode(snap5['data']))
        print("Saved stage3_lightbox.png")

        # Press Escape to close lightbox
        await send_cmd('Runtime.evaluate', {
            'expression': 'window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))'
        })
        await asyncio.sleep(0.5)

        snap6 = await send_cmd('Page.captureScreenshot', {'format': 'png'})
        with open('stage3_lightbox_closed.png', 'wb') as f:
            f.write(base64.b64decode(snap6['data']))
        print("Saved stage3_lightbox_closed.png")

        print("ALL TESTS COMPLETED SUCCESSFULLY!")

asyncio.run(run_tests())

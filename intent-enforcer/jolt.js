(function() {
    const STORAGE_KEY = "jolt_session_" + window.location.hostname;

    // START
    checkStatusAndRender();

    // PERSISTENCE WATCHER
    let lastUrl = location.href; 
    new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            checkStatusAndRender();
        }
    }).observe(document, {subtree: true, childList: true});

    function checkStatusAndRender() {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
            const session = result[STORAGE_KEY];
            const now = Date.now();

            if (session) {
                if (session.paused) {
                    removeElement("jolt-timer");
                    createPauseScreen(session);
                } else if (session.expiry > now) {
                    // Active Timer
                    removeElement("jolt-root");
                    removeElement("jolt-paused");
                    createFloatingTimer(session);
                } else {
                    // Expired
                    removeElement("jolt-timer");
                    removeElement("jolt-paused");
                    if (!document.getElementById("jolt-root")) createBouncer();
                }
            } else {
                // No Session
                removeElement("jolt-timer");
                removeElement("jolt-paused");
                if (!document.getElementById("jolt-root")) createBouncer();
            }
        });
    }

    function removeElement(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // --- 1. THE BOUNCER (CSS ISOLATED, NO SUBMIT BUTTON) ---
    function createBouncer() {
        if (document.getElementById("jolt-root")) return;

        const overlay = document.createElement("div");
        overlay.id = "jolt-root";
        // FORCE RESET CSS with all: initial
        overlay.style.cssText = `
            all: initial;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: #050505; z-index: 2147483647;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            font-family: sans-serif; color: #fff; box-sizing: border-box;
        `;

        const h2 = document.createElement("h2");
        h2.innerText = "DEFINE YOUR INTENT";
        h2.style.cssText = "all: unset; display: block; color: #fff; margin-bottom: 30px; letter-spacing: 2px; font-weight: 600; font-size: 24px; font-family: sans-serif;";

        const input = document.createElement("input");
        input.placeholder = "Why are you here?";
        input.style.cssText = `
            all: unset;
            background: #1a1a1a; border: 1px solid #333; color: #fff;
            padding: 20px; width: 400px; font-size: 18px; border-radius: 8px;
            text-align: center; margin-bottom: 30px; box-sizing: border-box;
            font-family: sans-serif; display: block;
        `;

        const btnContainer = document.createElement("div");
        btnContainer.style.cssText = "all: unset; display: flex; gap: 10px; margin-bottom: 30px; align-items: stretch; box-sizing: border-box;";

        function createBtn(text, duration, isCustom = false) {
            const b = document.createElement("button");
            b.innerText = text;
            b.style.cssText = `
                all: unset;
                padding: 0 20px; height: 50px; background: #333; color: #fff;
                border: 1px solid #444; cursor: pointer; border-radius: 6px; font-weight: 600;
                display: flex; align-items: center; justify-content: center;
                box-sizing: border-box; font-family: sans-serif; font-size: 14px;
                transition: background 0.2s; min-width: 80px;
            `;

            b.onmouseover = () => b.style.background = "#444";
            b.onmouseout = () => b.style.background = "#333";

            if (isCustom) {
                b.style.border = "1px solid #888"; 
                b.style.background = "#222";
            }

            b.onclick = () => {
                if (isCustom) {
                    if (!input.value.trim()) { input.style.border = "1px solid red"; return; }
                    let mins = prompt("Enter minutes:");
                    if (mins && !isNaN(mins) && mins > 0) {
                        handleStart(parseFloat(mins), input.value);
                    }
                } else {
                    handleStart(duration, input.value);
                }
            };
            return b;
        }

        const btnInf = document.createElement("button");
        btnInf.innerText = "Infinite";
        btnInf.style.cssText = `
            all: initial;
            padding: 0 20px; height: 50px; background: #2a0a0a; color: #ff9999;
            border: 1px solid #500; cursor: pointer; border-radius: 6px; font-weight: 600;
            display: flex; align-items: center; justify-content: center;
            box-sizing: border-box; font-family: sans-serif; font-size: 14px; min-width: 80px;
        `;
        btnInf.onclick = () => {
            if(!input.value) { input.style.border = "1px solid red"; return; }
            startInfiniteChallenge(overlay, input.value);
        };

        // BUTTONS: 2m, 5m, 10m, Infinite, Custom
        btnContainer.append(
            createBtn("2m", 2), 
            createBtn("5m", 5), 
            createBtn("10m", 10), 
            btnInf,
            createBtn("Custom", 0, true)
        );

        // NO SUBMIT BUTTON ADDED.
        overlay.append(h2, input, btnContainer);
        document.body.appendChild(overlay);

        setTimeout(() => input.focus(), 100);
        input.addEventListener("keydown", (e) => { if(e.key === "Enter") handleStart(2, input.value); });

        function handleStart(minutes, intent) {
            if (!intent.trim()) { input.style.border = "1px solid red"; return; }
            startSession(minutes, intent);
            overlay.remove();
        }
    }

    // --- 2. PAUSE SCREEN (Clean UI) ---
    function createPauseScreen(session) {
        if (document.getElementById("jolt-paused")) return;

        const overlay = document.createElement("div");
        overlay.id = "jolt-paused";
        overlay.style.cssText = `
            all: initial;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.98); z-index: 2147483647;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            color: #fff; font-family: sans-serif; box-sizing: border-box;
        `;

        const h1 = document.createElement("h1");
        h1.innerText = "SESSION PAUSED";
        h1.style.cssText = "all: unset; display: block; color: #fff; font-size: 40px; letter-spacing: 5px; margin-bottom: 30px; text-align: center; font-family: sans-serif; font-weight: bold;";

        const resumeBtn = document.createElement("button");
        resumeBtn.innerText = "RESUME";
        resumeBtn.style.cssText = `
            all: initial;
            padding: 0 60px; height: 60px; font-size: 20px; font-weight: 800;
            background: #fff; color: #000; border: none; border-radius: 8px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            font-family: sans-serif; box-sizing: border-box;
        `;
        resumeBtn.onclick = () => resumeSession(session);

        overlay.append(h1, resumeBtn);
        document.body.appendChild(overlay);
    }

    // --- 3. FLOATING TIMER (Tracking Logic) ---
    function createFloatingTimer(session) {
        if (document.getElementById("jolt-timer")) return;

        const box = document.createElement("div");
        box.id = "jolt-timer";
        box.style.cssText = `
            all: initial;
            position: fixed; top: 20px; right: 20px; width: 220px;
            background: rgba(0,0,0,0.9); border: 1px solid #333;
            color: #fff; padding: 15px; z-index: 2147483647;
            font-family: monospace; border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            display: flex; flex-direction: column;
            backdrop-filter: blur(5px); cursor: grab; user-select: none;
            box-sizing: border-box;
        `;

        // HEADER
        const header = document.createElement("div");
        header.style.cssText = "all: initial; display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px; width: 100%; box-sizing: border-box;";

        const intentLabel = document.createElement("div");
        intentLabel.innerText = session.intent.length > 15 ? session.intent.substring(0,15)+"..." : session.intent;
        intentLabel.style.cssText = "all: initial; font-size: 11px; color: #aaa; text-transform: uppercase; font-family: monospace;";

        const closeBtn = document.createElement("div");
        closeBtn.innerText = "✕";
        closeBtn.style.cssText = "all: initial; font-size: 14px; color: #ff5555; cursor: pointer; font-weight: bold; padding: 0 5px; font-family: sans-serif;";

        // --- CANCEL LOGIC HERE (TRACKING) ---
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            cancelSession(session); 
        };
        header.append(intentLabel, closeBtn);

        const timerDisplay = document.createElement("div");
        timerDisplay.style.cssText = "all: initial; display: block; font-size: 28px; font-weight: 700; text-align: right; margin-bottom: 10px; color: #fff; font-family: monospace; width: 100%;";

        const pauseBtn = document.createElement("button");
        pauseBtn.innerText = "PAUSE";
        pauseBtn.style.cssText = `
            all: initial;
            width: 100%; padding: 5px; background: #333; border: none; color: #ccc;
            font-size: 12px; cursor: pointer; border-radius: 4px; text-align: center;
            font-family: sans-serif; box-sizing: border-box; display: block;
        `;
        pauseBtn.onclick = (e) => {
            e.stopPropagation();
            pauseSession(session);
        };

        box.append(header, timerDisplay, pauseBtn);
        document.body.appendChild(box);

        // DRAG
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        box.onmousedown = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target === closeBtn) return;
            isDragging = true;
            box.style.cursor = "grabbing";
            startX = e.clientX;
            startY = e.clientY;
            const rect = box.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;
        };
        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                box.style.left = `${initialLeft + dx}px`;
                box.style.top = `${initialTop + dy}px`;
                box.style.right = 'auto';
            }
        });
        window.addEventListener('mouseup', () => { isDragging = false; if(box) box.style.cursor = "grab"; });

        const interval = setInterval(() => {
            if (!document.getElementById("jolt-timer")) { clearInterval(interval); return; }
            const remaining = session.expiry - Date.now();
            if (remaining <= 0) {
                clearInterval(interval);
                timeExpired(box, session);
            } else {
                const m = Math.floor(remaining / 60000);
                const s = Math.floor((remaining % 60000) / 1000);
                timerDisplay.innerText = `${m}:${s < 10 ? '0'+s : s}`;
            }
        }, 1000);
    }

    // --- INFINITE CHALLENGE ---
    function startInfiniteChallenge(parentOverlay, intent) {
        parentOverlay.innerHTML = ""; 
        const h3 = document.createElement("h3");
        h3.innerText = "PAY THE COST: WRITE 100 WORDS";
        h3.style.cssText = "all: initial; display: block; color: #fff; margin-bottom: 20px; font-family: sans-serif; font-size: 20px; font-weight: bold;";

        const counter = document.createElement("div");
        counter.innerText = "0 / 100";
        counter.style.cssText = "all: initial; display: block; font-size: 24px; margin-bottom: 20px; color: #888; font-family: monospace;";

        const area = document.createElement("textarea");
        area.style.cssText = `all: initial; display: block; width: 600px; height: 300px; background: #111; color: #eee; padding: 20px; border: 1px solid #333; font-family: monospace; font-size: 16px; border-radius: 8px; outline: none; resize: none; box-sizing: border-box;`;

        const unlockBtn = document.createElement("button");
        unlockBtn.innerText = "UNLOCK";
        unlockBtn.disabled = true;
        unlockBtn.style.cssText = `all: initial; display: inline-block; padding: 15px 30px; margin-top: 20px; background: #222; color: #555; border: none; cursor: not-allowed; font-weight: bold; border-radius: 6px; font-family: sans-serif;`;

        area.addEventListener("input", () => {
            const words = area.value.trim().split(/\s+/).filter(w => w.length > 0).length;
            counter.innerText = `${words} / 100`;
            if (words >= 100) {
                counter.style.color = "#4f4"; unlockBtn.disabled = false; unlockBtn.style.background = "#fff"; unlockBtn.style.color = "#000"; unlockBtn.style.cursor = "pointer";
            }
        });
        unlockBtn.onclick = () => { startSession(99999, intent); parentOverlay.remove(); };
        parentOverlay.append(h3, counter, area, unlockBtn);
        area.focus();
    }

    // --- ACTIONS ---
    function startSession(minutes, intent) {
        const expiry = Date.now() + (minutes * 60 * 1000);
        const data = {};
        data[STORAGE_KEY] = { expiry: expiry, intent: intent, duration: minutes, paused: false };
        chrome.storage.local.set(data, () => checkStatusAndRender());
    }

    function pauseSession(session) {
        const remainingMs = session.expiry - Date.now();
        const data = {};
        data[STORAGE_KEY] = { ...session, paused: true, remainingMs: remainingMs };
        chrome.storage.local.set(data, () => checkStatusAndRender());
    }

    function resumeSession(session) {
        const newExpiry = Date.now() + session.remainingMs;
        const data = {};
        data[STORAGE_KEY] = { ...session, paused: false, expiry: newExpiry, remainingMs: null };
        chrome.storage.local.set(data, () => checkStatusAndRender());
    }

    function cancelSession(session) {
        let remainingMs = 0;
        if (session.paused) {
            remainingMs = session.remainingMs;
        } else {
            remainingMs = session.expiry - Date.now();
        }

        // TRACKING MATH
        const durationMs = session.duration * 60 * 1000;
        const spentMs = durationMs - remainingMs;
        const spentMinutes = Math.max(0, Math.floor(spentMs / 60000));

        chrome.runtime.sendMessage({
            action: "LOG_TO_DISCORD",
            timeText: `${spentMinutes} minutes (Stopped Early)`,
            intent: session.intent + " [Cancelled]",
            website: window.location.hostname
        });

        // HARD RESET
        setTimeout(() => {
            chrome.storage.local.remove(STORAGE_KEY, () => location.reload());
        }, 100);
    }

    function timeExpired(timerBox, session) {
        timerBox.style.background = "#c00";
        timerBox.innerText = "TIME IS UP";

        const flash = document.createElement("div");
        flash.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:red;z-index:2147483648;opacity:0.3;pointer-events:none;";
        document.body.appendChild(flash);

        const timeText = session.duration >= 9000 ? "an INFINITE amount" : `${session.duration} minutes`;

        chrome.runtime.sendMessage({
            action: "LOG_TO_DISCORD",
            timeText: timeText,
            intent: session.intent,
            website: window.location.hostname
        });

        setTimeout(() => {
            chrome.storage.local.remove(STORAGE_KEY, () => location.reload());
        }, 100);
    }
})();
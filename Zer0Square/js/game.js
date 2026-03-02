/**
 * game.js – Zer0Square core game engine.
 *
 * Manages UI, board rendering, timer and game state.
 * Delegates level config to Levels and move logic to Rules.
 */
const Game = (() =>
{
    "use strict";

    /* ── State ── */
    let cfg = null;
    let currentGridSize = null;  // remembers custom grid size for replay
    let totalCells = 0;
    let arr = [];
    let arrCopy = [];
    let winArr = [];

    let timerRAF = null;
    let timerStart = 0;
    let elapsedMs = 0;
    let gameOver = false;

    /* ── DOM refs ── */
    let boardEl, timerEl, boardContainer, controlsEl;

    /* ══════════════════════════════════════════
     *  Timer  (Date.now-based for accuracy)
     * ══════════════════════════════════════════ */

    function tickTimer()
    {
        if (!timerStart) return;
        elapsedMs = Date.now() - timerStart;
        renderTimer();
        timerRAF = requestAnimationFrame(tickTimer);
    }

    function renderTimer()
    {
        if (!timerEl) return;
        const total = elapsedMs;
        const cs = Math.floor((total % 1000) / 10);
        const ss = Math.floor(total / 1000) % 60;
        const mm = Math.floor(total / 60000);
        timerEl.textContent =
            String(mm).padStart(2, "0") + ":" +
            String(ss).padStart(2, "0") + ":" +
            String(cs).padStart(2, "0");
    }

    function startTimer()
    {
        stopTimer();
        elapsedMs = 0;
        timerStart = Date.now();
        renderTimer();
        timerRAF = requestAnimationFrame(tickTimer);
    }

    function stopTimer()
    {
        if (timerRAF) { cancelAnimationFrame(timerRAF); timerRAF = null; }
        if (timerStart) { elapsedMs = Date.now() - timerStart; }
        timerStart = 0;
    }

    /* ══════════════════════════════════════════
     *  Board rendering
     * ══════════════════════════════════════════ */

    function buildTable()
    {
        const { cols, rows } = cfg;
        const table = document.createElement("table");
        table.classList.add("board");

        for (let r = 0; r < rows; r++)
        {
            const tr = document.createElement("tr");
            for (let c = 0; c < cols; c++)
            {
                const idx = r * cols + c;
                const td = document.createElement("td");
                td.dataset.index = idx;
                td.addEventListener("click", () => handleCellClick(idx));
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    }

    function renderBoard(changedIndices)
    {
        if (!boardEl) return;
        boardEl.querySelectorAll("td").forEach((td) =>
        {
            const idx = Number(td.dataset.index);
            td.textContent = arr[idx];
            td.classList.toggle("zero-cell", arr[idx] === 0);

            // Swap flash animation
            if (changedIndices && changedIndices.includes(idx))
            {
                td.classList.remove("cell-flash");
                // Force reflow so re-adding the class restarts the animation
                void td.offsetWidth;
                td.classList.add("cell-flash");
            }
        });
    }

    /* ══════════════════════════════════════════
     *  Game logic
     * ══════════════════════════════════════════ */

    function handleCellClick(clickedIdx)
    {
        if (gameOver) return;

        const zeroIdx = arr.indexOf(0);

        // Clicking position 0 triggers end-game
        if (clickedIdx === 0)
        {
            arr[zeroIdx] = arr[0];
            arr[0] = 0;
            renderBoard([0, zeroIdx]);
            endGame();
            return;
        }

        // Validate move via Rules module
        if (!Rules.isMoveAllowed(clickedIdx, arr, cfg))
        {
            showToast("Click a number next to 0!");
            return;
        }

        // Swap
        arr[zeroIdx] = arr[clickedIdx];
        arr[clickedIdx] = 0;
        renderBoard([clickedIdx, zeroIdx]);
    }

    function endGame()
    {
        gameOver = true;
        stopTimer();

        const won = JSON.stringify(arr) === JSON.stringify(winArr);

        // Save best time
        if (won) { saveBestTime(cfg, elapsedMs); }

        boardContainer.innerHTML = "";
        controlsEl.classList.add("hidden");

        const result = document.createElement("div");
        result.classList.add("result-container", won ? "win" : "lose");

        const h2 = document.createElement("h2");
        h2.textContent = won ? "Congratulations!" : "You Lose!";
        h2.style.color = won ? "green" : "red";
        result.appendChild(h2);

        const p = document.createElement("p");
        p.textContent = won ? "You WON" : "Better luck next time";
        p.style.color = won ? "green" : "red";
        result.appendChild(p);

        const time = document.createElement("div");
        time.classList.add("timer-result");
        time.textContent = timerEl.textContent;
        result.appendChild(time);

        const replayBtn = document.createElement("button");
        replayBtn.classList.add("btn-replay");
        replayBtn.textContent = "Play Again";
        replayBtn.addEventListener("click", () => startLevel(cfg.levelNum, currentGridSize));
        result.appendChild(replayBtn);

        const homeBtn = document.createElement("button");
        homeBtn.classList.add("btn-home");
        homeBtn.textContent = "Home";
        homeBtn.addEventListener("click", () => Router.navigate("/"));
        result.appendChild(homeBtn);

        // Show best time below result
        const bestMs = getBestTime(cfg);
        if (bestMs !== null)
        {
            const best = document.createElement("div");
            best.classList.add("best-time");
            best.textContent = "Best: " + formatMs(bestMs);
            result.appendChild(best);
        }

        boardContainer.appendChild(result);
    }

    /* ══════════════════════════════════════════
     *  Best-time persistence  (localStorage)
     * ══════════════════════════════════════════ */

    function bestTimeKey(c)
    {
        return c.custom
            ? `z0s-best-${c.levelNum}-${c.cols}`
            : `z0s-best-${c.levelNum}`;
    }

    function getBestTime(c)
    {
        const v = localStorage.getItem(bestTimeKey(c));
        return v !== null ? Number(v) : null;
    }

    function saveBestTime(c, ms)
    {
        const prev = getBestTime(c);
        if (prev === null || ms < prev)
        {
            localStorage.setItem(bestTimeKey(c), ms);
        }
    }

    function formatMs(ms)
    {
        const cs = Math.floor((ms % 1000) / 10);
        const ss = Math.floor(ms / 1000) % 60;
        const mm = Math.floor(ms / 60000);
        return String(mm).padStart(2, "0") + ":" +
               String(ss).padStart(2, "0") + ":" +
               String(cs).padStart(2, "0");
    }

    /* ══════════════════════════════════════════
     *  Toast (non-blocking feedback)
     * ══════════════════════════════════════════ */

    let toastTimeout = null;
    function showToast(msg)
    {
        let toast = document.getElementById("toast");
        if (!toast)
        {
            toast = document.createElement("div");
            toast.id = "toast";
            toast.style.cssText =
                "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);" +
                "background:#333;color:#fff;padding:10px 22px;border-radius:6px;" +
                "font-size:0.95rem;z-index:1000;opacity:0;transition:opacity .3s;";
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = "1";
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => { toast.style.opacity = "0"; }, 1500);
    }

    /* ══════════════════════════════════════════
     *  Public API
     * ══════════════════════════════════════════ */

    function showHome()
    {
        stopTimer();
        document.getElementById("view-home").classList.remove("hidden");
        document.getElementById("view-game").classList.add("hidden");
        renderBestTimes();
        wireCustomButtons();
    }

    /** Show best times on the home screen level grid. */
    function renderBestTimes()
    {
        // Fixed levels 1-6
        for (let i = 1; i <= 6; i++)
        {
            const c = Levels.get(i);
            const ms = getBestTime(c);
            const link = document.querySelector(`.level-grid a[href="#/level/${i}"]`);
            if (!link) continue;
            let badge = link.querySelector(".best-badge");
            if (ms !== null)
            {
                if (!badge)
                {
                    badge = document.createElement("span");
                    badge.classList.add("best-badge");
                    link.appendChild(badge);
                }
                badge.textContent = formatMs(ms);
            }
            else if (badge)
            {
                badge.remove();
            }
        }
    }

    /** Wire Play buttons for custom levels (removes inline onclick). */
    function wireCustomButtons()
    {
        const btn7 = document.getElementById("btn-play-7");
        const btn8 = document.getElementById("btn-play-8");
        if (btn7 && !btn7.dataset.wired)
        {
            btn7.addEventListener("click", () =>
            {
                const size = document.getElementById("grid-select-7").value;
                Router.navigate("/level/7/" + size);
            });
            btn7.dataset.wired = "1";
        }
        if (btn8 && !btn8.dataset.wired)
        {
            btn8.addEventListener("click", () =>
            {
                const size = document.getElementById("grid-select-8").value;
                Router.navigate("/level/8/" + size);
            });
            btn8.dataset.wired = "1";
        }
    }

    function startLevel(levelNum, gridSize)
    {
        levelNum = Number(levelNum);
        currentGridSize = gridSize || null;
        cfg = Levels.get(levelNum, currentGridSize);
        if (!cfg) { Router.navigate("/"); return; }

        totalCells = cfg.cols * cfg.rows;
        winArr = Array.from({ length: totalCells }, (_, i) => i);
        gameOver = false;

        // Switch views
        document.getElementById("view-home").classList.add("hidden");
        document.getElementById("view-game").classList.remove("hidden");

        // Level badge
        const badge = cfg.custom
            ? `Level ${levelNum} — ${Levels.ruleLabel(cfg.rule)} (${cfg.cols}×${cfg.rows})`
            : `Level : ${levelNum}`;
        document.getElementById("level-badge").textContent = badge;

        // Board
        boardContainer = document.getElementById("board-container");
        boardContainer.innerHTML = "";
        boardEl = buildTable();
        boardContainer.appendChild(boardEl);

        // Controls & timer
        controlsEl = document.getElementById("game-controls");
        controlsEl.classList.remove("hidden");
        timerEl = document.getElementById("timer");

        // Generate & render
        newSet();

        // Wire buttons
        replaceButton("btn-reset", reset);
        replaceButton("btn-next", newSet);
        replaceButton("btn-howto", showHowTo);
        replaceButton("btn-about", showAbout);
        replaceButton("btn-help", showHelp);
        replaceButton("btn-back", () => Router.navigate("/"));
    }

    function replaceButton(id, handler)
    {
        const old = document.getElementById(id);
        const btn = old.cloneNode(true);
        old.parentNode.replaceChild(btn, old);
        btn.addEventListener("click", handler);
    }

    function newSet()
    {
        gameOver = false;
        controlsEl.classList.remove("hidden");
        if (!boardContainer.querySelector("table"))
        {
            boardEl = buildTable();
            boardContainer.innerHTML = "";
            boardContainer.appendChild(boardEl);
        }
        arr = Rules.generateBoard(cfg);
        arrCopy = [...arr];
        renderBoard(null);
        startTimer();
    }

    function reset()
    {
        if (gameOver) return;
        arr = [...arrCopy];
        renderBoard(null);
        startTimer();
    }

    /* ── Info toasts (use Levels for descriptions) ── */

    function showHowTo()
    {
        const desc = Levels.ruleDescription(cfg.rule);
        showToast(`Level ${cfg.levelNum}: Arrange 0-${totalCells - 1} by ${desc} before 0 returns to position 0.`);
    }

    function showAbout()
    {
        showToast(`Zer0Square Game — Level ${cfg.levelNum}. Created by Arun Ruban SJ.`);
    }

    function showHelp()
    {
        const desc = Levels.ruleDescription(cfg.rule);
        showToast(
            `0 is the key (green). ${desc.charAt(0).toUpperCase() + desc.slice(1)}. ` +
            `Don't send 0 back to position 0 until everything is sorted! Reset restarts the current set; NextSet generates a new one.`
        );
    }

    return { showHome, startLevel };
})();

/**
 * rules.js – Movement rules, adjacency logic and solvability checks.
 *
 * This module is pure logic — no DOM, no state.
 * It answers two questions for the game engine:
 *   1. "Which cells can be swapped with 0?"  → getNeighbours()
 *   2. "Is this board actually solvable?"     → isSolvable()
 */
const Rules = (() =>
{
    "use strict";

    /* ────────────────────────────────────────────
     *  Adjacency
     * ──────────────────────────────────────────── */

    /**
     * Return the indices of cells that count as neighbours of `idx`
     * under the given rule and grid dimensions.
     *
     * @param {number} idx   – cell index (0-based, row-major)
     * @param {object} cfg   – { cols, rows, rule }
     * @returns {number[]|null}  Array of neighbour indices, or
     *                           null when rule === "free" (everything allowed).
     */
    function getNeighbours(idx, cfg)
    {
        const { cols, rows, rule } = cfg;
        if (rule === "free") return null;

        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const neighbours = [];

        // Cardinal (up / down / left / right)
        if (row > 0)          neighbours.push(idx - cols);
        if (row < rows - 1)   neighbours.push(idx + cols);
        if (col > 0)          neighbours.push(idx - 1);
        if (col < cols - 1)   neighbours.push(idx + 1);

        // Diagonals (king-move style)
        if (rule === "near")
        {
            if (row > 0 && col > 0)              neighbours.push(idx - cols - 1);
            if (row > 0 && col < cols - 1)        neighbours.push(idx - cols + 1);
            if (row < rows - 1 && col > 0)        neighbours.push(idx + cols - 1);
            if (row < rows - 1 && col < cols - 1) neighbours.push(idx + cols + 1);
        }

        return neighbours;
    }

    /**
     * Is clicking `clickedIdx` a legal move given the current board?
     *
     * @param {number}   clickedIdx – index the player clicked
     * @param {number[]} board      – current board state
     * @param {object}   cfg        – { cols, rows, rule }
     * @returns {boolean}
     */
    function isMoveAllowed(clickedIdx, board, cfg)
    {
        const neighbours = getNeighbours(clickedIdx, cfg);
        if (neighbours === null) return true;            // "free" rule
        return neighbours.includes(board.indexOf(0));
    }

    /* ────────────────────────────────────────────
     *  Solvability (for adjacent-only / sliding-puzzle rule)
     * ──────────────────────────────────────────── */

    /**
     * Count inversions among non-zero tiles in reading order.
     * An inversion is a pair (i, j) where i < j but board[i] > board[j].
     */
    function countInversions(board)
    {
        let inv = 0;
        const filtered = board.filter((x) => x !== 0);
        for (let i = 0; i < filtered.length; i++)
        {
            for (let j = i + 1; j < filtered.length; j++)
            {
                if (filtered[i] > filtered[j]) inv++;
            }
        }
        return inv;
    }

    /**
     * Check whether `board` is solvable under `cfg`'s movement rule.
     *
     * - "free" and "near" rules: all permutations are reachable
     *   (king-moves generate the full symmetric group on grids ≥ 2×3).
     * - "strict" rule: classic sliding-puzzle parity applies:
     *     • Odd grid width  → solvable iff #inversions is even
     *     • Even grid width → solvable iff (#inversions + blank-row-from-bottom) is even
     *
     * @param {number[]} board
     * @param {object}   cfg – { cols, rows, rule }
     * @returns {boolean}
     */
    function isSolvable(board, cfg)
    {
        if (cfg.rule !== "strict") return true;

        const inversions = countInversions(board);
        const blankPos = board.indexOf(0);

        if (cfg.cols % 2 === 1)
        {
            return inversions % 2 === 0;
        }

        const blankRowFromTop = Math.floor(blankPos / cfg.cols);
        const blankRowFromBottom = cfg.rows - blankRowFromTop; // 1-indexed
        return (inversions + blankRowFromBottom) % 2 === 0;
    }

    /* ────────────────────────────────────────────
     *  Board generation
     * ──────────────────────────────────────────── */

    /** Fisher-Yates shuffle (in-place). */
    function shuffle(a)
    {
        for (let i = a.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    /**
     * Generate a valid shuffled board for the given config.
     *
     * Guarantees:
     *   • 0 is NOT at index 0 (game doesn't end instantly)
     *   • cell[0] is reachable from index 0 (player can start legally)
     *   • the permutation is solvable under the movement rule
     *
     * @param {object} cfg – { cols, rows, rule }
     * @returns {number[]}
     */
    function generateBoard(cfg)
    {
        const totalCells = cfg.cols * cfg.rows;
        const winArr = Array.from({ length: totalCells }, (_, i) => i);
        const validFirstNeighbours = getNeighbours(0, cfg);

        let board;
        let attempts = 0;
        do
        {
            board = shuffle([...winArr]);
            attempts++;
            if (board[0] === 0) continue;
            if (validFirstNeighbours !== null && !validFirstNeighbours.includes(board[0])) continue;
            if (!isSolvable(board, cfg)) continue;
            break;
        } while (attempts < 100000);

        return board;
    }

    return { getNeighbours, isMoveAllowed, isSolvable, generateBoard };
})();

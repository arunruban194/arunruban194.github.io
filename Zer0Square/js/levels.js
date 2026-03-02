/**
 * levels.js – Level definitions for Zer0Square.
 *
 * Each level specifies:
 *   cols / rows  – grid dimensions
 *   rule         – movement constraint ("free" | "near" | "strict")
 *
 * Rules:
 *   "free"    → click any cell to swap with 0   (easiest)
 *   "near"    → click a cell adjacent or diagonal to 0
 *   "strict"  → click a cell directly adjacent to 0, no diagonals (hardest)
 *
 * Levels 1-6 have fixed grids. Levels 7-8 are "custom" — the player
 * picks a grid size (6×6 to 10×10) from a dropdown on the home screen.
 *
 * To add a new level, append an entry to DEFINITIONS and add its
 * link/widget in index.html. The engine picks it up automatically.
 */
const Levels = (() =>
{
    "use strict";

    const DEFINITIONS = {
        1: { cols: 4, rows: 4, rule: "free" },
        2: { cols: 4, rows: 4, rule: "near" },
        3: { cols: 4, rows: 4, rule: "strict" },
        4: { cols: 5, rows: 5, rule: "free" },
        5: { cols: 5, rows: 5, rule: "near" },
        6: { cols: 5, rows: 5, rule: "strict" },
        7: { cols: null, rows: null, rule: "near",   custom: true },
        8: { cols: null, rows: null, rule: "strict",  custom: true },
    };

    /** Human-readable labels for each rule. */
    const RULE_LABELS = {
        free:   "Free",
        near:   "Near",
        strict: "Strict",
    };

    /** Short play-instruction per rule. */
    const RULE_DESCRIPTIONS = {
        free:   "click on any number to replace it with '0'",
        near:   "click on a number adjacent or diagonal to '0'",
        strict: "click on a number directly adjacent to '0' (no diagonals)",
    };

    /**
     * Get level config by number.
     * For custom levels (7, 8), pass gridSize to set cols/rows.
     * @param {number} levelNum
     * @param {number} [gridSize] – required for custom levels (6-10)
     * @returns {{ cols: number, rows: number, rule: string, levelNum: number, custom?: boolean } | null}
     */
    function get(levelNum, gridSize)
    {
        const def = DEFINITIONS[levelNum];
        if (!def) return null;

        const cfg = { ...def, levelNum };

        if (cfg.custom)
        {
            const size = Number(gridSize);
            if (!size || size < 6 || size > 10) return null;
            cfg.cols = size;
            cfg.rows = size;
        }

        return cfg;
    }

    /** Get human-readable rule label. */
    function ruleLabel(rule)
    {
        return RULE_LABELS[rule] || rule;
    }

    /** Get play-instruction text for a rule. */
    function ruleDescription(rule)
    {
        return RULE_DESCRIPTIONS[rule] || "";
    }

    /** Total number of defined levels. */
    function count()
    {
        return Object.keys(DEFINITIONS).length;
    }

    return { get, ruleLabel, ruleDescription, count };
})();

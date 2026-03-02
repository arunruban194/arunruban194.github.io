/**
 * router.js – Minimal hash-based SPA router for Zer0Square.
 *
 * Routes:
 *   #/               → Home (level select)
 *   #/level/:n        → Game view for level n (1-6)
 *   #/level/:n/:size  → Custom-grid level (7-8) with NxN grid
 */
const Router = (() =>
{
    "use strict";

    /** Registered route handlers: { pattern: RegExp, handler: Function } */
    const routes = [];

    /**
     * Register a route.
     * @param {string} path  – Route pattern, e.g. "/level/:n"
     * @param {Function} handler – Called with matched params object.
     */
    function on(path, handler)
    {
        // Convert "/level/:n" → /^\/level\/([^/]+)$/
        const paramNames = [];
        const pattern = path.replace(/:([^/]+)/g, (_match, name) =>
        {
            paramNames.push(name);
            return "([^/]+)";
        });
        routes.push({
            regex: new RegExp("^" + pattern + "$"),
            paramNames,
            handler,
        });
    }

    /** Resolve the current hash and invoke the matching handler. */
    function resolve()
    {
        const hash = location.hash.slice(1) || "/";
        for (const route of routes)
        {
            const match = hash.match(route.regex);
            if (match)
            {
                const params = {};
                route.paramNames.forEach((name, i) =>
                {
                    params[name] = decodeURIComponent(match[i + 1]);
                });
                route.handler(params);
                return;
            }
        }
        // Fallback: go home
        navigate("/");
    }

    /**
     * Programmatically navigate to a hash route.
     * @param {string} path – e.g. "/level/3"
     */
    function navigate(path)
    {
        location.hash = "#" + path;
    }

    /** Start listening for hash changes. */
    function start()
    {
        window.addEventListener("hashchange", resolve);
        resolve();
    }

    return { on, navigate, start };
})();

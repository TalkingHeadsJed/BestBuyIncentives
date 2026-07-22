import { useState, useEffect } from "react";

// Returns false during prerendering AND on the client's first (hydration) render,
// then flips to true after mount. This lets client-only / measurement-based widgets
// (marquees, toasters, etc.) render a static or empty version that matches the
// prerendered HTML exactly, avoiding hydration mismatches, then upgrade after hydration.
export default function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.__PRERENDER__) return;
    setHydrated(true);
  }, []);
  return hydrated;
}

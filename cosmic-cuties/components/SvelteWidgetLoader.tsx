// Loads the svelte-widget.js web component and mounts it.

import React, { useEffect } from "react";

export default function SvelteWidgetLoader() {
  useEffect(() => {
    const src = "/widgets/svelte-widget.js";
    if (!(window as any).__svelteWidgetLoaded) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => { (window as any).__svelteWidgetLoaded = true; };
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="card">
      <h3 className="font-semibold mb-2">Svelte Micro-Interaction</h3>
      <svelte-widget></svelte-widget>
    </div>
  );
}
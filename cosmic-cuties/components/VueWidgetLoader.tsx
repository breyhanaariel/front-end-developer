// Loads the vue-widget.js web component and mounts it.

import React, { useEffect } from "react";

export default function VueWidgetLoader() {
  useEffect(() => {
    const src = "/widgets/vue-widget.js";
    if (!(window as any).__vueWidgetLoaded) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => { (window as any).__vueWidgetLoaded = true; };
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="card">
      <h3 className="font-semibold mb-2">Vue Chart Widget (micro)</h3>
      <vue-widget></vue-widget>
    </div>
  );
}
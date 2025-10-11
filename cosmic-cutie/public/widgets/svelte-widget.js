// public/widgets/svelte-widget.js
// A tiny animated micro-widget emulating Svelte micro-interactions. Again, no Svelte build required — it’s a web component that shows how you’d present Svelte micro-interactions.
class SvelteWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.value = 0;
  }
  connectedCallback() {
    this.render();
    this.interval = setInterval(() => {
      this.value = (this.value + Math.floor(Math.random() * 10)) % 100;
      this.update();
    }, 1500);
  }
  disconnectedCallback() {
    clearInterval(this.interval);
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:linear-gradient(90deg,#fff7fb,#ffeef6);box-shadow:0 6px 18px rgba(255,127,191,0.08);}
        .pulse{width:10px;height:10px;border-radius:999px;background:#ff7fbf; animation:pulse 1.2s infinite;}
        @keyframes pulse {0%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:0.6}100%{transform:scale(1);opacity:1}}
        .txt{font-weight:600}
      </style>
      <div class="chip"><div class="pulse" aria-hidden></div><div class="txt">Svelte Widget: <span id="n">0</span>%</div></div>
    `;
    this.update();
  }
  update() {
    const n = this.shadowRoot.querySelector("#n");
    if (n) n.textContent = String(this.value);
  }
}
if (!customElements.get("svelte-widget")) customElements.define("svelte-widget", SvelteWidget);

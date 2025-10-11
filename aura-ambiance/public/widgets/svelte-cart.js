// (small cart micro-widget / animation implemented as web component)

class AuraCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.count = 0;
  }
  connectedCallback() {
    this.render();
    window.addEventListener('aura-cart-add', this.onAdd);
  }
  disconnectedCallback() {
    window.removeEventListener('aura-cart-add', this.onAdd);
  }
  onAdd = (e) => {
    this.count = e.detail?.count ?? (this.count + 1);
    this.update();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
      .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:linear-gradient(90deg,#fff7fb,#ffeef6);box-shadow:0 6px 18px rgba(255,127,191,0.06);}
      .pulse{width:10px;height:10px;border-radius:999px;background:#ff7fbf; animation:pulse 1.2s infinite;}
      @keyframes pulse {0%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:0.6}100%{transform:scale(1);opacity:1}}
      .txt{font-weight:600}
      </style>
      <div class="chip" role="status" aria-live="polite">
        <div class="pulse" aria-hidden></div>
        <div class="txt">Cart: <span id="n">0</span></div>
      </div>
    `;
    this.update();
  }
  update() {
    const n = this.shadowRoot.querySelector('#n');
    if (n) n.textContent = String(this.count);
  }
}
if (!customElements.get('aura-cart')) customElements.define('aura-cart', AuraCart);
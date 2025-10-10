// (lightweight web component demonstrating a "Vue-like" filter widget — no Vue build required)

class AuraFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;font-family:Inter,system-ui; }
        .box{padding:12px;border-radius:10px;background:linear-gradient(180deg,#fff,#f7fbff);box-shadow:0 6px 18px rgba(111,124,255,0.08)}
        .btn{padding:6px 10px;border-radius:8px;border:1px solid #e5ecff;background:white;cursor:pointer;margin-right:6px}
      </style>
      <div class="box">
        <div style="font-weight:600;margin-bottom:8px">Category Filter (micro-widget)</div>
        <div>
          <button class="btn" data-cat="all">All</button>
          <button class="btn" data-cat="serum">Serums</button>
          <button class="btn" data-cat="primer">Primers</button>
        </div>
      </div>
    `;
    this.shadowRoot.querySelectorAll(".btn").forEach(b => {
      b.addEventListener("click", (e) => {
        const cat = e.currentTarget.dataset.cat;
        window.dispatchEvent(new CustomEvent('aura-filter', { detail: { category: cat } }));
      });
    });
  }
}
if (!customElements.get('aura-filter')) customElements.define('aura-filter', AuraFilter);
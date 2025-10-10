// public/widgets/vue-widget.js
// This is a lightweight Vue-like web component (no Vue runtime required) emulating a chart widget. It's intentionally small so you can demonstrate a "Vue widget" without a full build.
  
class VueWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <style>
        :host{display:block}
        .widget{font-family:Inter, system-ui; background: linear-gradient(180deg,#f8faff,#eef6ff); padding:12px; border-radius:10px;}
        .title{font-weight:600; font-size:14px; color:#2b2b58;}
        .value{font-size:22px; font-weight:700; margin-top:6px; color:#3b3b7a;}
      </style>
      <div class="widget">
        <div class="title">Vue Widget — Brightness</div>
        <div class="value" id="val">—</div>
      </div>
    `;
    this.shadowRoot.appendChild(wrapper);
    this.update();
  }
  update() {
    const el = this.shadowRoot.querySelector("#val");
    const val = Math.floor(Math.random() * 100);
    if (el) el.textContent = val + "%";
  }
}
if (!customElements.get("vue-widget")) customElements.define("vue-widget", VueWidget);

if (typeof window !== 'undefined') {
  class Spacer extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Create a div element with class "spacer"
      const div = document.createElement('div');
      div.classList.add('spacer');
  
      // Attach styles
      const style = document.createElement('style');
      style.textContent = `
        .spacer {
          flex-grow: 1;
        }
      `;
  
      shadow.appendChild(style);
      shadow.appendChild(div);
    }
  }
  
  // Define the custom element
  customElements.define('spacer-component', Spacer);
}

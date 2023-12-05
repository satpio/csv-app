import '@webcomponents/scoped-custom-element-registry';

import { LitElement, html } from 'lit';
import './src/components/Layout/Layout.js';

class App extends LitElement {
  render() {
    return html` <layout-component></layout-component> `;
  }
}

customElements.define('app-component', App);

const appRoot = document.getElementById('app-root');
const AppComponent = document.createElement('app-component');
appRoot.appendChild(AppComponent);

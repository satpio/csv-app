import { html, css } from 'lit';
import { Base } from '../Base/Base.js';
import { Html, Csv } from '../Views/index.js';

export class Layout extends Base {
  static scopedElements = {
    'html-component': Html,
    'csv-component': Csv,
  };

  static styles = [
    css`
      .wrapper {
        display: flex;
        width: 100%;
      }
      @media screen and (max-width: 767px) {
        .wrapper {
          flex-direction: column;
        }
      }
      @media screen and (min-width: 768px) {
        .wrapper {
          flex-direction: row;
        }
      }
    `,
  ];

  render() {
    return html`
      <div class="wrapper">
        <csv-component></csv-component>
        <html-component></html-component>
      </div>
    `;
  }
}

customElements.define('layout-component', Layout);

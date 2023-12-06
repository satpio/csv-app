import { html, css, adoptStyles, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { LionInput } from '@lion/ui/input.js';
import { Base } from '../Base/Base.js';

export class Table extends Base {
  constructor() {
    super();
    this.objData = {};
  }

  static properties = {
    objData: { type: Object },
  };

  static scopedElements = {
    ...super.scopedElements,
    'lion-input': LionInput,
  };

  connectedCallback() {
    super.connectedCallback();
    adoptStyles(this.shadowRoot, [
      css`
        .form-control {
          width: 100%;
        }
      `,
    ]);
  }

  onInputChange(ev, rowIndex, colIndex) {
    this.objData.values[rowIndex][colIndex] = ev.target.value;
  }

  addRow() {
    const { headers, values } = this.objData;
    const newRow = Array(headers.length).fill('');
    this.objData = {
      headers,
      values: [...values, newRow],
    };
  }

  getThead() {
    const colStyles = styleMap({
      width: `calc(100% / ${this.objData.headers.length})`,
    });
    return html`
      <thead>
        <tr>
          ${this.objData.headers.map(
            header => html`<th style=${colStyles}>${header}</th>`
          )}
        </tr>
      </thead>
    `;
  }

  getRow(row, rowIndex) {
    const colStyles = styleMap({
      width: `calc(100% / ${this.objData.headers.length})`,
    });
    return html`
      <tr>
        ${row.map(
          (value, colIndex) =>
            html`<td style=${colStyles}>
              <lion-input
                .modelValue=${value}
                @model-value-changed=${ev =>
                  this.onInputChange(ev, rowIndex, colIndex)}
              ></lion-input>
            </td>`
        )}
      </tr>
    `;
  }

  getTbody() {
    const rows = this.objData?.values?.length
      ? this.objData.values.map(this.getRow.bind(this))
      : nothing;
    return html`
      <tbody>
        ${rows}
      </tbody>
    `;
  }

  getTable() {
    const thead = this.getThead();
    const tbody = this.getTbody();

    return html`
      <table>
        ${[thead, tbody]}
      </table>
    `;
  }

  getButton() {
    return html`<lion-button @click=${this.addRow}>Add row...</lion-button>`;
  }

  render() {
    if (!this.objData?.headers?.length) return nothing;

    const table = this.getTable();
    const button = this.getButton();
    return [table, button];
  }
}

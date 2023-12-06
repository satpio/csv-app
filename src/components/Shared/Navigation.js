import { html, css, nothing } from 'lit';
import { LionSelect } from '@lion/ui/select.js';
import { Base } from '../Base/Base.js';
import { SEPARATOR_VALUES } from '../../enums/SeparatorTypes.js';

export class Navigation extends Base {
  constructor() {
    super();
    this.button = {};
    this.options = [];
  }

  static properties = {
    button: { type: Object },
    options: { type: Array },
  };

  static scopedElements = {
    ...super.scopedElements,
    'lion-select': LionSelect,
  };

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 0 12px;
      }
    `,
  ];

  onSelectChange(ev) {
    this.dispatchEvent(
      new CustomEvent(
        'onDelimeterChange',
        { detail: SEPARATOR_VALUES[ev.target.value] },
        true
      )
    );
  }

  getSelect() {
    if (!this.options.length) {
      return nothing;
    }

    return html`
      <lion-select
        label="Separator:"
        @model-value-changed=${this.onSelectChange}
      >
        <select slot="input">
          ${this.options.map(
            option => html` <option value=${option}>${option}</option> `
          )}
        </select>
      </lion-select>
    `;
  }

  getButton() {
    if (!('callback' in this.button) || !('text' in this.button)) {
      return nothing;
    }

    return html`
      <lion-button @click=${this.button.callback}>
        ${this.button.text}
      </lion-button>
    `;
  }

  render() {
    const button = this.getButton();
    const select = this.getSelect();
    return [button, select];
  }
}

import { html, css } from 'lit';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { Navigation } from '../components/Shared/Navigation.js';
import { SEPARATOR_VALUES, SEPARATOR_TYPES } from '../enums/SeparatorTypes.js';

export const HtmlCsvMixin = dedupeMixin(
  superClass =>
    class extends superClass {
      constructor() {
        super();
        this.delimeter = SEPARATOR_VALUES[SEPARATOR_TYPES.COMMA];
      }

      static scopedElements = {
        'navigation-component': Navigation,
      };

      static styles = [
        css`
          :host {
            padding: 0 5px;
            box-sizing: border-box;
          }
          @media screen and (max-width: 767px) {
            :host {
              width: calc(100% - 10px);
            }
          }
          @media screen and (min-width: 768px) {
            :host {
              width: calc((100% / 2) - 10px);
            }
          }
        `,
      ];

      checkSeparators() {
        const otherDelimeters = Object.values(SEPARATOR_VALUES).filter(
          delimeter => delimeter !== this.delimeter
        );
        let { value } = this.textarea;
        otherDelimeters.forEach(delimeter => {
          if (value.includes(delimeter)) {
            value = value.replaceAll(delimeter, this.delimeter);
            this.textarea.value = value;
          }
        });
        return value;
      }

      onDelimeterChange(ev) {
        this.delimeter = ev.detail;
        if (this.textarea) {
          this.textarea.value = this.checkSeparators();
          this.previousDelimeter = this.delimeter;
        }
      }

      getNavigation(text, callback) {
        return html`
          <navigation-component
            .delimeter=${this.delimeter}
            .button=${{
              text,
              callback,
            }}
            .options=${Object.values(SEPARATOR_TYPES)}
            @onDelimeterChange=${this.onDelimeterChange}
          ></navigation-component>
        `;
      }
    }
);

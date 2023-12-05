import { html } from 'lit';
import { LionTextarea } from '@lion/ui/textarea.js';
import { Base } from '../../Base/Base.js';
import { HtmlCsvMixin } from '../../../mixins/HtmlCsvMixin.js';
import { setObjData } from '../../../redux/Actions.js';
import { csvStringToObj } from '../../../helpers/Parser.js';

export class Csv extends HtmlCsvMixin(Base) {
  constructor() {
    super();
    this.csvStringData = '';
    this.previousDelimeter = this.delimeter;
  }

  static properties = {
    csvStringData: { type: String },
  };

  static scopedElements = {
    ...super.scopedElements,
    'lion-textarea': LionTextarea,
  };

  get textarea() {
    return this.shadowRoot.querySelector('lion-textarea');
  }

  stateChanged(state) {
    if (this.csvStringData !== state.csvStringData) {
      this.csvStringData = state.csvStringData;
    }
  }

  callback() {
    if (!this.textarea.value) {
      window.alert('First, fill the form with data, that you want to convert.');
      return;
    }
    const value = this.checkSeparators();
    const parsedValue = csvStringToObj(value, this.delimeter);
    this.store.dispatch(setObjData(parsedValue));
  }

  getTextarea() {
    return html`
      <lion-textarea rows="6" .modelValue=${this.csvStringData}></lion-textarea>
    `;
  }

  render() {
    const navigation = this.getNavigation(
      'Transform to HTML >>',
      this.callback.bind(this)
    );
    const textarea = this.getTextarea();

    return [navigation, textarea];
  }
}

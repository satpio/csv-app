import { html } from 'lit';
import { Base } from '../../Base/Base.js';
import { HtmlCsvMixin } from '../../../mixins/HtmlCsvMixin.js';
import { Table } from '../../Shared/Table.js';
import { setCsvStringData } from '../../../redux/Actions.js';
import { objToCsvString } from '../../../helpers/Parser.js';

export class Html extends HtmlCsvMixin(Base) {
  constructor() {
    super();
    this.objData = {};
  }

  static properties = {
    objData: { type: Object },
  };

  static scopedElements = {
    ...super.scopedElements,
    'table-component': Table,
  };

  get table() {
    return this.shadowRoot.querySelector('table-component');
  }

  stateChanged(state) {
    const currentObjDataState = JSON.stringify(this.objData);
    const newobjDataState = JSON.stringify(state.objData);
    if (currentObjDataState !== newobjDataState) {
      this.objData = state.objData;
    }
  }

  getTable() {
    return html` <table-component .objData=${this.objData}></table-component> `;
  }

  callback() {
    const parsedValue = objToCsvString(this.table.objData, this.delimeter);
    this.store.dispatch(setCsvStringData(parsedValue));
  }

  render() {
    const navigation = this.getNavigation(
      'Transform to CSV <<',
      this.callback.bind(this)
    );
    const table = this.getTable();

    return [navigation, table];
  }
}

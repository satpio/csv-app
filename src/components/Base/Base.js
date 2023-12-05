import { LitElement } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/Store.js';
import { LionButton } from '@lion/ui/button.js';

export class Base extends connect(store)(ScopedElementsMixin(LitElement)) {
  static scopedElements = {
    'lion-button': LionButton,
  };

  get store() {
    return store;
  }
}

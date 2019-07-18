import { Component, define } from '../component';
import { Async } from '../core/fn/async';

export class Fixture extends Component {
  static create (template, data = {}) {
    const d = document.createElement('div');
    d.innerHTML = `<xin-fixture><template>${template}</template></xin-fixture>`;
    const fixture = d.firstElementChild;
    fixture.__fixtureInitialData = data;
    document.body.appendChild(fixture);

    // return as promised element because at v0 it wont be created yet!
    return new Promise(resolve => resolve(fixture));
  }

  attached () {
    super.attached();

    this.set(this.__fixtureInitialData);
    delete this.__fixtureInitialData;
    this.connected = true;

    // delay connected to make sure children is already connected
    this.async(() => this.fire('connected'));
  }

  detached () {
    super.detached();

    this.connected = false;
    this.fire('disconnected');
  }

  dispose () {
    this.parentElement.removeChild(this);
  }

  async waitConnected (timeout) {
    if (!this.connected) {
      await this.waitFor('connected');
    }

    await Async.sleep(timeout);
  }
}

define('xin-fixture', Fixture);

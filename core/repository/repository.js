const debug = require('debug')('xin::core');

export class Repository {
  constructor (data = {}) {
    if (debug.enabled) debug('Repository construct...');
    this.data = Object.assign({
      'customElements.version': 'v1',
    }, data);
  }

  update (data = {}) {
    if (debug.enabled) debug('Repository update data...');
    this.data = Object.assign(this.data, data);
  }

  get (id) {
    return this.data[id];
  }

  put (id, value) {
    if (value === undefined) {
      return this.remove(id);
    }
    this.data[id] = value;
  }

  remove (id) {
    delete this.data[id];
  }
}

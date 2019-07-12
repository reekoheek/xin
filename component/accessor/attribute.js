import { BaseAccessor } from './base';

export class AttributeAccessor extends BaseAccessor {
  static test (node, name) {
    return node.nodeType === window.Node.ELEMENT_NODE && name.endsWith('$');
  }

  constructor (node, name) {
    super(node, name.slice(0, -1));
  }

  set (value) {
    if (value) {
      if (value !== this.node.getAttribute(this.name)) {
        this.node.setAttribute(this.name, value);
      }
    } else {
      this.node.removeAttribute(this.name);
    }
  }

  get () {
    return this.node.getAttribute(this.name);
  }
}

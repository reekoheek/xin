const registry = {};

export class Filter {
  constructor (name, callback, otherArgs) {
    this.name = name;
    this.callback = callback;
    this.otherArgs = otherArgs;
  }

  invoke (val) {
    const args = [val];
    [].push.apply(args, this.otherArgs);
    return this.callback.apply(null, args);
  }

  static put (name, callback) {
    registry[name] = callback;
  }

  static get (name) {
    const segments = name.split(':');
    const args = segments.splice(1).join(':').split(',');
    const key = segments.pop();

    let callback = registry[key];
    if (typeof callback !== 'function') {
      try {
        callback = require(`./filters/${key}`).default;
      } catch (err) {
        // noop
      }
    }

    if (!callback) {
      throw new Error(`Filter "${name}" not found.`);
    }

    return new Filter(key, callback, args);
  }
}

# Component

## Create new component

Let say we want to create new component named `foo-bar`.
The component will be used inside web page as follows:

```html
<!DOCTYPE html>
<html lang="en">
<body>
  <foo-bar name="Ali"></foo-bar>
</body>
</html>
```

Which will produce page as follows:

```
Foobar: Hello Ali
```

Write lines below to new file named `foo-bar.js`.

```js
// import xin
import xin from xin;

// create new component class extend from xin.Component
class FooBar extends xin.Component {
  get template () {
    return `Foobar: Hello <span>{name}</span>`;
  }

  get props () {
    return Object.assign({}, super.props, {
      name: {
        type: String,
        value: 'Great Programmer',
      },
    });
  }
}

// define component class as foo-bar tag in html.
xin.define('foo-bar', FooBar);
```

## System Properties

Components can access several default system properties:

- `component.__app`
- `component.__global`
- `component.__setup`

## Put reference to model

```html
<foo-container id="container">
  <template>
    <foo-object id="theFoo" ref="foo"></foo-object>
  </template>
</foo-container>
```

```js
let container = document.getElementById('container');

if (container.foo === document.getElementById('theFoo')) {
  console.log('Reference OK');
}
```

## Misc

- .sprintf()
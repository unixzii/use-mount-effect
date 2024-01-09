# `useMountEffect`

[![npm version](https://badge.fury.io/js/use-mount-effect.svg)](https://badge.fury.io/js/use-mount-effect)

A React hook triggered only once on mount.

## Background

> Why does my effect run twice when the component mounts?? It's f\*\*king annoying!

Well. That is not a bug in React, actually it's by design according to the [doc](https://react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts):

> When Strict Mode is on, in development, React runs setup and cleanup one extra time before the actual setup.

There are some workarounds to solve this problem, but people still feel it's a hassle. That's why I made this.

## Install

```
npm install --save use-mount-effect
```

## Usage

Basic usage:

```js
import { useMountEffect } from "use-mount-effect";

const MyComponent = () => {
  useMountEffect(() => {
    // Do something only when the component mounts.
  });
  return <div>Blah blah blah</div>;
};
```

With cleanup:

```js
import { useMountEffect } from "use-mount-effect";

const MyComponent = () => {
  useMountEffect(() => {
    // Do something only when the component mounts.
    return () => {
      // Do something only when the component unmounts.
    };
  });
  return <div>Blah blah blah</div>;
};
```

## Notes

You should really fix your effects if you find your app works incorrectly due to the strict mode, because it implies some logic errors or resource leakage.

**Always use this hook with caution.**

## License

MIT

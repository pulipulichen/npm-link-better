# npm-link-better

[npm link] with extra features, such as:

* `--quick` to link without installing dependencies

* `--save` (/`--saveDev`/`Peer`/`Optional`) to save the linked dependency in your package.json.

* `--copy` to copy files individually instead of linking

Formerly [npm-link-quick], [npm-link-save], and [npm-link-copy] all now combined into this as a drop-in replacement.


## Install

```
npm install --global @pulipuli.chen/npm-link-better
```

## Usage

# Install dependencies from package.json
```
npm-link-better
# or
nls
```

# Link dependencies without download and install
```
npm-link-better --quick
# or
nlq
```

# Install dependency and link it
```
npm-link-better --save <dependency>
# or
nls <dependency>
```

# Copy dependency to local node_module
```
npm-link-better --copy <dependency>
# or
nlc <dependency>
```

[npm link]: https://docs.npmjs.com/cli/link.html
[npm-link-copy]: https://github.com/laggingreflex/npm-link-copy
[npm-link-quick]: https://github.com/laggingreflex/npm-link-quick
[npm-link-save]: https://github.com/laggingreflex/npm-link-save

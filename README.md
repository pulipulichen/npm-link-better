# npm-link-better

- Project: https://github.com/pulipulichen/npm-link-better
- Issues: https://github.com/pulipulichen/npm-link-better/issues
- NPM: https://www.npmjs.com/package/@pulipuli.chen/npm-link-better

[npm link] with extra features, such as:

* `--save` (/`--saveDev`/`Peer`/`Optional`) to save the linked dependency in your package.json.

* `--remove` to remove installing dependencies

* `--quick` to link without installing dependencies

* `--copy` to copy files individually instead of linking

Formerly [npm-link-quick], [npm-link-save], and [npm-link-copy] all now combined into this as a drop-in replacement.


## Install

```
npm install --global @pulipuli.chen/npm-link-better -g
npm update --global @pulipuli.chen/npm-link-better -g
```

## Usage

# Install dependencies from package.json
```
npm-link-better
# or
nls
```

# Install dependency and link it
```
npm-link-better --save <dependency>
# or
nls <dependency>
```

# Update dependency and link it again
```
npm-link-better --save <dependency> --update
# or
nls <dependency> -D
```

# Install dependency at specific version and link it
```
npm-link-better --save <dependency>@<version>
# or
nls <dependency>@<version>
```

# Remove dependency
```
npm-link-better --remove <dependency>
# or
nlr <dependency>
```

# Link dependencies without download and install
```
npm-link-better --quick
# or
nlq
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

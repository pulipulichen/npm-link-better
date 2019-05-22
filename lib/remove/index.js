const utils = require('../utils');

let remove = (argv) => {
  const deps = argv._;
  if (!deps.length) {
    throw new Error(`'remove' needs at least 1 dependency`);
  }
  const dependencyTypes = ['dependencies', 'devDependencies', 'optionalDependencies', 'bundleDependencies', 'peerDependencies'];
  const dependencyType =
    argv.saveDev ? 'devDependencies'
    : argv.saveOptional ? 'optionalDependencies'
    : argv.saveBundle ? 'bundleDependencies'
    : argv.savePeer ? 'peerDependencies'
    : 'dependencies';
  utils.removeDependency(deps, argv);
  const packageJson = utils.cwdPackageJson();
  
  for (const dep of deps) {
    let name = dep
	if (name.indexOf('@') > 0) {
		name = name.slice(0, name.indexOf('@'))
	}
    const override = { dependencyType };
    delete packageJson[override.dependencyType][name]
    packageJson[override.dependencyType] = utils.sortKeys(packageJson[override.dependencyType]);
  }

  utils.modifyJson('package.json', packageJson, { backup: false });
};

module.exports = remove

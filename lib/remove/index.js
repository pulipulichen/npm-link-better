const utils = require('../utils');

let remove = (argv) => {
  const deps = argv._;
  if (!deps.length) {
    throw new Error(`'remove' needs at least 1 dependency`);
  }
  const dependencyTypes = ['dependencies', 'devDependencies', 'optionalDependencies', 'bundleDependencies', 'peerDependencies'];
  utils.linkDependency(deps, argv);
  const packageJson = utils.cwdPackageJson();
  const dependencyType =
    argv.saveDev ? 'devDependencies'
    : argv.saveOptional ? 'optionalDependencies'
    : argv.saveBundle ? 'bundleDependencies'
    : argv.savePeer ? 'peerDependencies'
    : 'dependencies';
  packageJson[dependencyType] = packageJson[dependencyType] || {};
  for (const dep of deps) {
    let [{ name }] = utils.getDependencyPackageJson(dep);
    const override = { dependencyType, rangeOperator };
    delete packageJson[override.dependencyType][name]
    packageJson[override.dependencyType] = utils.sortKeys(packageJson[override.dependencyType]);
  }

  if (isInit === false) {
    utils.modifyJson('package.json', packageJson, { backup: false });
  }
};

module.exports = remove

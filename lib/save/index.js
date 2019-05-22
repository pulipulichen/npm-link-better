const utils = require('../utils');

let buildDeps = (json) => {
  let deps = []
  for (let key in json) {
    if (key === 'npm-link-better') {
      continue
    }
    let version = json[key]
    if (isNaN(version.slice(0, 1)) === false) {
      key = key + '@' + version
    }
    deps.push(key)
  }
  return deps
}

let save = (argv) => {
  const deps = argv._;
  if (!deps.length) {
    let throwException = true

    let pjson = require(process.cwd() + '/package.json');
    let dependencies = pjson.dependencies
    if (dependencies !== undefined) {
      let argvInit = {}
      argvInit._ = buildDeps(dependencies)
      argvInit.init = true
      if (argvInit._.length > 0) {
        save(argvInit)
        throwException = false
      }
    }

    let devDependencies = pjson.devDependencies
    if (devDependencies !== undefined) {
      let argvInit = {}
      argvInit._ = buildDeps(devDependencies)
      argvInit.saveDev = true
      argvInit.init = true
      if (argvInit._.length > 0) {
        save(argvInit)
        throwException = false
      }
    }

    let optionalDependencies = pjson.optionalDependencies
    if (optionalDependencies !== undefined) {
      let argvInit = {}
      argvInit._ = buildDeps(optionalDependencies)
      argvInit.saveOptional = true
      argvInit.init = true
      if (argvInit._.length > 0) {
        save(argvInit)
        throwException = false
      }
    }

    let bundleDependencies = pjson.bundleDependencies
    if (bundleDependencies !== undefined) {
      let argvInit = {}
      argvInit._ = buildDeps(bundleDependencies)
      argvInit.saveBundle = true
      argvInit.init = true
      if (argvInit._.length > 0) {
        save(argvInit)
        throwException = false
      }
    }

    let peerDependencies = pjson.peerDependencies
    if (peerDependencies !== undefined) {
      let argvInit = {}
      argvInit._ = buildDeps(peerDependencies)
      argvInit.savePeer = true
      argvInit.init = true
      if (argvInit._.length > 0) {
        save(argvInit)
        throwException = false
      }
    }

    if (throwException === true) {
      throw new Error(`'save' needs at least 1 dependency`);
    }
    else {
      return
    }
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
  const isInit = argv.init ? true: false;
  const rangeOperator = argv.saveExact ? '' : '^';
  packageJson[dependencyType] = packageJson[dependencyType] || {};
  const changes = [];
  for (const dep of deps) {
    let [{ name, version }] = utils.getDependencyPackageJson(dep);
    const override = { dependencyType, rangeOperator };

    let oldVersion = packageJson[override.dependencyType][name] || null;
    for (const dependencyType_ of dependencyTypes) {
      if (!packageJson[dependencyType_]) continue;
      if (packageJson[dependencyType_][name]) {
        oldVersion = packageJson[dependencyType_][name];
        delete packageJson[dependencyType_][name];
        if (dependencyType === 'dependencies') {
          override.dependencyType = dependencyType_;
        }
      }
    }

    let newVersion
    if (dep.indexOf('@') > -1) {
      version = dep.slice(dep.indexOf('@') + 1)
      newVersion = packageJson[override.dependencyType][name] = version;
    }
    else {
      newVersion = packageJson[override.dependencyType][name] = override.rangeOperator + version;
    }

    const versionChanged = oldVersion !== newVersion;
    const dependencyTypeChanged = override.dependencyType !== dependencyType;

    if (versionChanged || dependencyTypeChanged) {
      changes.push({ ...override, name, versionChanged, oldVersion, newVersion, dependencyTypeChanged });
    }
    packageJson[override.dependencyType] = utils.sortKeys(packageJson[override.dependencyType]);
  }

  if (isInit === false) {
    utils.modifyJson('package.json', packageJson, { backup: false });
  }
};

module.exports = save

/**
 * Created by altair on 23.03.17.
 */


function buildConfig(env) {
    return require('./conf/' + env + '.js')(env)
}

module.exports = buildConfig;
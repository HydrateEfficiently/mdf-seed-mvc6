(function () {
    'use strict';

    let rimraf = require('rimraf');
    let nodegit = require('nodegit');

    module.exports = function initialize(projectName) {
        console.log('initializing new git directory');
        rimraf.sync(`${projectName}/.git`);

        let projectDir = `${process.cwd()}/${projectName}`;
        return nodegit.Repository.init(projectDir);
    };

} ());
#!/usr/bin/env node
(function () {
    'use strict';

    let clone = require('./src/clone');
    let rename = require('./src/rename');
    let initialize = require('./src/initialize');

    let program = require('commander');

    program
        .arguments('<project-name> <ng-namespace-prefix>')
        .action(main)
        .parse(process.argv);

    //main("VegeRun", "vgn");

    function main(projectName, ngNamespacePrefix) {
        console.log(`project-name: ${projectName}`);
        console.log(`ng-namespace-prefix: ${ngNamespacePrefix}`);
        clone().then(() => {
            rename('MVC6.Seed.V1', projectName, ngNamespacePrefix);
            initialize(projectName);
        });
    }

} ());
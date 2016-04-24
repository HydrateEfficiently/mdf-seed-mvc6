(function () {
    'use strict';

    let nodegit = require('nodegit');

    module.exports = function clone() {
        console.log('start clone of MVC6.Seed.V1');
        return nodegit.Clone('https://github.com/HydrateEfficiently/MVC6.Seed.V1.git', 'MVC6.Seed.V1', { bare: true })
            .then(repository => {
                console.log('finished clone of MVC6.Seed.V1');
                return repository;
            });
    };

} ());
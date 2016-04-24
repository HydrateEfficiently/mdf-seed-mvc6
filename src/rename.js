(function () {
    'use strict';
    
    const ProjectNamePlaceholder = 'MVC6.Seed.V1';
    const ColonCaseProjectNamePlaceholder = 'mvc6:seed:v1';
    const NgNamespacePrefixLowerPlaceholder = 'ng_namespace_prefix_lower_';
    const NgNamespacePrefixUpperPlaceholder = "ng_namespace_prefix_upper_";

    let fs = require('fs');
    let path = require('path');
    let replace = require('replace');

    module.exports = function rename(directory, projectName, ngNamespacePrefix) {
        console.log("started batch find and replace");

        if (!projectName) {
            throw "project name is required";
        }
        let colonCaseProjectName = projectName.toLowerCase().replace('.', ':');
        if (!ngNamespacePrefix) {
            throw "ng namespace prefix is required";
        }
        let ngNamespacePrefixUpper = ngNamespacePrefix.charAt(0).toUpperCase() + ngNamespacePrefix.slice(1);

        let rootPath = `${process.cwd()}/${directory}`;
        let newRootPath = `${process.cwd()}/${projectName}`;

        function renameAllFiles(dir, findStr, replaceStr) {
            let files = fs.readdirSync(dir);
            files.forEach(fileName => {
                let path = `${dir}/${fileName}`;
                let newPath = path.replace(findStr, replaceStr);
                if (path !== newPath) {
                    fs.renameSync(path, newPath);
                }

                let file = fs.statSync(newPath);
                if (file.isDirectory()) {
                    renameAllFiles(newPath, findStr, replaceStr);
                }
            });
        }
        fs.renameSync(rootPath, newRootPath);
        renameAllFiles(newRootPath, ProjectNamePlaceholder, projectName);

        function findAndReplace(dir, findStr, replaceStr) {
            replace({
                regex: findStr,
                replacement: replaceStr,
                paths: [dir],
                recursive: true,
                silent: true
            });
        }
        findAndReplace(newRootPath, ProjectNamePlaceholder, projectName);
        findAndReplace(newRootPath, ColonCaseProjectNamePlaceholder, colonCaseProjectName);
        findAndReplace(newRootPath, NgNamespacePrefixLowerPlaceholder, ngNamespacePrefix);
        findAndReplace(newRootPath, NgNamespacePrefixUpperPlaceholder, ngNamespacePrefixUpper);

        console.log("finished batch find and replace");
    };

} ());
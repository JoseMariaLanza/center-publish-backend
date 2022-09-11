const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');


class CreateAppCommand {

    constructor() {
        // if (!this.flagValidation()) {
        //     return 0;
        // }

        const filePath = this.getSourceFilePath();

        this.makeDirectory(filePath);

        const contents = this.getSourceFile();

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, contents);
            console.log('Created!!')
        } else {
            console.log('Replaced!!')
        }
        return 0;
    }

    // TODO: args validation
    flagValidation() {
        if (process.argv[2] && process.argv[2] === '--appname') {
            console.log('Flag is present.');
            console.log('Flag: ', process.argv[4]);
        } else {
            console.log('App name is mandatory!');
            return false;
        }
        if (process.argv[3] && process.argv[3] === '--modulename') {
            console.log('Flag is present.');
            console.log('Flag: ', process.argv[5]);
        } else {
            console.log('Module name is mandatory!');
            return false;
        }
        return true;
    }

    getSourceFilePath() {
        const appName = process.argv[4][0]/* .toUpperCase() */ + process.argv[4].substring(1);
        const moduleName = process.argv[5][0] /* .toUpperCase() */ + process.argv[5].substring(1);

        return (path.basename(appName) + '\\' + moduleName + '\\' + 'Domain' + '\\' +
            'Services' + '\\' + this.getSingularClassName(moduleName) + 'Service.js');
    }

    makeDirectory(path) {
        const pathArray = path.split('\\');
        const pathString = pathArray.splice(0, pathArray.length - 1).join('\\');

        if (!fs.existsSync(pathString)) {
            fs.mkdirSync(pathString, { recursive: true });
        }
    }

    getSourceFile() {
        return this.getTemplateContent(this.getTemplatePath('service'), this.getTemplateVariables());
    }

    getSingularClassName(name) {
        const nameInSingular = pluralize.singular(name);
        return nameInSingular[0].toUpperCase() + nameInSingular.substring(1);
    }

    // Stub path
    getTemplatePath(classTemplate) {
        const templatesDir = path.basename(path.dirname('bin/templates'));
        return path.join(templatesDir, `templates/${classTemplate}`);
    }

    getTemplateVariables() {
        return {
            className: this.getSingularClassName(process.argv[5]),
        }
    }

    getTemplateContent(template, templateVariables = {}) {
        const data = fs.readFileSync(template, 'utf8');
        let content = '';

        for (const search in templateVariables) {
            const element = templateVariables[search];
            console.log('ELEMENT: ', element);
            content = data.toString().replaceAll(`{{ ${search} }}`, element);
        }

        return content;

    }
}

module.exports = new CreateAppCommand();
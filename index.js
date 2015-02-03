var esprima = require('esprima'),
    escodegen = require('escodegen'),
    astral = require('astral')();

require('astral-angular-annotate')(astral);

module.exports = function (content, file, conf) {
    if (file.isJsLike && file.isAngular) {
        var ast = esprima.parse(content, {
            tolerant: true
        });

        astral.run(ast);

        return escodegen.generate(ast, {
            format: {
                indent: {
                    style: '  '
                }
            }
        });
    } else {
        return content;
    }
};
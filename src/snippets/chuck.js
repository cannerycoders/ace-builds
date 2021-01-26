// snippets for ChucK language
//
define("ace/snippets/chuck", ["require", "exports", "module"],
    function(require, exports, module)
    {
        "use strict";

        exports.snippetText = `// hello, world`;
        exports.scope = "ck";

    });

(function()
{
    window.require(["ace/snippets/chuck"], function(m)
    {
        if(typeof module == "object" && typeof exports == "object" && module)
        {
            module.exports = m;
        }
    });
})();
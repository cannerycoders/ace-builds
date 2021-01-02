let codebgd = "#141414";
let codecolor = "#ccc";
let inviscolor = "#181818";
let activebgd = "#202020";
let selectcolor = "#832563";
let commentcolor = "#888";
let k1color = "#ff7b72"; // keyword
let k2color = "#cc2372"; // storage
let k3color = "#EBDAB4"; // oeprator
let c1color = "#79c0ff"; // constant
let c2color = "#79c0ff"; // constant
let strcolor = "#3c66e2";
let v1color = "#fb8764";
let v2color = "#0099cd";
let fcolor = "#0099cd";
let gutterbgd = "#090909";
let gutterselect = "#181818";
let guttercolor = "#aaa";

define("ace/theme/githubdark", ["require", "exports", "module", "ace/lib/dom"], function(require, exports, module)
{
    exports.isDark = true;
    exports.cssClass = "ace-githubdark";
    exports.cssText = `
.ace-githubdark .ace_gutter-active-line {
background-color: ${gutterselect};
}
.ace-githubdark .ace_gutter {
background: ${gutterbgd};
color: ${guttercolor};
}
.ace-githubdark {
color: ${codecolor};
background-color: ${codebgd};
}
.ace-githubdark .ace_invisible {
color: ${inviscolor};
}
.ace-githubdark .ace_marker-layer .ace_selection {
background: ${selectcolor};
}
.ace-githubdark.ace_multiselect .ace_selection.ace_start {
box-shadow: 0 0 3px 0px #002240;
}
.ace-githubdark .ace_keyword {
color: ${k1color};
}
.ace-githubdark .ace_comment {
font-style: italic;
color: ${commentcolor};
}
.ace-githubdark .ace-statement {
color: red;
}
.ace-githubdark .ace_variable {
color: ${v1color};
}
.ace-githubdark .ace_variable.ace_language {
color: ${v2color};
}
.ace-githubdark .ace_constant {
color: ${c1color};
}
.ace-githubdark .ace_constant.ace_language {
color: ${c2color};
}
.ace-githubdark .ace_constant.ace_numeric {
color: ${c1color};
}
.ace-githubdark .ace_string {
color: ${strcolor};
}
.ace-githubdark .ace_support {
color: ${c1color};
}
.ace-githubdark .ace_support.ace_function {
color: ${fcolor};
}
.ace-githubdark .ace_storage {
color: ${k2color};
}
.ace-githubdark .ace_keyword.ace_operator {
color: ${k3color};
}
.ace-githubdark .ace_punctuation.ace_operator {
color: yellow;
}
.ace-githubdark .ace_marker-layer .ace_active-line {
background: ${activebgd}; 
}
.ace-githubdark .ace_marker-layer .ace_selected-word {
border-radius: 4px;
border: 8px solid ${selectcolor};
}
.ace-githubdark .ace_print-margin {
width: 5px;
background: #3C3836;
}
.ace-githubdark .ace_indent-guide {
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNQUFD4z6Crq/sfAAuYAuYl+7lfAAAAAElFTkSuQmCC\") right repeat-y;
}`;

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});
(function()
{
    window.require(["ace/theme/githubdark"], function(m)
    {
        if(typeof module == "object" && typeof exports == "object" && module)
        {
            module.exports = m;
        }
    });
})();
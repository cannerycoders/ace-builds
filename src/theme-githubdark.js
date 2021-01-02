define("ace/theme/githubdark", ["require", "exports", "module", "ace/lib/dom"], function(require, exports, module)
{

    exports.isDark = true;
    exports.cssClass = "ace-githubdark";
    exports.cssText = "\
.ace-githubdark .ace_gutter {\
background: #fbfcfd;\
color: rgb(127,130,132);\
}\
.ace-githubdark  {\
background: #20272b;\
color: #dddddd;\
}\
.ace-githubdark .ace_keyword {\
font-weight: bold;\
}\
.ace-githubdark .ace_string {\
color: #3c66e2;\
}\
.ace-githubdark .ace_variable.ace_class {\
color: #cc2372;\
}\
.ace-githubdark .ace_constant.ace_numeric {\
color: #3c66e2;\
}\
.ace-githubdark .ace_constant.ace_buildin {\
color: #3c66e2;\
}\
.ace-githubdark .ace_support.ace_function {\
color: #0086B3;\
}\
.ace-githubdark .ace_comment {\
color: #3c66e2;\
font-style: italic;\
}\
.ace-githubdark .ace_variable.ace_language  {\
color: #0086B3;\
}\
.ace-githubdark .ace_paren {\
font-weight: bold;\
}\
.ace-githubdark .ace_boolean {\
font-weight: bold;\
}\
.ace-githubdark .ace_string.ace_regexp {\
color: #009926;\
font-weight: normal;\
}\
.ace-githubdark .ace_variable.ace_instance {\
color: teal;\
}\
.ace-githubdark .ace_constant.ace_language {\
font-weight: bold;\
}\
.ace-githubdark .ace_cursor {\
color: black;\
}\
.ace-githubdark.ace_focus .ace_marker-layer .ace_active-line {\
background: #464a4d;\
}\
.ace-githubdark .ace_marker-layer .ace_active-line {\
background: #464a4d;\
}\
.ace-githubdark .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-githubdark.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px white;\
}\
.ace-githubdark.ace_nobold .ace_line > span {\
font-weight: normal !important;\
}\
.ace-github .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
.ace-github .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
.ace-github .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-github .ace_gutter-active-line {\
background-color : rgba(0, 0, 0, 0.07);\
}\
.ace-github .ace_marker-layer .ace_selected-word {\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
}\
.ace-github .ace_invisible {\
color: #BFBFBF\
}\
.ace-github .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-github .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}";

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
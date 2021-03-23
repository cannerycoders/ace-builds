define("ace/mode/doc_comment_highlight_rules",
    ["require", "exports", "module", "ace/lib/oop",
     "ace/mode/text_highlight_rules"],
    function(require, exports, module)
    {
        "use strict";

        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        var DocCommentHighlightRules = function()
        {
            this.$rules = {
                "start": [
                    {
                        token: "comment.doc.tag",
                        regex: "@[\\w\\d_]+" // TODO: fix email addresses
            },
            DocCommentHighlightRules.getTagRule(),
                    {
                        defaultToken: "comment.doc",
                        caseInsensitive: true
            }]
            };
        };

        oop.inherits(DocCommentHighlightRules, TextHighlightRules);

        DocCommentHighlightRules.getTagRule = function(start)
        {
            return {
                token: "comment.doc.tag.storage.type",
                regex: "\\b(?:TODO|FIXME|XXX|HACK|NB)\\b"
            };
        };

        DocCommentHighlightRules.getStartRule = function(start)
        {
            return {
                token: "comment.doc", // doc comment
                regex: "\\/\\*(?=\\*)",
                next: start
            };
        };

        DocCommentHighlightRules.getEndRule = function(start)
        {
            return {
                token: "comment.doc", // closing comment
                regex: "\\*\\/",
                next: start
            };
        };

        exports.DocCommentHighlightRules = DocCommentHighlightRules;
    });

// code highlighting 
define("ace/mode/chuck_highlight_rules",
    ["require", "exports", "module", "ace/lib/oop",
     "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"
    ],
    function(require, exports, module)
    {
        "use strict";

        var oop = require("../lib/oop");
        var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
        var chuckHighlightRules = function()
        {
            var keywordControls = (
                "break|continue|do|else|for|if|" +
                "return|while|until|repeat|spork"
            );

            var storageType = (
                "string|float|int|dur|time|complex|polar|vec3|vec4|void|class|fun|function"
            );

            var storageModifiers = (
                "extern|public|private|new|extends"
            );

            var keywordOperators = "static";
            //"and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|" +
            //"const_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace"

            var builtinConstants = (
                // see chuck_type.cpp
                "null|NULL|true|false|maybe|pi|chout|cherr|global|t_zero|d_zero" +
                "|samp|ms|second|minute|hour|day|week"
                // "NULL|true|false|TRUE|FALSE|nullptr"
            );

            var languageVars = (
                "this|me|now|dac|adc|blackhole"
            );

            var stdFunctions = exports.stdFunctions = "\\b(" +
                "?:Math|Std|Event|Machine|Shred|RegEx|Object|UGen|UGen(?:Multi|Stereo)" +
                "|Osc|UAna|UAna(?:Blob)|Windowing" +
                "|Chugraph2|Chugraph|Chugen" +
                "|Mix2|Pan2|Gain|Impulse|Step|Noise" +

                "|Phasor|SinOsc|TriOsc|SawOsc|SqrOsc|PulseOsc|SndBuf[2]?" +
                "|HalfRect|FullRect" +

                "|FilterBasic|BPF|BRF|LPF|HPF|ResonZ|BiQuad" +
                "|OnePole|TwoPole|OneZero|TwoZero|PoleZero" +

                "|LiSa|Dyno|CNoise|Gen(?:X|5|7|10|17)" +
                "|CurveTable|WarpTable" +

                "|ADSR|Envelope|Delay|Delay(?:L|A)|Echo|JCRev|NRev" +
                "|PRCRev|Chorus|Modulate|PitShift|SubNoise|BLT|Blit" +
                "|BlitSaw|BlitSquare|WvIn|WaveLoop|WvOut|StkInstrument" +
                "|BandedWG|BlowBotl|BlowHole|Bowed|Brass|Clarinet" +
                "|Flute|Mandolin|ModalBar|Moog|Saxofony|Shakers|Sitar" +
                "|StifKarp|VoicForm|FM|BeeThree|FMVoices|HevyMetl" +
                "|PercFlut|Rhodey|TubeBell|Wurley" +

                "|ABSaturator|AmbPan3|Bitcrusher|ExpDelay|ExpEnv|Elliptic|Faust" +
                "|FIR|FluidSynth|FoldbackSaturator|GVerb|KasFilter|Ladspa" +
                "|MagicSine|Mesh2D|MIAP|NHHall|PanN|Perlin|PitchTrack" +
                "|PowerADSR|Random|Sigmund|Spectacle|Wavetable|WinFuncEnv" +
                "|WPDiodeLadder|WPKorg35" +

                "|IO|FileIO|StdOut|StdErr|OscIn|OscOut|OscMsg|Hid|HidMsg" +
                "|SerialIO|Midi(:?In|Out|Msg|FileIn)" +

                "|FFT|IFFT|DCT|IDCT|Centroid|Flux|RMS|RollOff|ZeroX|Flip" +
                "|pilF|FeatureCollector" +

                ")\\b";

            var keywordMapper = this.$keywords = this.createKeywordMapper(
            {
                "keyword.control": keywordControls,
                "storage.type": storageType,
                "storage.modifier": storageModifiers,
                "keyword.operator": keywordOperators,
                "variable.language": languageVars,
                "constant.language": builtinConstants
            }, "identifier");

            var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";
            var escapeRe = /\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source;

            // format / sprint statement inspection XXX
            var formatRe = "%" +
                /(\d+\$)?/.source // field (argument #)
                +
                /[#0\- +']*/.source // flags
                +
                /[,;:_]?/.source // separator character (AltiVec)
                +
                /((-?\d+)|\*(-?\d+\$)?)?/.source // minimum field width
                +
                /(\.((-?\d+)|\*(-?\d+\$)?)?)?/.source // precision
                +
                /(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)?/.source // length modifier
                +
                /(\[[^"\]]+\]|[diouxXDOUeEfFgGaACcSspn%])/.source; // conversion type

            this.$rules = {
                "start": [
                    {
                        token: "comment",
                        regex: "//$",
                        next: "start"
                    },
                    {
                        token: "comment",
                        regex: "//",
                        next: "singleLineComment"
                    },
                    DocCommentHighlightRules.getStartRule("doc-start"),
                    {
                        token: "comment", // multi line comment
                        regex: "\\/\\*",
                        next: "comment"
                    },
                    {
                        token: "string", // character
                        regex: "'(?:" + escapeRe + "|.)?'"
                    },
                    {
                        token: "string.start",
                        regex: '"',
                        stateName: "qqstring",
                        next: [
                            { token: "string", regex: /\\\s*$/, next: "qqstring" },
                            { token: "constant.language.escape", regex: escapeRe },
                            { token: "constant.language.escape", regex: formatRe },
                            { token: "string.end", regex: '"|$', next: "start" },
                            { defaultToken: "string" }
                        ]
                    },
                    {
                        /* no raw strings */
                        token: "string.start",
                        regex: 'R"\\(',
                        stateName: "rawString",
                        next: [
                            { token: "string.end", regex: '\\)"', next: "start" },
                            { defaultToken: "string" }
                        ]
                    },
                    {
                        token: "constant.numeric", // hex
                        regex: "0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
                    },
                    {
                        token: "constant.numeric", // float
                        regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
                    },
                    // no #include, #define, #endif, etc
                    {
                        token: "support.function.ck",
                        regex: stdFunctions
                    },
                    {
                        token: keywordMapper,
                        regex: "[a-zA-Z_$][a-zA-Z0-9_$]*"
                    },
                    {
                        token: "keyword.operator",
                        // cpp: /--|\+\+|<<=|>>=|>>>=|<>|&&|\|\||\?:|[*%\/+\-&\^|~!<>=]=?/
                        // multi-char should precede single-char
                        regex: /<<<|>>>|--|\+\+|@=>|\+=>|-=>|\*=>|\/=>|&=>|\|=>|\^=>|>>=>|<<=>|%=>|@@|->|<-|&&|\|\||[*%\/+\-&\^|~!<>=\$]=?/
                    },
                    {
                        token: "punctuation.operator",
                        regex: "\\?|\\,|\\;|\\." // migrated |\\:|
                    },
                    {
                        token: "paren.lparen",
                        regex: "[[({]"
                    },
                    {
                        token: "paren.rparen",
                        regex: "[\\])}]"
                    },
                    {
                        token: "text",
                        regex: "\\s+"
                    }
                ],
                "comment": [
                    {
                        token: "comment", // closing comment
                        regex: "\\*\\/",
                        next: "start"
                    },
                    {
                        defaultToken: "comment"
                    }
                ],
                "singleLineComment": [
                    {
                        token: "comment",
                        regex: /\\$/,
                        next: "singleLineComment"
                    },
                    {
                        token: "comment",
                        regex: /$/,
                        next: "start"
                    },
                    {
                        defaultToken: "comment"
                    }
                ],
                "directive": [
                    {
                        token: "constant.other.multiline",
                        regex: /\\/
                    },
                    {
                        token: "constant.other.multiline",
                        regex: /.*\\/
                    },
                    {
                        token: "constant.other",
                        regex: "\\s*<.+?>",
                        next: "start"
                    },
                    {
                        token: "constant.other", // single line
                        regex: '\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',
                        next: "start"
                    },
                    {
                        token: "constant.other", // single line
                        regex: "\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",
                        next: "start"
                    },
                    {
                        token: "constant.other",
                        regex: /[^\\\/]+/,
                        next: "start"
                    }
                ]
            };

            this.embedRules(DocCommentHighlightRules, "doc-",
            [DocCommentHighlightRules.getEndRule("start")]);
            this.normalizeRules();
        };

        oop.inherits(chuckHighlightRules, TextHighlightRules);

        exports.chuckHighlightRules = chuckHighlightRules;
    });

// code blocks
define("ace/mode/matching_brace_outdent",
    ["require", "exports", "module", "ace/range"],
    function(require, exports, module)
    {
        "use strict";

        var Range = require("../range").Range;

        var MatchingBraceOutdent = function() {};

        (function()
        {

            this.checkOutdent = function(line, input)
            {
                if(!/^\s+$/.test(line))
                    return false;

                // { brace match
                return /^\s*\}/.test(input);
            };

            this.autoOutdent = function(doc, row)
            {
                var line = doc.getLine(row);
                // { brace match
                var match = line.match(/^(\s*\})/);

                if(!match) return 0;

                var column = match[1].length;
                var openBracePos = doc.findMatchingBracket({ row: row, column: column });

                if(!openBracePos || openBracePos.row == row) return 0;

                var indent = this.$getIndent(doc.getLine(openBracePos.row));
                doc.replace(new Range(row, 0, row, column - 1), indent);
            };

            this.$getIndent = function(line)
            {
                return line.match(/^\s*/)[0];
            };

        }).call(MatchingBraceOutdent.prototype);

        exports.MatchingBraceOutdent = MatchingBraceOutdent;
    });

define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(require, exports, module)
{
    "use strict";

    var oop = require("../../lib/oop");
    var Range = require("../../range").Range;
    var BaseFoldMode = require("./fold_mode").FoldMode;

    var FoldMode = exports.FoldMode = function(commentRegex)
    {
        if(commentRegex)
        {
            this.foldingStartMarker = new RegExp(
                this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
            );
            this.foldingStopMarker = new RegExp(
                this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
            );
        }
    };
    oop.inherits(FoldMode, BaseFoldMode);

    (function()
    {

        this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
        this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
        this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
        this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
        this._getFoldWidgetBase = this.getFoldWidget;
        this.getFoldWidget = function(session, foldStyle, row)
        {
            var line = session.getLine(row);

            if(this.singleLineBlockCommentRe.test(line))
            {
                if(!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                    return "";
            }

            var fw = this._getFoldWidgetBase(session, foldStyle, row);

            if(!fw && this.startRegionRe.test(line))
                return "start"; // lineCommentRegionStart

            return fw;
        };

        this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline)
        {
            var line = session.getLine(row);

            if(this.startRegionRe.test(line))
                return this.getCommentRegionBlock(session, line, row);

            var match = line.match(this.foldingStartMarker);
            if(match)
            {
                var i = match.index;

                if(match[1])
                    return this.openingBracketBlock(session, match[1], row, i);

                var range = session.getCommentFoldRange(row, i + match[0].length, 1);

                if(range && !range.isMultiLine())
                {
                    if(forceMultiline)
                    {
                        range = this.getSectionRange(session, row);
                    }
                    else if(foldStyle != "all")
                        range = null;
                }

                return range;
            }

            if(foldStyle === "markbegin")
                return;

            var match = line.match(this.foldingStopMarker);
            if(match)
            {
                var i = match.index + match[0].length;

                if(match[1])
                    return this.closingBracketBlock(session, match[1], row, i);

                return session.getCommentFoldRange(row, i, -1);
            }
        };

        this.getSectionRange = function(session, row)
        {
            var line = session.getLine(row);
            var startIndent = line.search(/\S/);
            var startRow = row;
            var startColumn = line.length;
            row = row + 1;
            var endRow = row;
            var maxRow = session.getLength();
            while(++row < maxRow)
            {
                line = session.getLine(row);
                var indent = line.search(/\S/);
                if(indent === -1)
                    continue;
                if(startIndent > indent)
                    break;
                var subRange = this.getFoldWidgetRange(session, "all", row);

                if(subRange)
                {
                    if(subRange.start.row <= startRow)
                    {
                        break;
                    }
                    else if(subRange.isMultiLine())
                    {
                        row = subRange.end.row;
                    }
                    else if(startIndent == indent)
                    {
                        break;
                    }
                }
                endRow = row;
            }

            return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
        };
        this.getCommentRegionBlock = function(session, line, row)
        {
            var startColumn = line.search(/\s*$/);
            var maxRow = session.getLength();
            var startRow = row;

            var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
            var depth = 1;
            while(++row < maxRow)
            {
                line = session.getLine(row);
                var m = re.exec(line);
                if(!m) continue;
                if(m[1]) depth--;
                else depth++;

                if(!depth) break;
            }

            var endRow = row;
            if(endRow > startRow)
            {
                return new Range(startRow, startColumn, endRow, line.length);
            }
        };

    }).call(FoldMode.prototype);

});

define("ace/mode/chuck", ["require", "exports", "module", "ace/lib/oop",
    "ace/mode/text", "ace/mode/chuck_highlight_rules",
    "ace/mode/matching_brace_outdent", "ace/range",
    "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"],
    function(require, exports, module)
    {
        "use strict";

        var oop = require("../lib/oop");
        var TextMode = require("./text").Mode;
        var chuckHighlightRules = require("./chuck_highlight_rules").chuckHighlightRules;
        var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
        var Range = require("../range").Range; //unused
        var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
        var CStyleFoldMode = require("./folding/cstyle").FoldMode;

        var Mode = function()
        {
            this.HighlightRules = chuckHighlightRules;
            this.$outdent = new MatchingBraceOutdent();
            this.$behaviour = new CstyleBehaviour();
            this.foldingRules = new CStyleFoldMode();
        };
        oop.inherits(Mode, TextMode);

        (function()
        {

            this.lineCommentStart = "//";
            this.blockComment = { start: "/*", end: "*/" };

            this.getNextLineIndent = function(state, line, tab)
            {
                var indent = this.$getIndent(line);

                var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
                var tokens = tokenizedLine.tokens;
                var endState = tokenizedLine.state;

                if(tokens.length && tokens[tokens.length - 1].type == "comment")
                {
                    return indent;
                }

                if(state == "start")
                {
                    var match = line.match(/^.*[\{\(\[]\s*$/); // }) // match
                    if(match)
                    {
                        indent += tab;
                    }
                }
                else if(state == "doc-start")
                {
                    if(endState == "start")
                    {
                        return "";
                    }
                    //  line match
                    var match = line.match(/^\s*(\/?)\*/);
                    if(match)
                    {
                        if(match[1])
                        {
                            indent += " ";
                        }
                        indent += "* ";
                    }
                }

                return indent;
            };

            this.checkOutdent = function(state, line, input)
            {
                return this.$outdent.checkOutdent(line, input);
            };

            this.autoOutdent = function(state, doc, row)
            {
                this.$outdent.autoOutdent(doc, row);
            };

            this.$id = "ace/mode/chuck";
            this.snippetFileId = "ace/snippets/chuck";
        }).call(Mode.prototype); // anonymouse function 

        exports.Mode = Mode;
    });

(function()
{
    window.require(["ace/mode/chuck"], function(m)
    {
        if(typeof module == "object" && typeof exports == "object" && module)
        {
            module.exports = m;
        }
    });
})();

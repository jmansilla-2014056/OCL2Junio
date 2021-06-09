/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var xml_descendente = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,12],$V1=[1,15],$V2=[7,10,13],$V3=[1,21],$V4=[1,30],$V5=[1,31],$V6=[7,10,11,13],$V7=[1,40],$V8=[1,42],$V9=[1,41],$Va=[6,11,26,28];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"encoding":4,"etiqueta":5,"INI":6,"INTERROGAC":7,"XML":8,"lista_atributos":9,"FIN":10,"ID":11,"lista_nodos":12,"CIERRE":13,"EOF":14,"error_sintactio":15,"tipo_error_sinc":16,"nodo":17,"opcion_nodo":18,"cierre_nodo":19,"cuerpo_nodo":20,"lista_valor":21,"atributos":22,"IGUAL":23,"valor":24,"CADENA":25,"NUM":26,"tipo_valor":27,"ID2":28,"$accept":0,"$end":1},
terminals_: {2:"error",6:"INI",7:"INTERROGAC",8:"XML",10:"FIN",11:"ID",13:"CIERRE",14:"EOF",23:"IGUAL",25:"CADENA",26:"NUM",28:"ID2"},
productions_: [0,[3,2],[4,6],[5,9],[15,2],[16,1],[16,3],[16,1],[12,2],[12,1],[17,3],[18,1],[18,2],[19,2],[19,2],[20,5],[20,5],[20,1],[9,2],[9,1],[22,3],[24,1],[24,1],[21,2],[21,1],[27,1],[27,1],[27,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

                  let auxReportG = reportG;
                  reportG = [];
                  this.$ = { "encoding": $$[$0-1], "etiqueta": $$[$0], "reportG": auxReportG};
                  return this.$ 
                
break;
case 2:

                  this.$ = new nodo_xml.default("encoding",$$[$0-2],"",[],_$[$0-5].first_line,_$[$0-5].first_column,null);
                  reportG.push(new gramatic.default("encoding : INI INTERROGAC XML lista_atributos INTERROGAC FIN","{ encoding.val = new nodo_xml.defaul('encoding',lista_atributos.val,'',[])}"));
                
break;
case 3:
 
                  this.$ = new nodo_xml.default($$[$0-7],[],"",$$[$0-5],_$[$0-8].first_line,_$[$0-8].first_column,$$[$0-2]);
                  var inicio_ = new ast_nodo.default("inicio","");
                  inicio_.InsertarUnNodo("INI", $$[$0-8]);
                  inicio_.InsertarUnNodo("ID", $$[$0-7]);
                  inicio_.InsertarUnNodo("FIN", $$[$0-6]);
                  inicio_.InsertarHijo(lista_nodos_);
                  inicio_.InsertarUnNodo("INI", $$[$0-4]);
                  inicio_.InsertarUnNodo("CIERRE", $$[$0-3]);
                  inicio_.InsertarUnNodo("ID", $$[$0-2]);
                  reportG.push(new gramatic.default("etiqueta : INI ID FIN lista_nodos INI CIERRE ID FIN","{ etiqueta.val = new nodo_xml.defaul(ID.valLex,[],'',lista_nodos.val)}"));
                
break;
case 5: case 6: case 7:
 rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) 
break;
case 8:
 
                    this.$ = $$[$0-1];
                    this.$.push($$[$0]);
                    let tempA = new ast_nodo.default("lista_nodosA","");
                    tempA.InsertarHijo(nodo_);
                    lista_nodos_.InsertarHijo(tempA);
                    reportG.push(new gramatic.default("lista_nodos : nodo lista_nodos","{ lista_nodos.val = lista_nodosP.val; \n lista_nodos.val.push(nodo.val)}"));
                
break;
case 9:
 
                  this.$ = new Array(); 
                  this.$.push($$[$0]);
                  lista_nodos_.InsertarHijo(nodo_)
                  let tempB = new ast_nodo.default("lista_nodosA","");
                  tempB.InsertarHijo(lista_nodos_);
                  lista_nodos_ = tempB;
                  reportG.push(new gramatic.default("lista_nodos : nodo","{ lista_nodos.val = new Array(); \n lista_nodos.val.push(nodo)}"));
                
break;
case 10:
 
                  $$[$0].id = $$[$0-1];
                  this.$ = $$[$0];
                  nodo_ = new ast_nodo.default("nodo","");
                  nodo_.InsertarUnNodo("INI", $$[$0-2]);
                  nodo_.InsertarUnNodo("ID", $$[$0-1]);
                  nodo_.InsertarHijo(opcion_nodo_);
                  reportG.push(new gramatic.default("nodo : INI ID opcion_nodo","{ opcion_nodo.val.id = ID.valLex \n nodo.val = opcion_nodo.val}"));
                
break;
case 11:
 
                  this.$ = $$[$0];
                  opcion_nodo_ = new ast_nodo.default("opcion_nodo","");
                  opcion_nodo_.InsertarHijo(cierre_nodo_);
                  reportG.push(new gramatic.default("opcion_nodo : cierre_nodo","{ opcion_nodo.val = cierre_nodo.val }"));
                
break;
case 12:
 
                  $$[$0].atributos = $$[$0-1];
                  this.$ = $$[$0];
                  opcion_nodo_ = new ast_nodo.default("opcion_nodo","");
                  cierre_nodo_.InsertarHijo(lista_atributos_);
                  opcion_nodo_.InsertarHijo(cierre_nodo_);
                  reportG.push(new gramatic.default("opcion_nodo : lista_atributos cierre_nodo","{ cierre_nodo.val.atributos = lista_atributos.val \n opcion_nodo.val = cierre_nodo.val }"));
                
break;
case 13:

                  this.$ = $$[$0];
                  cierre_nodo_ = new ast_nodo.default("cierre_nodo","");
                  cierre_nodo_.InsertarHijo(cuerpo_nodo_);
                  reportG.push(new gramatic.default("cierre_nodo : FIN cuerpo_nodo","{ cierre_nodo.val = cuerpo_nodo.val }"));
                
break;
case 14:
 
                  this.$ = new nodo_xml.default("",[],"",[],_$[$0-1].first_line,_$[$0-1].first_column,null);
                  cierre_nodo_.InsertarUnNodo("CIERRE", $$[$0-1]);
                  cierre_nodo_ = new ast_nodo.default("cierre_nodo","");
                  reportG.push(new gramatic.default("cierre_nodo : CIERRE FIN","{ cierre_nodo.val = new nodo_xml.default('',[],'',[]) }"));
                
break;
case 15:
 
                  this.$ = new nodo_xml.default("",[],$$[$0-4],[],_$[$0-4].first_line,_$[$0-4].first_column,$$[$0-1])
                  cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","");
                  cuerpo_nodo_.InsertarUnNodo("Valor", $$[$0-4]);
                  cuerpo_nodo_.InsertarUnNodo("INI", $$[$0-3]);
                  cuerpo_nodo_.InsertarUnNodo("CIERRE", $$[$0-2]);
                  cuerpo_nodo_.InsertarUnNodo("ID", $$[$0-1]);
                  cuerpo_nodo_.InsertarUnNodo("FIN", $$[$0]);
                  reportG.push(new gramatic.default("cuerpo_nodo : Lista_valor INI CIERRE ID FIN","{ cuerpo_nodo.val = new nodo_xml.default('',[],lista_valor.valLex,[]) }"));
                
break;
case 16:
 
                  this.$ = new nodo_xml.default("",[],"",$$[$0-4],_$[$0-4].first_line,_$[$0-4].first_column,$$[$0-1])
                  cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","");
                  cuerpo_nodo_.InsertarHijo(lista_nodos_);
                  cuerpo_nodo_.InsertarUnNodo("INI", $$[$0-3]);
                  cuerpo_nodo_.InsertarUnNodo("CIERRE", $$[$0-2]);
                  cuerpo_nodo_.InsertarUnNodo("ID", $$[$0-1]);
                  cuerpo_nodo_.InsertarUnNodo("FIN", $$[$0]);
                  reportG.push(new gramatic.default("cuerpo_nodo : lista_nodos INI CIERRE ID FIN","{ cuerpo_nodo.val = new nodo_xml.default('',[],'',lista_nodos.val) }"));
                
break;
case 17:
 this.$ = new nodo_xml.default("recuparado",[],"",[])  
break;
case 18:
 
                  this.$ = $$[$0]; 
                  this.$.push($$[$0-1]);
                  let tempD = new ast_nodo.default("lista_atrubutos","");
                  tempD.InsertarHijo(atributos_);
                  lista_atributos_.InsertarHijo(tempD);
                  reportG.push(new gramatic.default("lista_atributos : atributos lista_atributos","{ lista_atributos.val = lista_atributosP.val \n lista_atributos.val.push(atributos.val) }"));
                
break;
case 19:
 
                  this.$ = new Array(); 
                  this.$.push($$[$0]);
                  lista_atributos_.InsertarHijo(atributos_);
                  let tempC = new ast_nodo.default("lista_atributos","");
                  tempC.InsertarHijo(lista_atributos_);
                  lista_atributos_ = tempC;
                  reportG.push(new gramatic.default("lista_atributos : atributos","{ lista_atributos.val = new Array(); \n lista_atributos.val.push(atributos.val) }"));
                
break;
case 20:
 
                  this.$ = new atr_xml.default($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column);
                  atributos_ = new ast_nodo.default("atributos","");
                  atributos_.InsertarUnNodo("ID", $$[$0-2]);
                  atributos_.InsertarUnNodo("IGUAL", $$[$0-1]);
                  atributos_.InsertarUnNodo("VALOR", $$[$0]);
                  reportG.push(new gramatic.default("atributos : ID IGUAL valor","{ atributos.val = new atr_xml.default(ID.valLex,valor.val) }"));
                
break;
case 21:
 
                  $$[$0] = $$[$0].slice(1, $$[$0].length-1); 
                  this.$ = $$[$0];
                  reportG.push(new gramatic.default("valor : CADENA","{ CADENA.val = CADENA.val.slice(1,CADENA.val.length-1) }"));
                
break;
case 22:
 
                  this.$ = $$[$0];
                  reportG.push(new gramatic.default("valor : NUM","{ valor.val = NUM.valLex }"));
                
break;
case 23:
 
                  this.$ = $$[$0-1] + " " + $$[$0];
                  reportG.push(new gramatic.default("lista_valor : tipo_valor lista_valor","{ lista_valor.val = tipo_valor.val + ' ' + lista_valorP.val }"));
                
break;
case 24:

                  this.$ = $$[$0];
                  reportG.push(new gramatic.default("lista_valor : tipo_valor","{ lista_valor.val = tipo_valor.val }"));
                
break;
case 25:

                  this.$ = $$[$0];
                  reportG.push(new gramatic.default("tipo_valor : ID","{ tipo_valor.val = ID.valLex }"));
                
break;
case 26:

                  this.$ = $$[$0];
                  reportG.push(new gramatic.default("tipo_valor : ID2","{ tipo_valor.val = ID2.valLex }"));
                
break;
case 27:

                  this.$ = $$[$0];
                  reportG.push(new gramatic.default("tipo_valor : NUM","{ tipo_valor.val = NUM.valLex }"));
                
break;
}
},
table: [{3:1,4:2,6:[1,3]},{1:[3]},{5:4,6:[1,5]},{7:[1,6]},{1:[2,1]},{11:[1,7]},{8:[1,8]},{10:[1,9]},{9:10,11:$V0,22:11},{6:$V1,12:13,17:14},{7:[1,16]},o($V2,[2,19],{22:11,9:17,11:$V0}),{23:[1,18]},{6:[1,19],17:20},{6:[2,9]},{11:$V3},{10:[1,22]},o($V2,[2,18]),{24:23,25:[1,24],26:[1,25]},{11:$V3,13:[1,26]},{6:[2,8]},{9:29,10:$V4,11:$V0,13:$V5,18:27,19:28,22:11},{6:[2,2]},o($V6,[2,20]),o($V6,[2,21]),o($V6,[2,22]),{11:[1,32]},{6:[2,10]},{6:[2,11]},{10:$V4,13:$V5,19:33},{2:[1,39],6:$V1,11:$V7,12:36,15:37,17:14,20:34,21:35,26:$V8,27:38,28:$V9},{10:[1,43]},{10:[1,44]},{6:[2,12]},{6:[2,13]},{6:[1,45]},{6:[1,46],17:20},{6:[2,17]},{6:[2,24],11:$V7,21:47,26:$V8,27:38,28:$V9},{6:[1,51],10:[1,49],13:[1,50],16:48},o($Va,[2,25]),o($Va,[2,26]),o($Va,[2,27]),{6:[2,14]},{14:[1,52]},{13:[1,53]},{11:$V3,13:[1,54]},{6:[2,23]},{6:[2,4]},{6:[2,5]},{11:[1,55]},{6:[2,7]},{1:[2,3]},{11:[1,56]},{11:[1,57]},{10:[1,58]},{10:[1,59]},{10:[1,60]},{6:[2,6]},{6:[2,15]},{6:[2,16]}],
defaultActions: {4:[2,1],14:[2,9],20:[2,8],22:[2,2],27:[2,10],28:[2,11],33:[2,12],34:[2,13],37:[2,17],43:[2,14],47:[2,23],48:[2,4],49:[2,5],51:[2,7],52:[2,3],58:[2,6],59:[2,15],60:[2,16]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    const nodo_xml = require('../clases/xml/nodo_xml');
    const atr_xml = require('../clases/xml/atr_xml');
    const rep_error = require('../reports/ReportController');
    const ast_nodo = require('../reports/ASTNodo');
    const gramatic = require('../reports/gramatical');

    /* Reporte CST */
    let lista_nodos_ = new ast_nodo.default("lista_nodos0","");
    let nodo_ = new ast_nodo.default("nodo","");
    let opcion_nodo_ = new ast_nodo.default("opcion_nodo","");
    let ciere_nodo_ = new ast_nodo.default("cierre_nodo","");
    let lista_atributos_ = new ast_nodo.default("lista_atributos","");
    let cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","");
    let lista_valor_ = new ast_nodo.default("lista_valor","");
    let atributos_ = new ast_nodo.default("atributos","");

    /* Reporte Gramatical */
    let reportG = new Array();
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/*skip comments*/
break;
case 1:/* */
break;
case 2:/* */
break;
case 3:/* skip whitespace */
break;
case 4:/* */
break;
case 5: return 6
break;
case 6: return 13
break;
case 7: return 10
break;
case 8: return 23
break;
case 9: return 7
break;
case 10: return 8 
break;
case 11: return 26
break;
case 12: return 11
break;
case 13: return 28
break;
case 14: return 28
break;
case 15: return 28
break;
case 16: return 25
break;
case 17:/* skip whitespace */
break;
case 18:return 14
break;
case 19: rep_error.InsertarError("lexico", yy_.yytext, "xml", yy_.yylloc.first_line, yy_.yylloc.first_column); console.log(`Error lexico ${yy_.yytext}`) 
break;
}
},
rules: [/^(?:[<][!][-][-][^-<]*[-][-][>])/i,/^(?:((\/\*)[^\*\/]*(\*\/)))/i,/^(?:[ \\\t\r\n\f])/i,/^(?:\s+)/i,/^(?:(\/\/[^\n]*))/i,/^(?:<)/i,/^(?:\/)/i,/^(?:>)/i,/^(?:=)/i,/^(?:\?)/i,/^(?:xml\b)/i,/^(?:([0-9]+(\.[0-9]+)?))/i,/^(?:([a-zñA-ZÑ][a-zñA-ZÑ0-9_]*))/i,/^(?:(([a-zñA-ZÑ][a-zñA-ZÑ0-9_]*)|((!|¡|\)|\(|\[|\]|%|\?|¿|\$|#|,|-|\.|;| |[\s\r\n\t]))|((\n\s*))|([0-9]+(\.[0-9]+)?))*([a-zñA-ZÑ][a-zñA-ZÑ0-9_]*))/i,/^(?:(([a-zñA-ZÑ][a-zñA-ZÑ0-9_]*)|((!|¡|\)|\(|\[|\]|%|\?|¿|\$|#|,|-|\.|;| |[\s\r\n\t]))|((\n\s*))|([0-9]+(\.[0-9]+)?))*([0-9]+(\.[0-9]+)?))/i,/^(?:(([a-zñA-ZÑ][a-zñA-ZÑ0-9_]*)|((!|¡|\)|\(|\[|\]|%|\?|¿|\$|#|,|-|\.|;| |[\s\r\n\t]))|((\n\s*))|([0-9]+(\.[0-9]+)?))*((!|¡|\)|\(|\[|\]|%|\?|¿|\$|#|,|-|\.|;| |[\s\r\n\t])))/i,/^(?:(("([^\"\\])*")))/i,/^(?:[\s\r\n\t])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = xml_descendente;
exports.Parser = xml_descendente.Parser;
exports.parse = function () { return xml_descendente.parse.apply(xml_descendente, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
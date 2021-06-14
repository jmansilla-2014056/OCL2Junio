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
var xpath_descendente = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[5,7],$V2=[1,12],$V3=[1,13],$V4=[1,14],$V5=[5,7,9],$V6=[1,32],$V7=[1,29],$V8=[1,24],$V9=[1,25],$Va=[1,26],$Vb=[1,27],$Vc=[1,28],$Vd=[1,30],$Ve=[1,31],$Vf=[1,33],$Vg=[1,34],$Vh=[1,40],$Vi=[1,39],$Vj=[1,37],$Vk=[1,38],$Vl=[1,41],$Vm=[1,42],$Vn=[1,43],$Vo=[1,44],$Vp=[1,45],$Vq=[1,46],$Vr=[1,47],$Vs=[1,48],$Vt=[1,49],$Vu=[1,50],$Vv=[9,16,19,22,23,24,25,26,27,28,29,30,31,32,33,36],$Vw=[19,32,33,36],$Vx=[19,22,23,25,26,27,28,29,30,31,32,33,36],$Vy=[19,25,26,27,28,29,30,31,32,33,36];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"lista_several":4,"EOF":5,"lista_select":6,"SEVERAL":7,"select":8,"DIV":9,"list_op_select":10,"opcion_select":11,"ID":12,"otra_opcion_s":13,"ATR":14,"fin_opcion_s":15,"MULTI":16,"CORA":17,"e":18,"CORC":19,"DPTN":20,"axes_select":21,"MAS":22,"MENOS":23,"MODULO":24,"MENORQUE":25,"MAYORQUE":26,"MENORIGUAL":27,"MAYORIGUAL":28,"IGUAL":29,"IGUALIGUAL":30,"DIFERENTE":31,"OR":32,"AND":33,"NOT":34,"PARA":35,"PARC":36,"LAST":37,"POSITION":38,"NUM":39,"CADENA":40,"TRUE":41,"FALSE":42,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"SEVERAL",9:"DIV",12:"ID",14:"ATR",16:"MULTI",17:"CORA",19:"CORC",20:"DPTN",22:"MAS",23:"MENOS",24:"MODULO",25:"MENORQUE",26:"MAYORQUE",27:"MENORIGUAL",28:"MAYORIGUAL",29:"IGUAL",30:"IGUALIGUAL",31:"DIFERENTE",32:"OR",33:"AND",34:"NOT",35:"PARA",36:"PARC",37:"LAST",38:"POSITION",39:"NUM",40:"CADENA",41:"TRUE",42:"FALSE"},
productions_: [0,[3,2],[4,3],[4,1],[6,2],[6,1],[8,2],[10,2],[10,1],[11,2],[11,2],[11,1],[13,3],[13,3],[13,0],[21,1],[21,1],[15,1],[15,1],[18,3],[18,3],[18,3],[18,3],[18,3],[18,2],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,3],[18,2],[18,3],[18,3],[18,3],[18,2],[18,1],[18,1],[18,1],[18,1],[18,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

                    this.$ = new ast_xpath.default($$[$0-1]);
                    return this.$     
                
break;
case 2:

                    this.$ = $$[$0];
                    this.$.push($$[$0-2]);    
                
break;
case 3: case 5:

                    this.$ = new Array();
                    this.$.push($$[$0]);
                
break;
case 4:

                    this.$ = $$[$0];
                    this.$.push($$[$0-1]);    
                
break;
case 6:

                    this.$ = $$[$0]
                
break;
case 7:

                    if ($$[$0].slc){
                        $$[$0].slc.tipe = "//";
                        this.$ = $$[$0];
                    }else{
                        $$[$0].tipe = "//";
                        this.$ = $$[$0];
                    }
                
break;
case 8:

                    if ($$[$0].slc){
                        $$[$0].slc.tipe = "/";
                        this.$ = $$[$0];
                    }else{
                        $$[$0].tipe = "/";
                        this.$ = $$[$0];
                    }
                
break;
case 9:

                    if ($$[$0].hasOwnProperty("axe")){
                        $$[$0].axe = $$[$0-1];
                        this.$ = $$[$0];
                    }else if ($$[$0].slc){
                        $$[$0].slc.id = $$[$0-1];
                        this.$ = $$[$0];
                    }else{
                        $$[$0].id = $$[$0-1];
                        this.$ = $$[$0];
                    }
                
break;
case 10: case 13:

                    this.$ = $$[$0];
                
break;
case 11:

                    this.$ = new select.default("","*",false,_$[$0].first_line,_$[$0].first_column);
                
break;
case 12:

                    this.$ = new predicate.default(new select.default("","",false,_$[$0-2].first_line,_$[$0-2].first_column,null),$$[$0-1],_$[$0-2].first_line,_$[$0-2].first_column);
                
break;
case 14:

                    this.$ = new select.default("","",false,_$[$0].first_line,_$[$0].first_column);
                
break;
case 15:

                    this.$ = new axes.default("","",$$[$0],_$[$0].first_line,_$[$0].first_column);
                
break;
case 16:

                    this.$ = new axes.default("","","*",_$[$0].first_line,_$[$0].first_column);
                
break;
case 17:

                    this.$ = new select.default("",$$[$0],true,_$[$0].first_line,_$[$0].first_column);
                
break;
case 18:

                    this.$ = new select.default("",null,true,_$[$0].first_line,_$[$0].first_column);
                
break;
case 19:

                    this.$ = new aritmetica.default($$[$0-2],"+",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 20:

                    this.$ = new aritmetica.default($$[$0-2],"-",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 21:

                    this.$ = new aritmetica.default($$[$0-2],"*",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 22:

                    this.$ = new aritmetica.default($$[$0-2],"/",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 23:

                    this.$ = new aritmetica.default($$[$0-2],"%",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 24:

                    this.$ = new aritmetica.default($$[$0],"UNARIO",null,_$[$0-1].first_line,_$[$0-1].first_column,true);
                
break;
case 25:

                    this.$ = new relacional.default($$[$0-2],"<",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 26:

                    this.$ = new relacional.default($$[$0-2],">",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 27:

                    this.$ = new relacional.default($$[$0-2],"<=",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 28:

                    this.$ = new relacional.default($$[$0-2],">=",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 29: case 30:

                    this.$ = new relacional.default($$[$0-2],"=",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 31:

                    this.$ = new relacional.default($$[$0-2],"!=",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 32:

                    this.$ = new logica.default($$[$0-2],"||",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 33:

                    this.$ = new logica.default($$[$0-2],"&&",$$[$0],_$[$0-2].first_line,_$[$0-2].first_column,false);
                
break;
case 34:
 
                    this.$ = new logica.default($$[$0],"!",null,_$[$0-1].first_line,_$[$0-1].first_column,true);
                
break;
case 35:

                    this.$ = $$[$0-1];
                
break;
case 36:

                    this.$ = new last.default(_$[$0-2].first_line,_$[$0-2].first_column);
                
break;
case 37:

                    this.$ = new position.default(_$[$0-2].first_line,_$[$0-2].first_column);
                
break;
case 38:

                    this.$ = new filtro.default($$[$0],_$[$0-1].first_line,_$[$0-1].first_column,true);
                
break;
case 39:

                    this.$ = new primitivo.default(Number($$[$0]),_$[$0].first_line,_$[$0].first_column);
                
break;
case 40:

                    $$[$0] = $$[$0].slice(1, $$[$0].length-1);
                    this.$ = new primitivo.default($$[$0],_$[$0].first_line,_$[$0].first_column);
                
break;
case 41:

                    this.$ = new filtro.default($$[$0],_$[$0].first_line,_$[$0].first_column,false);
                
break;
case 42:

                    this.$ = new primitivo.default(true,_$[$0].first_line,_$[$0].first_column);
                
break;
case 43:

                    this.$ = new primitivo.default(false,_$[$0].first_line,_$[$0].first_column);
                
break;
}
},
table: [{3:1,4:2,6:3,8:4,9:$V0},{1:[3]},{5:[1,6]},{5:[2,3],7:[1,7]},o($V1,[2,5],{8:4,6:8,9:$V0}),{9:[1,10],10:9,11:11,12:$V2,14:$V3,16:$V4},{1:[2,1]},{4:15,6:3,8:4,9:$V0},o($V1,[2,4]),o($V5,[2,6]),{11:16,12:$V2,14:$V3,16:$V4},o($V5,[2,8]),o($V5,[2,14],{13:17,17:[1,18],20:[1,19]}),{12:[1,21],15:20,16:[1,22]},o($V5,[2,11]),{5:[2,2]},o($V5,[2,7]),o($V5,[2,9]),{12:$V6,14:$V7,18:23,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{20:[1,35]},o($V5,[2,10]),o($V5,[2,17]),o($V5,[2,18]),{9:$Vh,16:$Vi,19:[1,36],22:$Vj,23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,32:$Vt,33:$Vu},{12:$V6,14:$V7,18:51,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:52,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:53,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{35:[1,54]},{35:[1,55]},{12:[1,56]},o($Vv,[2,39]),o($Vv,[2,40]),o($Vv,[2,41]),o($Vv,[2,42]),o($Vv,[2,43]),{12:[1,58],16:[1,59],21:57},o($V5,[2,12]),{12:$V6,14:$V7,18:60,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:61,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:62,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:63,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:64,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:65,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:66,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:67,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:68,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:69,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:70,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:71,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:72,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},{12:$V6,14:$V7,18:73,23:$V8,34:$V9,35:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg},o($Vv,[2,24]),o($Vw,[2,34],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs}),{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,32:$Vt,33:$Vu,36:[1,74]},{36:[1,75]},{36:[1,76]},o($Vv,[2,38]),o($V5,[2,13]),o($V5,[2,15]),o($V5,[2,16]),o($Vx,[2,19],{9:$Vh,16:$Vi,24:$Vl}),o($Vx,[2,20],{9:$Vh,16:$Vi,24:$Vl}),o($Vv,[2,21]),o($Vv,[2,22]),o($Vv,[2,23]),o($Vy,[2,25],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl}),o($Vy,[2,26],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl}),o($Vy,[2,27],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl}),o($Vy,[2,28],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl}),o($Vy,[2,29],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl}),o($Vy,[2,30],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl}),o($Vy,[2,31],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl}),o([19,32,36],[2,32],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs,33:$Vu}),o($Vw,[2,33],{9:$Vh,16:$Vi,22:$Vj,23:$Vk,24:$Vl,25:$Vm,26:$Vn,27:$Vo,28:$Vp,29:$Vq,30:$Vr,31:$Vs}),o($Vv,[2,35]),o($Vv,[2,36]),o($Vv,[2,37])],
defaultActions: {6:[2,1],15:[2,2]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
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
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const rep_error = require('../reports/ReportController');

    const primitivo = require('../clases/expresiones/primitivo')
    const print = require('../clases/instrucciones/print')
    const ast_xpath = require('../clases/ast/ast_xpath')

    const aritmetica = require('../clases/expresiones/operaciones/aritmetica')
    const relacional = require('../clases/expresiones/operaciones/relacional')
    const logica = require('../clases/expresiones/operaciones/logica')

    const select = require('../clases/expresiones/select')
    const predicate = require('../clases/expresiones/predicates/predicate')
    const last = require('../clases/expresiones/predicates/last')
    const position = require('../clases/expresiones/predicates/position')
    const filtro = require('../clases/expresiones/predicates/filtro')

    const axes = require('../clases/expresiones/axes/axes')
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
case 0:/*Ignorar comentarios con multiples lneas*/
break;
case 1: return 7 
break;
case 2: return 35 
break;
case 3: return 36 
break;
case 4: return 17 
break;
case 5: return 19 
break;
case 6: return 20 
break;
case 7: return 37 
break;
case 8: return 38 
break;
case 9: return 22
break;
case 10: return 23
break;
case 11: return 16
break;
case 12: return 9
break;
case 13: return 'POTENCIA'
break;
case 14: return 24
break;
case 15: return 27
break;
case 16: return 28
break;
case 17: return 25
break;
case 18: return 26
break;
case 19: return 31
break;
case 20: return 30
break;
case 21: return 29
break;
case 22: return 32
break;
case 23: return 33
break;
case 24: return 34
break;
case 25: return 14 
break;
case 26: return 41
break;
case 27: return 42
break;
case 28: return 'PRINT' 
break;
case 29: return 39
break;
case 30: return 12
break;
case 31: return 40
break;
case 32:/* skip whitespace */
break;
case 33:return 5
break;
case 34: rep_error.InsertarError("lexico", yy_.yytext, "xpath", yy_.yylloc.first_line, yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:\/\*((\*+[^/*])|([^*]))*\**\*\/)/i,/^(?:\|)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?::)/i,/^(?:last\b)/i,/^(?:position\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:\^)/i,/^(?:mod\b)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:!=)/i,/^(?:==)/i,/^(?:=)/i,/^(?:or\b)/i,/^(?:and\b)/i,/^(?:!)/i,/^(?:@)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:print\b)/i,/^(?:([0-9]+(\.[0-9]+)?))/i,/^(?:([a-zñA-ZÑ][a-zñA-ZÑ0-9_]*))/i,/^(?:(("([^\"\\])*")))/i,/^(?:[\s\r\n\t])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true}}
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
exports.parser = xpath_descendente;
exports.Parser = xpath_descendente.Parser;
exports.parse = function () { return xpath_descendente.parse.apply(xpath_descendente, arguments); };
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
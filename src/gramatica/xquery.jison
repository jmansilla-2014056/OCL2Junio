/* Area de imports */
%{
    /* Xpath */
    const ast_xpath = require('../clases/ast/ast_xpath')
    const select = require('../clases/expresiones/select')
    const predicate = require('../clases/expresiones/predicates/predicate')
    const last = require('../clases/expresiones/predicates/last')
    const position = require('../clases/expresiones/predicates/position')
    const filtro = require('../clases/expresiones/predicates/filtro')
    const axes = require('../clases/expresiones/axes/axes')

    /* Xquery */
    const if_query = require('../clases/instrucciones/xquery/if')
    const for_query = require('../clases/instrucciones/xquery/for')
    const let_query = require('../clases/instrucciones/xquery/let')
    const order_query = require('../clases/instrucciones/xquery/order')
    const where_query = require('../clases/instrucciones/xquery/where')
    const nativa_query = require('../clases/instrucciones/xquery/nativa')
    const return_query = require('../clases/instrucciones/xquery/return')
    const variable_query = require('../clases/instrucciones/xquery/variable')
    const function_query = require('../clases/instrucciones/xquery/function')
    const subReturn_query = require('../clases/instrucciones/xquery/subReturn')

    /* Operaciones */
    const aritmetica = require('../clases/expresiones/operaciones/aritmetica')
    const relacional = require('../clases/expresiones/operaciones/relacional')
    const logica = require('../clases/expresiones/operaciones/logica')

    /* Primitivos */
    const primitivo = require('../clases/expresiones/primitivo')

    /* Reporte erroes */
    const rep_error = require('../reports/ReportController');

    /* Reporte Gramatical */
    const gramatic = require('../reports/gramatical');
    let reportG = new Array();
%}

/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno

num                     [0-9]+("."[0-9]+)?
id                      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
variable                [$][a-zñA-ZÑ0-9]+
cadena                  (\"([^\"\\])*\")

%%

/* Comentarios */
[(][:][^:()]*[:][)]    {/*skip comments*/}

/* Simbolos del programa */

/* Caracteres */
'|'                     { return 'SEVERAL' }

"("                     { return 'PARA' }
")"                     { return 'PARC' }
"["                     { return 'CORA' }
"]"                     { return 'CORC' }
"{"                     { return 'LLAVEA' }
"}"                     { return 'LLAVEC' }
"."                     { return 'PTN' }
":"                     { return 'DPTN' }
","                     { return 'COMA' }
";"                     { return 'PTCOMA' }

/* Palabras reservadas */
"last"                  { return 'LAST' }
"position"              { return 'POSITION' }
"for"                   { return 'FOR' }
"let"                   { return 'LET' }
"where"                 { return 'WHERE' }
"order"                 { return 'ORDER'}
"by"                    { return 'BY' }
"return"                { return 'RETURN' }
"if"                    { return 'IF' }
"then"                  { return 'THEN' }
"else"                  { return 'ELSE' }
"at"                    { return 'AT' }
"to"                    { return 'TO' }
"in"                    { return 'IN' }
"data"                  { return 'DATA' }
"declare"               { return 'DECLARE' }
"function"              { return 'FUNCTION' }
"xs"                    { return 'XS' }
"as"                    { return 'AS' }

/* Operadores Aritmeticos */
"+"                     { return 'MAS' }
"-"                     { return 'MENOS' }
"*"                     { return 'MULTI' }
"/"                     { return 'DIV' }
"div"                   { return 'DIVS' }
"^"                     { return 'POTENCIA' }
"mod"                   { return 'MODULO' }
"?"                     { return 'QUESTION' }

/* Operaciones Relacionales */
"<="                    { return 'MENORIGUAL'}
">="                    { return 'MAYORIGUAL'}
"<"                     { return 'MENORQUE'}
">"                     { return 'MAYORQUE'}
"!="                    { return 'DIFERENTE'}
"=="                    { return 'IGUALIGUAL'}
"="                     { return 'IGUAL'}

/* Operaciones Relacionales Unitarias */
"eq"                    { return 'IGUALU'}
"ne"                    { return 'DIFERENTEU'}
"lt"                    { return 'MENORQUEU'}
"le"                    { return 'MENORQUEIU'}
"gt"                    { return 'MAYORQUEU'}
"ge"                    { return 'MAYORQUEIU'}

/* Operaciones Logicas */
"or"                    { return 'OR'}
"and"                   { return 'AND'}
"!"                     { return 'NOT'}

/* Selecting nodes */
"@"                     { return 'ATR' }

/* Types of functions */
"string"                { return 'STRING' }
"integer"               { return 'INTEGER' }
"decimal"               { return 'DECIMAL' }
"double"                { return 'DOUBLE' }
"boolean"               { return 'BOOLEAN' }


"true"                  { return 'TRUE'}
"false"                 { return 'FALSE'}

"print"                 { return 'PRINT' }

{num}                   { return 'NUM'}
{id}                    { return 'ID'}
{cadena}                { return 'CADENA'}
{variable}              { return 'VAR' }

/* Espacios */
[\s\r\n\t]              {/* skip whitespace */}

<<EOF>>                 return 'EOF'

/* Errores lexicos */
.                       { rep_error.InsertarError("lexico", yytext, "xquery", yylloc.first_line, yylloc.first_column); }

/lex

/* Precedencia de operadores */
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'MENORIGUAL' 'MAYORIGUAL' 'IGUAL' 'IGUALIGUAL' 'DIFERENTE' 'eq' 'ne' 'lt' 'le' 'gt' 'ge'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIVS' 'MODULO'
%right 'UNARIO'

%start inicio

/* Gramatica */
%%

inicio          : lista_xquery EOF {
                    reportG.push(new gramatic.default("inicio : lista_xquery EOF","{ inicio.val = lista_xquery.val; }"));
                    let auxReportG = reportG;
                    reportG = [];
                    $$ = { "xquery": $1, "reportG": auxReportG };
                    return $$;    
                }
                ;

lista_xquery    : lista_xquery opcion_xquery {
                    $$ = $1;
                    $$.push($2);
                    reportG.push(new gramatic.default("lista_xquery : lista_xquery opcion_xquery","{ lista_xquery.val = lista_xqueryP.val;\n lista_xquery.val.push(opcion_xquery.val); }"));
                }
                | opcion_xquery {
                    $$ = [$1];
                    reportG.push(new gramatic.default("lista_xquery : opcion_xquery","{ lista_xquery.val = [opcion_xquery.val]; }"));
                }
                ;

opcion_xquery   : e {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : e","{ opcion_xquery.val = e.val; }"));
                }
                | opcion_let {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : opcion_let","{ opcion_xquery.val = opcion_let.val; }"));
                }
                | opcion_xpath {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : opcion_xpath","{ opcion_xquery.val = opcion_xpath.val; }"));
                }
                | opcion_function {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : opcion_function","{ opcion_xquery.val = opcion_function.val; }"));
                }
                | opcion_for {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : opcion_for","{ opcion_xquery.val = opcion_for.val; }"));
                }
                | opcion_where {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : opcion_where","{ opcion_xquery.val = opcion_where.val; }"));
                }
                | opcion_order {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : opcion_order","{ opcion_xquery.val = opcion_order.val; }"));
                }
                | opcion_return {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : opcion_return","{ opcion_xquery.val = opcion_return.val; }"));
                }
                | opcion_if {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_xquery : opcion_if","{ opcion_xquery.val = opcion_if.val; }"));
                }
                | VAR opcion_xpath {
                    $$ = new variable_query.default($1,$2,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_xquery : VAR opcion_xpath","{ opcion_xquery.val = new variable_query.default(VAR.valLex,opcion_xpath.val); }"));
                }
                ;

/* instruccion let */
opcion_let      : LET VAR DPTN IGUAL range_let {
                    $5.identificador.id = $2;
                    $5.return = null;
                    $$ = $5;
                    reportG.push(new gramatic.default("opcion_let : LET VAR DPTN IGUAL range_let","{ range_let.val.identificador.id = VAR.valLex;\n opcion_let.val = range_let.val; }"));
                }
                | LET VAR DPTN IGUAL range_let opcion_return {
                    $5.identificador.id = $2;
                    $5.return = $6;
                    $$ = $5;
                    reportG.push(new gramatic.default("opcion_let : LET VAR DPTN IGUAL range_let opcion_return","{ range_let.val.identificador.id = VAR.valLex;\n opcion_let.val = range_let.val; }"));
                }
                ;

range_let       : e {
                    $$ = new let_query.default(new variable_query.default('',[],@1.first_line,@1.first_column),$1,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("range_let : e","{ range_let.val = new let_query.default(new variable_query.default('',[]),e.val); }"));
                }
                | PARA e TO e PARC {
                    $$ = new let_query.default(new variable_query.default('',[],@1.first_line,@1.first_column),["to",$2,$4],@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("range_let : PARA e TO e PARC","{ range_let.val = new let_query.default(new variable_query.default('',[]),['to',e.val,e.val]); }"));
                }
                | PARA opcion_xpath PARC {
                    $$ = new let_query.default(new variable_query.default('',$2,@1.first_line,@1.first_column),null,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("range_let : PARA opcion_xpath PARC","{ range_let.val = new let_query.default(new variable_query.default('',opcion_xpath.val),null); }"));
                }
                | PARA opcion_function PARC {
                    $$ = new let_query.default(new variable_query.default('',[],@1.first_line,@1.first_column),$2,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("range_let : PARA opcion_function PARC","{ range_let.val = new let_query.default(new variable_query.default('',[]),opcion_function.val); }"));
                }
                ;

/* instruccion for */
opcion_for      : FOR range_for lista_xquery{
                    let vari = []; let idat = []; let condi = [];
                    let bolat = []; let linea = 0; let colum = 0;
                    for (let i = 0; i < $2.length; i++){
                        vari.push($2[i][0]);
                        idat.push($2[i][1]);
                        condi.push($2[i][2]);
                        bolat.push($2[i][3]);
                        linea = $2[i][5];
                        colum = $2[i][6]
                    }
                    $$ = new for_query.default(vari,idat,condi,bolat,$3,linea,colum);
                    reportG.push(new gramatic.default("opcion_for : FOR range_for","{ opcion_for.val = range_for.val; }"));
                }
                ;

range_for       : range_for COMA range_for {
                    $$ = $1.concat($3);
                    reportG.push(new gramatic.default("range_for : range_for COMA range_for","{ range_for.val = range_forP.val.concat(range_forP.val); }"));
                }
                | VAR IN opcion_xpath {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),'',new variable_query.default('',$3,@1.first_line,@1.first_column),false,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),'',new variable_query.default('',$3,@1.first_line,@1.first_column),false,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR IN opcion_xpath","{ range_for.val = new for_query.default(VAR.valLex,'',new variable_query.default('',opcion_xpath.val),false); }")); 
                }
                | VAR IN VAR {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),'',new variable_query.default($3,[],@1.first_line,@1.first_column),false,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),'',new variable_query.default($3,[],@1.first_line,@1.first_column),false,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR IN VAR","{ range_for.val = new for_query.default(VAR.valLex,'',new variable_query.default(VAR.valLex,[]),false); }")); 
                }
                | VAR IN VAR opcion_xpath {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),'',new variable_query.default($3,$4,@1.first_line,@1.first_column),false,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),'',new variable_query.default($3,$4,@1.first_line,@1.first_column),false,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR IN VAR opcion_xpath","{ range_for.val = new for_query.default(VAR.valLex,'',new variable_query.default(VAR.valLex,opcion_xpath.val),false); }")); 
                }
                | VAR AT VAR IN opcion_xpath {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),$3,new variable_query.default('',$5,@1.first_line,@1.first_column),true,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),$3,new variable_query.default('',$5,@1.first_line,@1.first_column),true,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR AT VAR IN opcion_xpath","{ range_for.val = new for_query.default(VAR.valLex,VAR.valLex,new variable_query.default('',opcion_xpath.val),true); }"));
                }
                | VAR AT VAR IN VAR {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),$3,new variable_query.default($5,[],@1.first_line,@1.first_column),true,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),$3,new variable_query.default($5,[],@1.first_line,@1.first_column),true,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR AT VAR IN VAR","{ range_for.val = new for_query.default(VAR.valLex,VAR.valLex,new variable_query.default(VAR.val,[]),true); }"));
                }
                | VAR AT VAR IN VAR opcion_xpath {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),$3,new variable_query.default($5,$6,@1.first_line,@1.first_column),true,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),$3,new variable_query.default($5,$6,@1.first_line,@1.first_column),true,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR AT VAR IN VAR opcion_xpath","{ range_for.val = new for_query.default(VAR.valLex,VAR.valLex,new variable_query.default(VAR.val,opcion_xpath.val),true); }"));
                }
                | VAR IN PARA e COMA e PARC {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),'',[",",$4,$6],false,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),'',[",",$4,$6],false,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR IN PARA e COMA e PARC","{ range_for.val = new for_query.default(VAR.valLex,'',[',',e.val,e.val],false); }"));
                }
                | VAR IN PARA e TO e PARC {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),'',["to",$4,$6],false,[],@1.first_line,@1.first_column]];
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),'',["to",$4,$6],false,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR IN PARA e TO e PARC","{ range_for.val = new for_query.default(VAR.valLex,'',['to',e.val,e.val],false); }"));
                }
                | VAR AT VAR IN PARA e COMA e PARC {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),$3,[",",$6,$8],true,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),$3,[",",$6,$8],true,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR AT VAR IN PARA e COMA e PARC","{ range_for.val = new for_query.default(VAR.valLex,VAR.valLex,[',',e.val,e.val],true); }"));
                }
                | VAR AT VAR IN PARA e TO e PARC {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),$3,["to",$6,$8],true,[],@1.first_line,@1.first_column]]
                    //$$ = [new for_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),$3,["to",$6,$8],true,[],@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("range_for : VAR AT VAR IN PARA e TO e PARC","{ range_for.val = new for_query.default(VAR.valLex,VAR.valLex,['to',e.val,e.val],true); }"));
                }
                ;

/* instruccion where */
opcion_where    : WHERE VAR opcion_xpath {
                    $$ = new where_query.default(new variable_query.default($2,$3,@1.first_line,@1.first_column),@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_where : WHERE VAR opcion_xpath","{ opcion_where.val = new where_query.default(new variable_query.default(VAR.valLex,opcion_xpath.val)); }")); 
                }
                | WHERE VAR {
                    $$ = new where_query.default(new variable_query.default($2,[],@1.first_line,@1.first_column),@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_where : WHERE VAR opcion_xpath","{ opcion_where.val = new where_query.default(new variable_query.default(VAR.valLex,[])); }")); 
                }
                ;

/* instruccion order by */
opcion_order    : ORDER BY VAR opcion_xpath {
                    $$ = new order_query.default(new variable_query.default($3,$4,@1.first_line,@1.first_column),@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_order : ORDER BY VAR opcion_xpath","{ opcion_order.val = new order_query.default(new variable_query.default(VAR.valLex,opcion_xpath.val)); }")); 
                }
                | ORDER BY VAR {
                    $$ = new where_query.default(new variable_query.default($3,[],@1.first_line,@1.first_column),@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_order : ORDER BY VAR","{ opcion_order.val = new order_query.default(new variable_query.default(VAR.valLex,[])); }")); 
                }
                ;

/* instruccion return */
opcion_return   : RETURN sub_return{
                    $$ = new return_query.default($2,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_return : RETURN sub_return","{ opcion_return.val = new return_xquery(sub_return.val); }")); 
                }
                ;

sub_return      : sub_return range_return {
                    $$ = $1;
                    $$.push($2);
                    reportG.push(new gramatic.default("sub_return : sub_return range_return","{ sub_return.val = range_return.val;\n sub_return.val.push(range_return.val); }")); 
                }
                | range_return {
                    $$ = [$1]
                    reportG.push(new gramatic.default("sub_return : range_return","{ sub_return.val = [range_return.val]; }")); 
                }
                ;

range_return    : VAR {
                    $$ = new subReturn_query.default(new variable_query.default($1,[],@1.first_line,@1.first_column),null,null,null);
                    reportG.push(new gramatic.default("range_return : VAR","{ range_return.val = subReturn_query.default(new variable_query.default(VAR.valLex,[]),null,null,null); }")); 
                }
                | opcion_if {
                    $$ = new subReturn_query.default(null,null,null,$1);
                    reportG.push(new gramatic.default("range_return : opcion_if","{ range_return.val = subReturn_query.default(null,null,null,opcion_if.val); }")); 
                }
                | VAR opcion_xpath {
                    $$ = new subReturn_query.default(new variable_query.default($1,$2,@1.first_line,@1.first_column),null,null,null);
                    reportG.push(new gramatic.default("range_return : VAR opcion_xpath","{ range_return.val = subReturn_query.default(new variable_query.default(VAR.valLex,opcion_xpath.val),null,null,null); }"));
                }
                | PARA e PARC {
                    $$ = new subReturn_query.default(null,$2,null,null);
                    reportG.push(new gramatic.default("range_return : PARA e PARC","{ range_return.val = subReturn_query.default(null,e.val,null,null); }"));
                }
                | PARA opcion_function PARC {
                    $$ = new subReturn_query.default(null,null,$2,null);
                    reportG.push(new gramatic.default("range_return : PARA opcion_function PARC","{ range_return.val = subReturn_query.default(null,null,opcion_function.val,null); }"));
                }
                | LLAVEA VAR LLAVEC {
                    $$ = new subReturn_query.default(new variable_query.default($2,[],@1.first_line,@1.first_column),null,null,null);
                    reportG.push(new gramatic.default("range_return : LLAVEA VAR LLAVEC","{ range_return.val = subReturn_query.default(new variable_query.default(VAR.valLex,[]),null,null,null); }"));
                }
                | DATA PARA VAR PARC {
                    $$ = new subReturn_query.default(null,null,new nativa_query.default($1,new variable_query.default($3,[],@1.first_line,@1.first_column),@1.first_line,@1.first_column),null);
                    reportG.push(new gramatic.default("range_return : DATA PARA VAR PARC","{ range_return.val = subReturn_query.default(null,null,new nativa_query.default(DATA.valLex,new variable_query.default(VAR.valLex,[])),null); }"));
                }
                | e LLAVEA VAR LLAVEC {
                    $$ = new subReturn_query.default(new variable_query.default($3,[],@1.first_line,@1.first_column),$1,null,null);
                    reportG.push(new gramatic.default("range_return : e LLAVEA VAR LLAVEC","{ range_return.val = subReturn_query.default(new variable_query.default(VAR.valLex,[]),e.val,null,null); }"));
                }
                | LLAVEA VAR opcion_xpath LLAVEC {
                    $$ = new subReturn_query.default(new variable_query.default($2,$3,@1.first_line,@1.first_column),null,null,null);
                    reportG.push(new gramatic.default("range_return : LLAVEA VAR opcion_xpath LLAVEC","{ range_return.val = subReturn_query.default(new variable_query.default(VAR.valLex,opcion_xpath.val),null,null,null); }"));
                }
                | DATA PARA VAR opcion_xpath PARC {
                    $$ = new subReturn_query.default(null,null,new nativa_query.default($1,new variable_query.default($3,$4,@1.first_line,@1.first_column),@1.first_line,@1.first_column),null);
                    reportG.push(new gramatic.default("range_return : DATA PARA VAR opcion_xpath PARC","{ range_return.val = subReturn_query.default(null,null,new nativa_query.default(DATA.valLex,new variable_query.default(VAR.valLex,opcion_xpath.val)),null); }"));
                }
                | e LLAVEA VAR opcion_xpath LLAVEC {
                    $$ = new subReturn_query.default(new variable_query.default($3,$4,@1.first_line,@1.first_column),$1,null,null);
                    reportG.push(new gramatic.default("range_return : e LLAVEA VAR opcion_xpath LLAVEC","{ range_return.val = subReturn_query.default(new variable_query.default(VAR.valLex,opcion_xpath),e.val,null,null); }"));
                }
                | LLAVEA DATA PARA VAR PARC LLAVEC {
                    $$ = new subReturn_query.default(null,null,new nativa_query.default($2,new variable_query.default($4,[],@1.first_line,@1.first_column),@1.first_line,@1.first_column),null);
                    reportG.push(new gramatic.default("range_return : LLAVEA DATA PARA VAR PARC LLAVEC","{ range_return.val = subReturn_query.default(null,null,new nativa_query.default(DATA.valLex,new variable_query.default(VAR.valLex,[])),null); }"));
                }
                | e LLAVEA DATA PARA VAR PARC LLAVEC {
                    $$ = new subReturn_query.default(null,$1,new nativa_query.default($3,new variable_query.default($5,[],@1.first_line,@1.first_column),@1.first_line,@1.first_column),null);
                    reportG.push(new gramatic.default("range_return : e LLAVEA DATA PARA VAR PARC LLAVEC","{ range_return.val = subReturn_query.default(null,e.val,new nativa_query.default(DATA.valLex,new variable_query.default(VAR.valLex,[])),null); }"));
                }
                | LLAVEA DATA PARA VAR opcion_xpath PARC LLAVEC {
                    $$ = new subReturn_query.default(null,null,new nativa_query.default($2,new variable_query.default($4,$5,@1.first_line,@1.first_column),@1.first_line,@1.first_column),null);
                    reportG.push(new gramatic.default("range_return : LLAVEA DATA PARA VAR opcion_xpath PARC LLAVEC","{ range_return.val = subReturn_query.default(null,null,new nativa_query.default(DATA.valLex,new variable_query.default(VAR.valLex,opcion_xpath.val)),null); }"));
                }
                | e LLAVEA DATA PARA VAR opcion_xpath PARC LLAVEC {
                    $$ = new subReturn_query.default(null,$1,new nativa_query.default($3,new variable_query.default($5,$6,@1.first_line,@1.first_column),@1.first_line,@1.first_column),null);
                    reportG.push(new gramatic.default("range_return : e LLAVEA DATA PARA VAR opcion_xpath PARC LLAVEC","{ range_return.val = subReturn_query.default(null,e.val,new nativa_query.default(DATA.valLex,new variable_query.default(VAR.valLex,opcion_xpath.val)),null); }"));
                }
                ;

/* instruccion function */
opcion_function : DECLARE FUNCTION ID DPTN ID PARA range_function PARC AS XS DPTN types LLAVEA lista_xquery LLAVEC PTCOMA {
                    $$ = new function_query.default($3,$5,$7,$12,$14,false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_function : DECLARE FUNCTION ID DPTN ID PARA range_function PARC AS XS DPTN types LLAVEA lista_xquery LLAVEC PTCOMA","{ opcion_function.val = new function_query.default(ID.valLex,ID.valLex,range_function.val,types.val,lista_xquery.val,false); }"));
                }
                | DECLARE FUNCTION ID DPTN ID PARA range_function PARC LLAVEA lista_xquery LLAVEC PTCOMA {
                    $$ = new function_query.default($3,$5,$7,'',$10,false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_function : DECLARE FUNCTION ID DPTN ID PARA range_function PARC LLAVEA lista_xquery LLAVEC PTCOMA","{ opcion_function.val = new function_query.default(ID.valLex,ID.valLex,range_function.val,'',lista_xquery.val,false); }"));
                }
                | DECLARE FUNCTION ID DPTN ID PARA PARC AS XS DPTN types LLAVEA lista_xquery LLAVEC PTCOMA {
                    $$ = new function_query.default($3,$5,[],$11,$13,false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_function : DECLARE FUNCTION ID DPTN ID PARA PARC AS XS DPTN types LLAVEA lista_xquery LLAVEC PTCOMA","{ opcion_function.val = new function_query.default(ID.valLex,ID.valLex,[],types.val,lista_xquery.val,false); }"));
                }
                | DECLARE FUNCTION ID DPTN ID PARA PARC LLAVEA lista_xquery LLAVEC PTCOMA {
                    $$ = new function_query.default($3,$5,[],'',$9,false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_function : DECLARE FUNCTION ID DPTN ID PARA PARC LLAVEA lista_xquery LLAVEC PTCOMA","{ opcion_function.val = new function_query.default(ID.valLex,ID.valLex,[],'',lista_xquery.val,false); }"));
                }
                | ID DPTN ID PARA parametros PARC {
                    $$ = new function_query.default($1,$3,$5,'',[],true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_function : ID DPTN ID PARA parametros PARC","{ opcion_function.val = new function_query.default(ID.valLex,ID.valLex,parametros.val,'',[],true); }"));
                }
                | function_nativa {
                    $$ = $1;
                    reportG.push(new gramatic.default("opcion_function : function_nativa","{ opcion_function.val = function_nativa.val; }"));  
                }
                ;

range_function  : range_function COMA range_function {
                    $$ = $1.concat($3);
                    reportG.push(new gramatic.default("range_function : range_function COMA range_function","{ range_function.val = range_functionP.val.concat(range_functioP.val); }"));  
                }
                | VAR AS XS DPTN types {
                    $$ = [[new variable_query.default($1,[],@1.first_line,@1.first_column),$5]];
                    reportG.push(new gramatic.default("range_function : VAR AS XS DPTN types","{ range_function.val = [[VAR.valLex,types.val]]; }"));  
                }
                ;

function_nativa : ID PARA parametros PARC {
                    $$ = new nativa_query.default($1,$3,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("function_nativa : ID PARA parametros PARC","{ function_nativa.val = new nativa_query.default(ID.valLex,parametros.val); }"));  
                }
                | ID MENOS ID PARA parametros PARC {
                    let id = $1 + "-" + $3;
                    $$ = new nativa_query.default(id,$5,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("function_nativa : ID MENOS ID PARA parametros PARC","{ let id = ID.valLex + '-' + ID.valLex;\n function_nativa.val = new nativa_query.default(id,parametros.val); }")); 
                }
                ;

parametros      : parametros COMA parametros {
                    $$ = $1.concat($3);
                    reportG.push(new gramatic.default("parametros : parametros COMA parametros","{ parametros.val = prametrosP.val.concat(parametrosP.val); }"));
                }
                | e {
                    $$ = [$1];
                    reportG.push(new gramatic.default("parametros : e","{ parametros.val = [e.val]; }"));
                }
                | VAR opcion_xpath {
                    $$ = [new variable_query.default($1,$2,@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("parametros : VAR opcion_xpath","{ parametros.val = [new variable_query.default(VAR.valLex,opcion_xpath.val)]; }"));
                }
                | opcion_xpath {
                    $$ = [new variable_query.default('',$1,@1.first_line,@1.first_column)];
                    reportG.push(new gramatic.default("parametros : opcion_xpath","{ parametros.val = [new variable_query.default('',opcion_xpath.val)]; }"));
                }
                ;

/* tipos para las funciones */
types           : STRING QUESTION {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : STRING QUESTION","{ types.val = BOOLEAN.valLex; }"));
                }
                | INTEGER QUESTION {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : INTEGER QUESTION","{ types.val = INTEGER.valLex; }"));
                }
                | DECIMAL QUESTION {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : DECIMAL QUESTION","{ types.val = DECIMAL.valLex; }"));
                }
                | DOUBLE QUESTION {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : DOUBLE QUESTION","{ types.val = DOUBLE.valLex; }"));
                }
                | BOOLEAN QUESTION {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : BOOLEAN QUESTION","{ types.val = BOOLEAN.valLex; }"));
                }
                | STRING {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : STRING","{ types.val = STRING.valLex; }"));
                }
                | INTEGER {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : INTEGER","{ types.val = INTEGER.valLex; }"));
                }
                | DECIMAL {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : DECIMAL","{ types.val = DECIMAL.valLex; }"));
                }
                | DOUBLE {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : DOUBLE","{ types.val = DOUBLE.valLex; }"));
                }
                | BOOLEAN {
                    $$ = $1;
                    reportG.push(new gramatic.default("types : BOOLEAN","{ types.val = BOOLEAN.valLex; }"));
                }
                ;

/* instruccion if */
opcion_if       : IF PARA e PARC THEN lista_xquery {
                    $$ = new if_query.default($3,$6,[],@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_if : IF PARA e PARC THEN lista_xquery","{ opcion_if.val = new if_query.default(e.val,lista_xquery.val,[]); }"));
                }
                | IF PARA e PARC THEN lista_xquery ELSE lista_xquery {
                    $$ = new if_query.default($3,$6,$8,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_if : IF PARA e PARC THEN lista_xquery ELSE lista_xquery","{ opcion_if.val = new if_query.default(e.val,lista_xquery.val,lista_xquery.val); }"));
                }
                | IF PARA e PARC THEN lista_xquery ELSE opcion_if {
                    $$ = new if_query.default($3,$6,[$8],@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("opcion_if : IF PARA e PARC THEN lista_xquery ELSE opcion_if","{ opcion_if.val = new if_query.default(e.val,lista_xquery.val,[opcion_if.val]); }"));
                }
                ;

/* instrucciones xpath */
opcion_xpath    : opcion_xpath SEVERAL lista_select {
                    $$ = $1;
                    $$.push($3);
                    reportG.push(new gramatic.default("opcion_xpath : opcion_xpath SEVERAL lista_select","{ opcion_xpath.val = opcion_xpathP.val;\n opcion_xpath.val.push(lista_select.val); }"));
                }
                | lista_select {
                    $$ = [$1];
                    reportG.push(new gramatic.default("opcion_xpath : lista_select","{ opcion_xpath.val = new Array();\n opcion_xpath.val.push(lista_select.val); }"));
                }
                ;

lista_select    : lista_select select { 
                    $$ = $1;
                    $$.push($2);
                    reportG.push(new gramatic.default("lista_select : lista_select select","{ lista_select.val = lista_selectP.val;\n lista_select.val.push(select.val); }"));
                }
                | select {
                    $$ = [$1];
                    reportG.push(new gramatic.default("lista_select : select","{ lista_select.val = new Array();\n lista_select.val.push(select.val); }"));
                }
                ;

select          : DIV ID {
                    $$ = new select.default("/",$2,false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID","{ select.val = new select.default('/',ID.valLex,false) }"));
                }
                | DIV DIV ID {
                    $$ = new select.default("//",$3,false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID","{ select.val = new select.default('//',ID.valLex,false) }"));
                }
                | DIV ATR ID {
                    $$ = new select.default("/",$3,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ATR ID","{ select.val = new select.default('/',ID.valLex,true) }"));
                }
                | DIV DIV ATR ID {
                    $$ = new select.default("//",$4,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ATR ID","{ select.val = new select.default('//',ID.valLex,true) }"));
                }
                | DIV MULTI {
                    $$ = new select.default("/","*",false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV MULTI","{ select.val = new select.default('/',*,false) }"));
                }
                | DIV DIV MULTI {
                    $$ = new select.default("//","*",false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ATR MULTI","{ select.val = new select.default('//','*',false) }"));
                }
                | DIV ATR MULTI {
                    $$ = new select.default("/",null,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ATR MULTI","{ select.val = new select.default('/',null,true) }"));
                }
                | DIV DIV ATR MULTI {
                    $$ = new select.default("//",null,true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ATR MULTI","{ select.val = new select.default('//',null,true) }"));
                }//SELECT + FILTRO
                | DIV ID CORA e CORC {
                    $$ = new predicate.default(new select.default("/",$2,false,@1.first_line,@1.first_column,null),$4,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID CORA e CORC","{ select.val = new predicate.default(new select.default('/',ID.valLex,false,null),e.val) }"));
                }
                | DIV DIV ID CORA e CORC {
                    $$ = new predicate.default(new select.default("//",$3,false,@1.first_line,@1.first_column,null),$5,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID CORA e CORC","{ select.val = new predicate.default(new select.default('//',ID.valLex,false,null),e.val) }"));
                }
                | DIV e {
                    $$ = new predicate.default(null,$2,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV e","{ select.val = new predicate.default(null,e.val) }"));
                }
                | DIV DIV e {
                    $$ = new predicate.default(null,$3,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV e","{ select.val = new predicate.default(null,e.val) }"));
                }//SELECT AXES
                | DIV ID DPTN DPTN ID {
                    $$ = new axes.default("/",$2,$5,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID DPTN DPTN ID","{ select.val = new axes.default('/',ID.valLex,'ID.valLex') }"));
                }
                | DIV ID DPTN DPTN MULTI {
                    $$ = new axes.default("/",$2,"*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID DPTN DPTN MULTI","{ select.val = new axes.default('/',ID.valLex,'*') }"));
                }
                | DIV DIV ID DPTN DPTN ID {
                    $$ = new axes.default("//",$3,$6,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID DPTN DPTN ID","{ select.val = new axes.default('//',ID.valLex,ID.valLex) }"));
                }
                | DIV DIV ID DPTN DPTN MULTI {
                    $$ = new axes.default("//",$3,"*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID DPTN DPTN MULTI","{ select.val = new axes.default('//',ID.valLex,'*') }"));
                }//SELECT AXES + FILTRO
                | DIV ID DPTN DPTN ID CORA e CORC {
                    $$ = new predicate.default(new axes.default("/",$2,$5,@1.first_line,@1.first_column),$7,@1.first_line,@1.first_column)
                    reportG.push(new gramatic.default("select : DIV ID DPTN DPTN ID CORA e CORC","{ select.val = new axes.default('/',ID.valLex,'ID.valLex') }"));
                }
                | DIV DIV ID DPTN DPTN ID CORA e CORC {
                    $$ = new predicate.default(new axes.default("//",$3,$6,@1.first_line,@1.first_column),$8,@1.first_line,@1.first_column)
                    reportG.push(new gramatic.default("select : DIV DIV ID DPTN DPTN ID CORA e CORC","{ select.val = new axes.default('//',ID.valLex,ID.valLex) }"));
                }//SELECTING . OR ..
                | DIV PTN {
                    $$ = new axes.default("/","self","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV PTN","{ select.val = new axes.default('/',ID.valLex,'*') }"));
                }
                | DIV DIV PTN {
                    $$ = new axes.default("//","self","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV PTN","{ select.val = new axes.default('//',ID.valLex,'*') }"));
                }
                | DIV PTN PTN {
                    $$ = new axes.default("/","parent","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV PTN","{ select.val = new axes.default('/',ID.valLex,'*') }"));
                }
                | DIV DIV PTN PTN {
                    $$ = new axes.default("//","..","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV PTN","{ select.val = new axes.default('//',ID.valLex,'*') }"));
                }//NODE
                | DIV ID PARA PARC {
                    $$ = new axes.default("/",$2+"()","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV ID PARA PARC","{ select.val = new axes.default('/',ID.valLex,'*') }"));
                }
                | DIV DIV ID PARA PARC {
                    $$ = new axes.default("//",$3+"()","*",@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("select : DIV DIV ID PARA PARC","{ select.val = new axes.default('//',ID.valLex,'*') }"));
                }
                ;

e               : VAR {
                    $$ = new variable_query.default($1,[],@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : VAR","{ e.val = new variable_query.default(VAR.valLex,[]); }"));
                }
                | NUM {
                    $$ = new primitivo.default(Number($1),@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : NUM","{ e.val = new primitivo.default(Number(NUM.valLex)) }"));
                }
                | CADENA {
                    $1 = $1.slice(1, $1.length-1);
                    $$ = new primitivo.default($1,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : CADENA","{ e.val = new primitivo.default(CADENA.valLex) }"));
                }
                | LAST PARA PARC {
                    $$ = new last.default(@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : LAST PARA PARC","{ e.val = new last.default() }"));
                }
                | POSITION PARA PARC {
                    $$ = new position.default(@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : POSITION PARA PARC","{ e.val = new position.default() }"));
                }
                | ID {
                    $$ = new filtro.default($1,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : ID","{ e.val = new filtro.default(ID.valLex,false) }"));
                }
                | ATR ID {
                    $$ = new filtro.default($2,@1.first_line,@1.first_column,true);
                    reportG.push(new gramatic.default("e : ATR ID","{ e.val = new filtro.default(ID.valLex,true) }"));
                }
                | TRUE {
                    $$ = new primitivo.default(true,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : TRUE","{ e.val = new primitivo.default(true) }"));
                }
                | FALSE {
                    $$ = new primitivo.default(false,@1.first_line,@1.first_column);
                    reportG.push(new gramatic.default("e : FALSE","{ e.val = new primitivo.default(false) }"));
                }
                | e MAS e {
                    $$ = new aritmetica.default($1,"+",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MAS e","{ e.val = new aritmetica.default(e.val,'+',e.val,false) }"));
                }
                | e MENOS e {
                    $$ = new aritmetica.default($1,"-",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MENOS e","{ e.val = new aritmetica.default(e.val,'-',e.val,false) }"));
                }
                | e MULTI e {
                    $$ = new aritmetica.default($1,"*",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MULTI e","{ e.val = new aritmetica.default(e.val,'*',e.val,false) }"));
                }
                | e DIVS e {
                    $$ = new aritmetica.default($1,"/",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e DIV e","{ e.val = new aritmetica.default(e.val,'/',e.val,false) }"));
                }
                | e MODULO e {
                    $$ = new aritmetica.default($1,"%",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MODULO e","{ e.val = new aritmetica.default(e.val,'%',e.val,false) }"));
                }
                | MENOS e %prec UNARIO {
                    $$ = new aritmetica.default($2,"UNARIO",null,@1.first_line,@1.first_column,true);
                    reportG.push(new gramatic.default("e : MENOS e","{ e.val = new aritmetica.default(e.val,'-',null,true) }"));
                }
                | e MENORQUE e {
                    $$ = new relacional.default($1,"<",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MENORQUE e","{ e.val = new relacional.default(e.val,'<',e.val,false) }"));
                }
                | e MAYORQUE e {
                    $$ = new relacional.default($1,">",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MAYORQUE e","{ e.val = new relacional.default(e.val,'>',e.val,false) }"));
                }
                | e MENORIGUAL e {
                    $$ = new relacional.default($1,"<=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MENORIGUAL e","{ e.val = new relacional.default(e.val,'<=',e.val,false) }"));
                }
                | e MAYORIGUAL e {
                    $$ = new relacional.default($1,">=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MAYORIGUAL e","{ e.val = new relacional.default(e.val,'>=',e.val,false) }"));
                }
                | e IGUAL e { 
                    $$ = new relacional.default($1,"=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e IGUAL e","{ e.val = new relacional.default(e.val,'=',e.val,false) }"));
                }
                | e IGUALIGUAL e {
                    $$ = new relacional.default($1,"=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e IGUALIGUAL e","{ e.val = new relacional.default(e.val,'=',e.val,false) }"));
                }
                | e DIFERENTE e {
                    $$ = new relacional.default($1,"!=",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e DIFERENTE e","{ e.val = new relacional.default(e.val,'!=',e.val,false) }"));
                }
                | e IGUALU e {
                    $$ = new relacional.default($1,"eq",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e IGUALU e","{ e.val = new relacional.default(e.val,'eq',e.val,false) }"));
                }
                | e DIFERENTEU e {
                    $$ = new relacional.default($1,"ne",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e DIFERENTEU e","{ e.val = new relacional.default(e.val,'ne',e.val,false) }"));
                }
                | e MENORQUEIU e {
                    $$ = new relacional.default($1,"le",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MENORQUEIU e","{ e.val = new relacional.default(e.val,'le',e.val,false) }"));
                }
                | e MENORQUEU e {
                    $$ = new relacional.default($1,"lt",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MENORQUEU e","{ e.val = new relacional.default(e.val,'lt',e.val,false) }"));
                }
                | e MAYORQUEIU e {
                    $$ = new relacional.default($1,"ge",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MAYORQUEIU e","{ e.val = new relacional.default(e.val,'ge',e.val,false) }"));
                }
                | e MAYORQUEU e {
                    $$ = new relacional.default($1,"gt",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e MAYORQUEU e","{ e.val = new relacional.default(e.val,'gt',e.val,false) }"));
                }
                | e OR e {
                    $$ = new logica.default($1,"||",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e OR e","{ e.val = new logica.default(e.val,'&&',e.val,false) }"));
                }
                | e AND e {
                    $$ = new logica.default($1,"&&",$3,@1.first_line,@1.first_column,false);
                    reportG.push(new gramatic.default("e : e AND e","{ e.val = new logica.default(e.val,'&&',e.val,false) }"));
                }
                | NOT e {
                    $$ = new logica.default($2,"!",null,@1.first_line,@1.first_column,true);
                    reportG.push(new gramatic.default("e : NOT e","{ e.val = new logica.default(e.val,'!',null,true) }"));
                }
                | PARA e PARC {
                    $$ = $2;
                    reportG.push(new gramatic.default("e : PARA e PARC","{ e.val = NUM.valLex }"));
                }
                | opcion_function {
                    $$ = $1;
                    reportG.push(new gramatic.default("e : opcion_function","{ e.val = opcion_function.val; }"));
                }
                ;
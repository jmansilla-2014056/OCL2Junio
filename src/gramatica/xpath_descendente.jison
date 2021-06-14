/* Area de imports */

%{
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
%}

/* Definicion lexica */

%lex
%options case-insensitive
%option yylineno

num         [0-9]+("."[0-9]+)?
id          [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
cadena      (\"([^\"\\])*\")

%%

/* Comentarios */

"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}

/* Simbolos del programa */

/* Caracteres */
'|'                     { return 'SEVERAL' }

"("                     { return 'PARA' }
")"                     { return 'PARC' }
"["                     { return 'CORA' }
"]"                     { return 'CORC' }
":"                     { return 'DPTN' }

/* Palabras reservadas */
"last"                  { return 'LAST' }
"position"              { return 'POSITION' }

/* Operadores Aritmeticos */
"+"                     { return 'MAS'}
"-"                     { return 'MENOS'}
"*"                     { return 'MULTI'}
"/"                     { return 'DIV'}
"^"                     { return 'POTENCIA'}
"mod"                   { return 'MODULO'}

/* Operaciones Relacionales */
"<="                    { return 'MENORIGUAL'}
">="                    { return 'MAYORIGUAL'}
"<"                     { return 'MENORQUE'}
">"                     { return 'MAYORQUE'}
"!="                    { return 'DIFERENTE'}
"=="                    { return 'IGUALIGUAL'}
"="                     { return 'IGUAL'}

/* Operaciones Logicas */
"or"                    { return 'OR'}
"and"                   { return 'AND'}
"!"                     { return 'NOT'}

/* Selecting nodes */
"@"                     { return 'ATR' }

"true"                  { return 'TRUE'}
"false"                 { return 'FALSE'}

"print"                 { return 'PRINT' }

{num}                   { return 'NUM'}
{id}                    { return 'ID'}
{cadena}                { return 'CADENA'}

/* Espacios */
[\s\r\n\t]              {/* skip whitespace */}

<<EOF>>                 return 'EOF'

/* Errores lexicos */
.                       { rep_error.InsertarError("lexico", yytext, "xpath", yylloc.first_line, yylloc.first_column); }

/lex
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'MENORIGUAL' 'MAYORIGUAL' 'IGUAL' 'IGUALIGUAL' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV' 'MODULO'
%right 'UNARIO'

%start inicio

%% /* Gramatica */

inicio          : lista_several EOF {
                    $$ = new ast_xpath.default($1);
                    return $$     
                }
                ;

lista_several   : lista_select SEVERAL lista_several {
                    $$ = $3;
                    $$.push($1);    
                }
                | lista_select {
                    $$ = new Array();
                    $$.push($1);
                }
                ;

lista_select    : select lista_select{
                    $$ = $2;
                    $$.push($1);    
                }
                | select {
                    $$ = new Array();
                    $$.push($1);
                }
                ;

select          : DIV list_op_select{
                    $$ = $2
                }
                ;

list_op_select  : DIV opcion_select {
                    if ($2.slc){
                        $2.slc.tipe = "//";
                        $$ = $2;
                    }else{
                        $2.tipe = "//";
                        $$ = $2;
                    }
                }
                | opcion_select {
                    if ($1.slc){
                        $1.slc.tipe = "/";
                        $$ = $1;
                    }else{
                        $1.tipe = "/";
                        $$ = $1;
                    }
                }
                ;

opcion_select   : ID otra_opcion_s {
                    if ($2.hasOwnProperty("axe")){
                        $2.axe = $1;
                        $$ = $2;
                    }else if ($2.slc){
                        $2.slc.id = $1;
                        $$ = $2;
                    }else{
                        $2.id = $1;
                        $$ = $2;
                    }
                }
                | ATR fin_opcion_s {
                    $$ = $2;
                }
                | MULTI {
                    $$ = new select.default("","*",false,@1.first_line,@1.first_column);
                }
                ;

otra_opcion_s   : CORA e CORC {
                    $$ = new predicate.default(new select.default("","",false,@1.first_line,@1.first_column,null),$2,@1.first_line,@1.first_column);
                }
                | DPTN DPTN axes_select {
                    $$ = $3;
                }
                | {
                    $$ = new select.default("","",false,@1.first_line,@1.first_column);
                }
                ;

axes_select     : ID {
                    $$ = new axes.default("","",$1,@1.first_line,@1.first_column);
                }
                | MULTI {
                    $$ = new axes.default("","","*",@1.first_line,@1.first_column);
                }
                ;

fin_opcion_s    : ID {
                    $$ = new select.default("",$1,true,@1.first_line,@1.first_column);
                }
                | MULTI {
                    $$ = new select.default("",null,true,@1.first_line,@1.first_column);
                }
                ;

e               : e MAS e {
                    $$ = new aritmetica.default($1,"+",$3,@1.first_line,@1.first_column,false);
                }
                | e MENOS e {
                    $$ = new aritmetica.default($1,"-",$3,@1.first_line,@1.first_column,false);
                }
                | e MULTI e {
                    $$ = new aritmetica.default($1,"*",$3,@1.first_line,@1.first_column,false);
                }
                | e DIV e {
                    $$ = new aritmetica.default($1,"/",$3,@1.first_line,@1.first_column,false);
                }
                | e MODULO e {
                    $$ = new aritmetica.default($1,"%",$3,@1.first_line,@1.first_column,false);
                }
                | MENOS e %prec UNARIO {
                    $$ = new aritmetica.default($2,"UNARIO",null,@1.first_line,@1.first_column,true);
                }
                | e MENORQUE e {
                    $$ = new relacional.default($1,"<",$3,@1.first_line,@1.first_column,false);
                }
                | e MAYORQUE e {
                    $$ = new relacional.default($1,">",$3,@1.first_line,@1.first_column,false);
                }
                | e MENORIGUAL e {
                    $$ = new relacional.default($1,"<=",$3,@1.first_line,@1.first_column,false);
                }
                | e MAYORIGUAL e {
                    $$ = new relacional.default($1,">=",$3,@1.first_line,@1.first_column,false);
                }
                | e IGUAL e {
                    $$ = new relacional.default($1,"=",$3,@1.first_line,@1.first_column,false);
                }
                | e IGUALIGUAL e {
                    $$ = new relacional.default($1,"=",$3,@1.first_line,@1.first_column,false);
                }
                | e DIFERENTE e {
                    $$ = new relacional.default($1,"!=",$3,@1.first_line,@1.first_column,false);
                }
                | e OR e {
                    $$ = new logica.default($1,"||",$3,@1.first_line,@1.first_column,false);
                }
                | e AND e {
                    $$ = new logica.default($1,"&&",$3,@1.first_line,@1.first_column,false);
                }
                | NOT e { 
                    $$ = new logica.default($2,"!",null,@1.first_line,@1.first_column,true);
                }
                | PARA e PARC {
                    $$ = $2;
                }
                | LAST PARA PARC {
                    $$ = new last.default(@1.first_line,@1.first_column);
                }
                | POSITION PARA PARC {
                    $$ = new position.default(@1.first_line,@1.first_column);
                }
                | ATR ID {
                    $$ = new filtro.default($2,@1.first_line,@1.first_column,true);
                }
                | NUM {
                    $$ = new primitivo.default(Number($1),@1.first_line,@1.first_column);
                }
                | CADENA {
                    $1 = $1.slice(1, $1.length-1);
                    $$ = new primitivo.default($1,@1.first_line,@1.first_column);
                }
                | ID{
                    $$ = new filtro.default($1,@1.first_line,@1.first_column,false);
                }
                | TRUE {
                    $$ = new primitivo.default(true,@1.first_line,@1.first_column);
                }
                | FALSE {
                    $$ = new primitivo.default(false,@1.first_line,@1.first_column);
                }
                ;
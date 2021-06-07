/* Area de imports */

%{
    const primitivo = require('../clases/expresiones/primitivo')
    const print = require('../clases/instrucciones/print')
    const ast_xpath = require('../clases/ast/ast_xpath')

    const aritmetica = require('../clases/expresiones/operaciones/aritmetica')
    const relacional = require('../clases/expresiones/operaciones/relacional')
    const logica = require('../clases/expresiones/operaciones/logica')
%}

/* Definicion lexica */

%lex
%options case-insensitive
%option yylineno

num         [0-9]+("."[0-9]+)?
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
cadena      (\"([^\"\\])*\")

%%

/* Comentarios */

"//".*              {/* Ignoro los comentarios simples */}
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}

/* Simbolos del programa */

/* Caracteres */
"("                    { return 'PARA' }
")"                    { return 'PARC' }

/* Operadores Aritmeticos */
"+"                    { return 'MAS'}
"-"                    { return 'MENOS'}
"*"                    { return 'MULTI'}
"/"                    { return 'DIV'}
"^"                    { return 'POTENCIA'}
"%"                    { return 'MODULO'}

/* Operaciones Relacionales */
"<="                   { return 'MENORIGUAL'}
">="                   { return 'MAYORIGUAL'}
"<"                    { return 'MENORQUE'}
">"                    { return 'MAYORQUE'}
"!="                   { return 'DIFERENTE'}
"=="                   { return 'IGUALIGUAL'}
"="                    { return 'IGUAL'}

/* Operaciones Logicas */
"||"                   { return 'OR'}
"&&"                   { return 'AND'}
"!"                    { return 'NOT'}

"true"                 { return 'TRUE'}
"false"                { return 'FALSE'}

"print"                { return 'PRINT' }

{num}                 { return 'NUM'}
{id}                  { return 'ID'}
{cadena}              { return 'CADENA'}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}

<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { console.log("Error lexico: " + yytext) }

/lex

/* Precedencia de operadores */
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'MENORIGUAL' 'MAYORIGUAL' 'IGUALIGUAL' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV' 'MODULO'
//%nonassoc 'POTENCIA'
%right 'UNARIO'

%start inicio

%% /* Gramatica */

inicio : lista_instrucciones EOF { console.log($1); $$ = new ast_xpath.default($1); return $$; }
    ;

lista_instrucciones : lista_instrucciones instruccion    { $$ = $1; $1.push($2) }
    | instruccion                                        { $$ = new Array(); $$.push($1) }
    ;

instruccion : PRINT PARA e PARC     { $$ = new print.default($3,@1.first_line,@1.first_column) }
    ;

e :  NUM                       { $$ = new primitivo.default(Number($1),@1.first_line,@1.first_column) }
    | CADENA                    { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1,@1.first_line,@1.first_column) }
    //| ID                        { $$ = new  }
    | TRUE                      { $$ = new primitivo.default(true,@1.first_line,@1.first_column) }
    | FALSE                     { $$ = new primitivo.default(false,@1.first_line,@1.first_column) }
    | e MAS e                   { $$ = new aritmetica.default($1,"+",$3,@1.first_line,@1.first_column,false) }
    | e MENOS e                 { $$ = new aritmetica.default($1,"-",$3,@1.first_line,@1.first_column,false) }
    | e MULTI e                 { $$ = new aritmetica.default($1,"*",$3,@1.first_line,@1.first_column,false) }
    | e DIV e                   { $$ = new aritmetica.default($1,"/",$3,@1.first_line,@1.first_column,false) }
    | e MODULO e                { $$ = new aritmetica.default($1,"%",$3,@1.first_line,@1.first_column,false) }
    | MENOS e %prec UNARIO      { $$ = new aritmetica.default($2,"UNARIO",null,@1.first_line,@1.first_column,true) } }
    | e MENORQUE e              { $$ = new relacional.default($1,"<",$3,@1.first_line,@1.first_column,false) }
    | e MAYORQUE e              { $$ = new relacional.default($1,">",$3,@1.first_line,@1.first_column,false) }
    | e MENORIGUAL e            { $$ = new relacional.default($1,"<=",$3,@1.first_line,@1.first_column,false) }
    | e MAYORIGUAL e            { $$ = new relacional.default($1,">=",$3,@1.first_line,@1.first_column,false) }
    | e IGUALIGUAL e            { $$ = new relacional.default($1,"==",$3,@1.first_line,@1.first_column,false) }
    | e DIFERENTE e             { $$ = new relacional.default($1,"!=",$3,@1.first_line,@1.first_column,false) }
    | e OR e                    { $$ = new logica.default($1,"||",$3,@1.first_line,@1.first_column,false) }
    | e AND e                   { $$ = new logica.default($1,"&&",$3,@1.first_line,@1.first_column,false) }
    | NOT e                     { $$ = new logica.default($2,"!",null,@1.first_line,@1.first_column,true) }
    ;

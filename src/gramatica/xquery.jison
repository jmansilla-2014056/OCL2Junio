/* Area de imports */
%{

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
"upper"                 { return 'UPPER' }
"case"                  { return 'CASE' }
"substring"             { return 'SUBSTR' }
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
.                       { console.log("error lexico",yylineno); }

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

inicio          : lista_xquery EOF {}
                ;

lista_xquery    : lista_xquery opcion_xquery
                | opcion_xquery
                ;

opcion_xquery   : lista_nodos {}
                | e {}
                | opcion_if {}
                | opcion_let {}
                | opcion_xpath {}
                | opcion_function {}
                | opcion_let opcion_return {}
                | opcion_for opcion_return {}
                | opcion_let opcion_for opcion_return {}
                | opcion_let opcion_where opcion_return {}
                | opcion_let opcion_order opcion_return {}
                | opcion_for opcion_let opcion_return {}
                | opcion_for opcion_where opcion_return {}
                | opcion_for opcion_order opcion_return {}
                | opcion_let opcion_for opcion_where opcion_return {}
                | opcion_let opcion_where opcion_order opcion_return {}
                | opcion_for opcion_let opcion_where opcion_return {}
                | opcion_for opcion_where opcion_order opcion_return {}
                | opcion_let opcion_for opcion_where opcion_order opcion_return {}
                | opcion_for opcion_let opcion_where opcion_order opcion_return {}
                ;

/* instruccion html */
lista_nodos     : lista_nodos nodo
                | nodo
                ;

nodo            : MENORQUE ID MAYORQUE lista_nodos MENORQUE DIV ID MAYORQUE {}
                | MENORQUE ID MAYORQUE lista_valor MENORQUE DIV ID MAYORQUE {}
                | MENORQUE ID MAYORQUE LLAVEA lista_xquery LLAVEC MENORQUE DIV ID MAYORQUE {}
                ;

/* instruccion let */
opcion_let      : LET VAR DPTN IGUAL range_let {}
                ;

range_let       : PARA e TO e PARC {}
                | e {}
                | PARA opcion_function PARC {}
                ;

/* instruccion for */
opcion_for      : FOR range_for {}
                ;

range_for       : range_for COMA range_for {}
                | VAR IN opcion_xpath {}
                | VAR IN VAR {}
                | VAR IN VAR opcion_xpath {}
                | VAR AT VAR IN opcion_xpath {}
                | VAR AT VAR IN VAR {}
                | VAR AT VAR IN VAR opcion_xpath {}
                | VAR IN PARA e COMA e PARC {}
                | VAR IN PARA e TO e PARC {}
                | VAR AT VAR IN PARA e COMA e PARC {}
                | VAR AT VAR IN PARA e TO e PARC {}
                ;

/* instruccion where */
opcion_where    : WHERE VAR opcion_xpath {}
                | WHERE VAR {}
                ;

/* instruccion order by */
opcion_order    : ORDER BY VAR opcion_xpath {}
                | ORDER BY VAR {}
                ;

/* instruccion return */
opcion_return   : RETURN sub_return{}
                ;

sub_return      : sub_return range_return {}
                | range_return {}
                ;

range_return    : VAR {}
                | VAR opcion_xpath {}
                | PARA e PARC {}
                | PARA opcion_function PARC {}
                | LLAVEA VAR LLAVEC {}
                | DATA PARA VAR PARC {}
                | e LLAVEA VAR LLAVEC {}
                | LLAVEA VAR opcion_xpath LLAVEC {}
                | DATA PARA VAR opcion_xpath PARC {}
                | e LLAVEA VAR opcion_xpath LLAVEC {}
                | LLAVEA DATA PARA VAR PARC LLAVEC {}
                | e LLAVEA DATA PARA VAR PARC LLAVEC {}
                | LLAVEA DATA PARA VAR opcion_xpath PARC LLAVEC {}
                | e LLAVEA DATA PARA VAR opcion_xpath PARC LLAVEC {}
                | MENORQUE ID MAYORQUE sub_return MENORQUE DIV ID MAYORQUE {}
                ;

/* instruccion function */
opcion_function : DECLARE FUNCTION ID DPTN ID PARA range_function PARC AS XS DPTN types LLAVEA lista_xquery LLAVEC PTCOMA {}
                | DECLARE FUNCTION ID DPTN ID PARA range_function PARC LLAVEA lista_xquery LLAVEC PTCOMA {}
                | DECLARE FUNCTION ID DPTN ID PARA PARC AS XS DPTN types LLAVEA lista_xquery LLAVEC PTCOMA {}
                | DECLARE FUNCTION ID DPTN ID PARA PARC LLAVEA lista_xquery LLAVEC PTCOMA {}
                | ID DPTN ID PARA parametros PARC {}
                | function_nativa {}
                ;

range_function  : range_function COMA range_function {}
                | VAR AS XS DPTN types {}
                ;

function_nativa : SUBSTR PARA parametros PARC {}
                | UPPER MENOS CASE PARA parametros PARC {}
                ;

parametros      : parametros COMA parametros {}
                | e {}
                | VAR {}
                | VAR opcion_xpath {}
                ;

/* tipos para las funciones */
types           : STRING QUESTION {}
                | INTEGER QUESTION {}
                | DECIMAL QUESTION {}
                | DOUBLE QUESTION {}
                | BOOLEAN QUESTION {}
                | STRING {}
                | INTEGER {}
                | DECIMAL {}
                | DOUBLE
                | BOOLEAN {}
                ;

lista_valor     : lista_valor ID {}
                | ID
                ;

/* instruccion if */
opcion_if       : IF PARA e PARC THEN lista_xquery {}
                | IF PARA e PARC THEN lista_xquery ELSE lista_xquery {}
                | IF PARA e PARC THEN lista_xquery ELSE opcion_if {}
                ;

/* instrucciones xpath */
opcion_xpath    : lista_several SEVERAL lista_select {}
                | lista_select {}
                ;

lista_select    : lista_select select {}
                | select {}
                ;

select          : DIV ID {}
                | DIV DIV ID {}
                | DIV ATR ID {}
                | DIV DIV ATR ID {}
                | DIV MULTI {}
                | DIV DIV MULTI {}
                | DIV ATR MULTI {}
                | DIV DIV ATR MULTI {}//SELECT + FILTRO
                | DIV ID CORA e CORC {}
                | DIV e {}
                | DIV DIV ID CORA e CORC {}//SELECT AXES
                | DIV ID DPTN DPTN ID {}
                | DIV ID DPTN DPTN MULTI {}
                | DIV DIV ID DPTN DPTN ID {}
                | DIV DIV ID DPTN DPTN MULTI {}//SELECT AXES + FILTRO
                | DIV ID DPTN DPTN ID CORA e CORC {}
                | DIV DIV ID DPTN DPTN ID CORA e CORC {}//SELECTING . OR ..
                | DIV PTN {}
                | DIV DIV PTN {}
                | DIV PTN PTN {}
                | DIV DIV PTN PTN {}//NODE
                | DIV ID PARA PARC {}
                | DIV DIV ID PARA PARC {}
                ;

e               : e MAS e {}
                | e MENOS e {}
                | e MULTI e {}
                | e DIVS e {}
                | e MODULO e {}
                | MENOS e %prec UNARIO {} 
                | e MENORQUE e {}
                | e MAYORQUE e {}
                | e MENORIGUAL e {}
                | e MAYORIGUAL e {}
                | e IGUAL e {}
                | e IGUALIGUAL e {}
                | e DIFERENTE e {}
                | e IGUALU e {}
                | e DIFERENTEU e {}
                | e MENORQUEIU e {}
                | e MENORQUEU e {}
                | e MAYORQUEIU e {}
                | e MAYORQUEU e {}
                | e OR e {}
                | e AND e {}
                | NOT e {}
                | PARA e PARC {} 
                | LAST PARA PARC {} 
                | POSITION PARA PARC {} 
                | ATR ID {}
                | NUM {}
                | CADENA {} 
                | ID {}
                | VAR {}
                | TRUE {}
                | FALSE {}
                | opcion_function {}
                ;
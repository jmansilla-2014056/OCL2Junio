/* Area de imports */

%{
    const nodo_xml = require('../clases/nodo_xml');
    const atr_xml = require('../clases/atr_xml');
    const rep_error = require('../reports/ReportController')

%}


%lex
%options case-insensitive
%option yylineno

/* Definicion lexica */

num         [0-9]+("."[0-9]+)?
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
cadena      (\"([^\"\\])*\")

especiales  (
"!"|
"¡"|
")"|
"("|
"["|
"]"|
"%"|
"?"|
"¿"|
"$"|
"#"|
","|
"-"|
"."|
" "|
[\s\r\n\t])
others      (\n\s*)
%%

((\/\*)[^\*\/]*(\*\/))  /* */
[ \\\t\r\n\f]           /* */
\s+                     /* skip whitespace */
(\/\/[^\n]*)            /* */

/* Simbolos del programa */

"<"                   { return 'INI'}
"/"                   { return 'CIERRE'}
">"                   { return 'FIN'}
"="                   { return 'IGUAL'}
{num}                 { return 'NUM'}
{id}                  { return 'ID'}
({id}|{especiales}|{others}|{num})*{id} {console.log("SI ENTRE2"); return 'ID2'}
({id}|{especiales}|{others}|{num})*{num} {console.log("SI ENTRE2"); return 'ID2'}
({id}|{especiales}|{others}|{num})*{especiales} {console.log("SI ENTRE2"); return 'ID2'}
{cadena}              { return 'CADENA'}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}

<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { rep_error.InsertarError("lexico", yytext, yylloc.first_line, yylloc.first_column); console.log(`Error lexico ${yytext}`) }

/lex

%start inicio

%% /* Gramatica */

inicio : INI ID FIN lista_nodos INI CIERRE ID FIN EOF  { $$ = new nodo_xml.default($2,[],"",$4); console.log("SE ACTUALIZA???"); return $$;  }
    ;

lista_nodos : lista_nodos nodo  { $$ = $1; $$.push($2) }
    | nodo  { $$ = new Array(); $$.push($1) }
    ;

nodo : INI ID FIN lista_valor INI CIERRE ID FIN  { $$ = new nodo_xml.default($2,[],$4,[]) }
    | INI ID FIN lista_nodos INI CIERRE ID FIN  { $$ = new nodo_xml.default($2,[],"",$4) }
    | INI ID lista_atributos FIN lista_valor INI CIERRE ID FIN  { $$ = new nodo_xml.default($2,$3,$5,[]) }
    | INI ID lista_atributos FIN lista_nodos INI CIERRE ID FIN  { $$ = new nodo_xml.default($2,$3,"",$5) }

    ;

lista_atributos : lista_atributos atributos { $$ = $1; $$.push($2) }
    | atributos { $$ = new Array(); $$.push($1) }
    ;

atributos : ID IGUAL valor  { $$ = new atr_xml.default($1,$3) }
    ;

valor : CADENA  { $1 = $1.slice(1, $1.length-1); $$ = $1 }
    | NUM       { $$ = $1 }
    ;

lista_valor : lista_valor ID2    { $$ = $1 + " " + $2 }
    | lista_valor ID    { $$ = $1 + " " + $2 }
    | lista_valor NUM           { $$ = $1 + " " + $2 }
    | ID                        { $$ = $1 }
    | ID2                        { $$ = $1 }
    | NUM                       { $$ = $1 }
    ;

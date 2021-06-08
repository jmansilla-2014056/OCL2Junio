/* Area de imports */

%{
    const nodo_xml = require('../clases/xml/nodo_xml');
    const atr_xml = require('../clases/xml/atr_xml');
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
";"|
" "|
[\s\r\n\t])
others      (\n\s*)

%%

/*COMENTARIOS*/

[<][!][-][-][^-<]*[-][-][>]                 /*skip comments*/

((\/\*)[^\*\/]*(\*\/))  /* */
[ \\\t\r\n\f]           /* */
\s+                     /* skip whitespace */
(\/\/[^\n]*)            /* */

/* Simbolos del programa */

"<"                   { return 'INI'}
"/"                   { return 'CIERRE'}
">"                   { return 'FIN'}
"="                   { return 'IGUAL'}
"?"                   { return 'INTERROGAC'}
"xml"                 { return 'XML' }
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
.                     { rep_error.InsertarError("lexico", yytext, "xml", yylloc.first_line, yylloc.first_column); console.log(`Error lexico ${yytext}`) }

/lex

%start inicio

%% /* Gramatica */

inicio : encoding etiqueta { $$ = { "encoding": $1, "etiqueta": $2}; return $$ }
    ;

encoding: INI INTERROGAC XML lista_atributos INTERROGAC FIN { $$ = new nodo_xml.default("encoding",$4,"",[],@1.first_line,@1.first_column,null) }
    ;

etiqueta : INI ID FIN lista_nodos INI CIERRE ID FIN EOF  { $$ = new nodo_xml.default($2,[],"",$4,@1.first_line,@1.first_column,$7); console.log("SE ACTUALIZA???") }
    ;

ERROR_SINTACTIO  : error FIN { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column);}
                 | error CIERRE ID FIN{ rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column);}
                 | error INI { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column);}
;

lista_nodos : lista_nodos nodo  { $$ = $1; $$.push($2) }
    | nodo  { $$ = new Array(); $$.push($1) }
    ;

nodo : INI ID FIN lista_valor INI CIERRE ID FIN  { $$ = new nodo_xml.default($2,[],$4,[],@1.first_line,@1.first_column,$7) }
    | INI ID FIN lista_nodos INI CIERRE ID FIN  { $$ = new nodo_xml.default($2,[],"",$4,@1.first_line,@1.first_column,$7) }
    | INI ID lista_atributos FIN lista_valor INI CIERRE ID FIN  { $$ = new nodo_xml.default($2,$3,$5,[],@1.first_line,@1.first_column,$8) }
    | INI ID lista_atributos FIN lista_nodos INI CIERRE ID FIN  { $$ = new nodo_xml.default($2,$3,"",$5,@1.first_line,@1.first_column,$8) }
    //| INI ID CIERRE FIN     { $$ = new nodo_xml.default($2,[],"",[]) }
    | INI ID lista_atributos CIERRE FIN     { $$ = new nodo_xml.default($2,$3,"",[],@1.first_line,@1.first_column,null) }
    | ERROR_SINTACTIO { $$ = new nodo_xml.default("recuparado",[],"",[])  }
    ;

lista_atributos : lista_atributos atributos { $$ = $1; $$.push($2) }
    | atributos { $$ = new Array(); $$.push($1) }
    ;

atributos : ID IGUAL valor  { $$ = new atr_xml.default($1,$3,@1.first_line,@1.first_column) }
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

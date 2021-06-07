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
id          [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
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

((\/\*)[^\*\/]*(\*\/))  /* */
[ \\\t\r\n\f]           /* */
\s+                     /* skip whitespace */
(\/\/[^\n]*)            /* */

/* Simbolos del programa */

"<"                                             { return 'INI'}
"/"                                             { return 'CIERRE'}
">"                                             { return 'FIN'}
"="                                             { return 'IGUAL'}
{num}                                           { return 'NUM'}
{id}                                            { return 'ID'}
({id}|{especiales}|{others}|{num})*{id}         {console.log("SI ENTRE2"); return 'ID2'}
({id}|{especiales}|{others}|{num})*{num}        {console.log("SI ENTRE2"); return 'ID2'}
({id}|{especiales}|{others}|{num})*{especiales} {console.log("SI ENTRE2"); return 'ID2'}
{cadena}                                        { return 'CADENA'}

/* Espacios */
[\s\r\n\t]                                      {/* skip whitespace */}

<<EOF>>                                         return 'EOF'

/* Errores lexicos */
.                                               { rep_error.InsertarError("lexico", yytext, "xml", yylloc.first_line, yylloc.first_column); console.log(`Error lexico ${yytext}`) }

/lex

%start inicio

%% /* Gramatica */
inicio          : INI ID FIN lista_nodos INI CIERRE ID FIN EOF { $$ = new nodo_xml.default($2,[],"",$4); console.log("SE ACTUALIZA???"); return $$;  }
                ;

error_sintactio : error tipo_error_sinc
                ;

tipo_error_sinc : FIN { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                | CIERRE ID FIN { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                | INI { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                ;

lista_nodos     : lista_nodos nodo { $$ = $1; $$.push($2) }
                | nodo { $$ = new Array(); $$.push($1) }
                ;

nodo            : INI ID opcion_nodo { $3.id = $2;$$ = $3 }
                ;

opcion_nodo     : cierre_nodo { $$ = $1 }
                | lista_atributos cierre_nodo { $2.atributos = $1;$$ = $2 }
                ;

cierre_nodo     : FIN cuerpo_nodo { $$ = $2 }
                ;

cuerpo_nodo     : lista_valor INI CIERRE ID FIN { $$ = new nodo_xml.default("",[],$1,[],@1.first_line,@1.first_column) }
                | lista_nodos INI CIERRE ID FIN { $$ = new nodo_xml.default("",[],"",$1,@1.first_line,@1.first_column) }
                | error_sintactio { $$ = new nodo_xml.default("recuparado",[],"",[])  }
                ;

lista_atributos : atributos lista_atributos { $$ = $2; $$.push($1) }
                | atributos { $$ = new Array(); $$.push($1) }
                ;

atributos       : ID IGUAL valor { $$ = new atr_xml.default($1,$3,@1.first_line,@1.first_column) }
                ;

valor           : CADENA { $1 = $1.slice(1, $1.length-1); $$ = $1 }
                | NUM { $$ = $1 }
                ;

lista_valor     : tipo_valor lista_valor { $$ = $1 + " " + $2 }
                | tipo_valor { $$ = $1 }
                ;

tipo_valor      : ID  { $$ = $1 }
                | ID2 { $$ = $1 }
                | NUM { $$ = $1 }
                ;
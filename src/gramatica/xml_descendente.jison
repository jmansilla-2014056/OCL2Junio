/* Area de imports */
%{
    const nodo_xml = require('../clases/xml/nodo_xml');
    const atr_xml = require('../clases/xml/atr_xml');
    const rep_error = require('../reports/ReportController')
    const ast_nodo = require('../reports/ASTNodo')

    let lista_nodos_ = new ast_nodo.default("lista_nodos0","");
    let nodo_ = new ast_nodo.default("nodo","");
    let opcion_nodo_ = new ast_nodo.default("opcion_nodo","");
    let ciere_nodo_ = new ast_nodo.default("cierre_nodo","");
    let lista_atributos_ = new ast_nodo.default("lista_atributos","");
    let cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","");
    let lista_valor_ = new ast_nodo.default("lista_valor","");
    let atributos_ = new ast_nodo.default("atributos","");

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
inicio          : INI ID FIN lista_nodos INI CIERRE ID FIN EOF { $$ = new nodo_xml.default($2,[],"",$4);
                    var inicio_ = new ast_nodo.default("inicio","");
                    inicio_.InsertarUnNodo("INI", $1);
                    inicio_.InsertarUnNodo("ID", $2);
                    inicio_.InsertarUnNodo("FIN", $3);
                    inicio_.InsertarHijo(lista_nodos_);
                    inicio_.InsertarUnNodo("INI", $5);
                    inicio_.InsertarUnNodo("CIERRE", $6);
                    inicio_.InsertarUnNodo("ID", $7);
                    return $$;
                    }
                ;

error_sintactio : error tipo_error_sinc
                ;

tipo_error_sinc : FIN { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                | CIERRE ID FIN { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                | INI { rep_error.InsertarError("Sintactico", "Se encontro un error cerca de token: " + yytext, "xml", this._$.first_line, this._$.first_column) }
                ;

lista_nodos     : lista_nodos nodo { $$ = $1; $$.push($2);
                          let tempA = new ast_nodo.default("lista_nodosA","");
                          tempA.InsertarHijo(nodo_);
                          lista_nodos_.InsertarHijo(tempA);
                          }
                | nodo { $$ = new Array(); $$.push($1);
                          lista_nodos_.InsertarHijo(nodo_)
                          let tempB = new ast_nodo.default("lista_nodosA","");
                          tempB.InsertarHijo(lista_nodos_);
                          lista_nodos_ = tempB;
                }
                ;

nodo            : INI ID opcion_nodo { $3.id = $2;$$ = $3;
                                        nodo_ = new ast_nodo.default("nodo","");
                                        nodo_.InsertarUnNodo("INI", $1);
                                        nodo_.InsertarUnNodo("ID", $2);
                                        nodo_.InsertarHijo(opcion_nodo_);
                                        }
                ;

opcion_nodo     : cierre_nodo { $$ = $1;
                    opcion_nodo_ = new ast_nodo.default("opcion_nodo","");
                    opcion_nodo_.InsertarHijo(cierre_nodo_);
                     }
                | lista_atributos cierre_nodo { $2.atributos = $1;$$ = $2;
                     cierre_nodo_.InsertarHijo(lista_atributos_);
                     opcion_nodo_.InsertarHijo(cierre_nodo_);
                     }
                ;

cierre_nodo     : FIN cuerpo_nodo { $$ = $2;
                  cierre_nodo_ = new ast_nodo.default("cierre_nodo","");
                  cierre_nodo_.InsertarHijo(cuerpo_nodo_);
                  ;
                  }
                ;

cuerpo_nodo     : lista_valor INI CIERRE ID FIN { $$ = new nodo_xml.default("",[],$1,[],@1.first_line,@1.first_column)
                    cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","");
                    cuerpo_nodo_.InsertarUnNodo("Valor", $1); alert($1);
                    cuerpo_nodo_.InsertarUnNodo("INI", $2);
                    cuerpo_nodo_.InsertarUnNodo("CIERRE", $3);
                    cuerpo_nodo_.InsertarUnNodo("ID", $4);
                    cuerpo_nodo_.InsertarUnNodo("FIN", $5);
                    }
                | lista_nodos INI CIERRE ID FIN { $$ = new nodo_xml.default("",[],"",$1,@1.first_line,@1.first_column)
                    cuerpo_nodo_ = new ast_nodo.default("cuerpo_nodo","");
                    cuerpo_nodo_.InsertarHijo(lista_nodos_);
                    cuerpo_nodo_.InsertarUnNodo("INI", $2);
                    cuerpo_nodo_.InsertarUnNodo("CIERRE", $3);
                    cuerpo_nodo_.InsertarUnNodo("ID", $4);
                    cuerpo_nodo_.InsertarUnNodo("FIN", $5);
                  }
                | error_sintactio { $$ = new nodo_xml.default("recuparado",[],"",[])  }
                ;

lista_atributos : atributos lista_atributos { $$ = $2; $$.push($1)
                      lista_atributos_.InsertarHijo(atributos_);
                      }
                | atributos { $$ = new Array(); $$.push($1);
                      lista_atributos_ = new ast_nodo.default("lista_atributos","");
                }
                ;

atributos       : ID IGUAL valor { $$ = new atr_xml.default($1,$3,@1.first_line,@1.first_column);
                      atributos_ = new ast_nodo.default("atributos","");
                      atributos_.InsertarUnNodo("ID", $1);
                      atributos_.InsertarUnNodo("IGUAL", $2);
                      atributos_.InsertarUnNodo("VALOR", $3);
                      }
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

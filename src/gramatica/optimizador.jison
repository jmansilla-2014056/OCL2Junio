/* Area de imports */

%{
      const clase_declaraciones = require('../clases/optimizador/declaraciones');
      const clase_declaracion = require('../clases/optimizador/declaracion');
%}


%lex
%options case-insensitive
%option yylineno

/* Definicion lexica */
num     [0-9]+("."[0-9]+)?
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
cadena  (\"([^\"\\])*\")

%%

/*COMENTARIOS*/

[#][^\n]*           /* skip
[<][!][-][-][^-<]*[-][-][>]                 /*skip comments*/
((\/\*)[^\*\/]*(\*\/))  /* */
[ \\\t\r\n\f]           /* */
\s+                     /* skip whitespace */
(\/\/[^\n]*)            /* */


/* Simbolos del programa */
";"                   return 'PUNTOCOMA'
":"                   return 'DOS_PUNTOS'
"{"                   return 'LLAVE_ABRE';
"}"                   return 'LLAVE_CIERRA';
"("                   return 'PAR_ABRE';
")"                   return 'PAR_CIERRA';
"["                   return 'COR_ABRE';
"]"                   return 'COR_CIERRA';
","                   return 'COMA';

"<="                  return 'LOGICA';
"<"                   return 'LOGICA';
"=="                  return 'LOGICA';
">="                  return 'LOGICA';
">"                   return 'LOGICA';
"!="                  return 'LOGICA';

"+"                   return 'OPERACION';
"-"                   return 'OPERACION';
"/"                   return 'OPERACION';
"*"                   return 'OPERACION';
"%"                   return 'OPERACION';

"void"                return 'VOID';
"goto"                return 'GOTO';
"int"                 return 'TIPO';
"float"               return 'TIPO';
"double"              return 'TIPO';
"char"                return 'TIPO';
"if"                  return 'IF';

{num}                 return 'NUM';
{id}                  return 'ID';
{TIPO}({ID}{COMA})+   return 'LD'

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}

<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { rep_error.InsertarError("lexico", yytext, "xml", yylloc.first_line, yylloc.first_column); console.log(`Error lexico ${yytext}`) }

/lex

%start inicio

%% /* Gramatica */

inicio              : declaraciones metodos EOF { $$ = new clase_declaraciones.default($1); console.log($$.getText()); return $$;}
                    ;

declaraciones       : declaraciones declaracion { $$ = $1; $$.push($2);}
                    | declaracion { $$ = []; $$.push($1); }
                    ;

declaracion         : TIPO ID COR_ABRE NUM COR_CIERRA PUNTOCOMA { $$ = new clase_declaracion.default($1, $2 + "[" + $4 + "]"); }
                    | TIPO ID PUNTOCOMA { $$ = new clase_declaracion.default($1, $2); }
                    | TIPO ID COMA lista_comas ID PUNTOCOMA { $$ = new clase_declaracion.default($1, $2 + " ," + $4 + $5);  }
                    | TIPO ID COMA ID PUNTOCOMA { $$ = new clase_declaracion.default($1, $2+$3+$4);}
                    ;

lista_comas         : lista_comas ID COMA  { $$ = $1; $$+= $2+' '+$3 }
                    | ID COMA { $$=''; $$ += $1+' '+$2 }
                    ;





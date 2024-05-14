(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(c){function e(j){return new RegExp("^(("+j.join(")|(")+"))\\b")}var h=e(["and","or","not","is"]);var i=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in"];var d=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];var b={builtins:["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"],keywords:["exec","print"]};var a={builtins:["ascii","bytes","exec","print"],keywords:["nonlocal","False","True","None","async","await"]};c.registerHelper("hintWords","python",i.concat(d));function g(j){return j.scopes[j.scopes.length-1]}c.defineMode("python",function(s,B){var k="error";var w=B.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.]/;var j=B.doubleOperators||/^([!<>]==|<>|<<|>>|\/\/|\*\*)/;var q=B.doubleDelimiters||/^(\+=|\-=|\*=|%=|\/=|&=|\|=|\^=)/;var C=B.tripleDelimiters||/^(\/\/=|>>=|<<=|\*\*=)/;if(B.version&&parseInt(B.version,10)==3){var v=B.singleOperators||/^[\+\-\*\/%&|\^~<>!@]/;var p=B.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/}else{var v=B.singleOperators||/^[\+\-\*\/%&|\^~<>!]/;var p=B.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/}var l=B.hangingIndent||s.indentUnit;var A=i,x=d;if(B.extra_keywords!=undefined){A=A.concat(B.extra_keywords)}if(B.extra_builtins!=undefined){x=x.concat(B.extra_builtins)}if(B.version&&parseInt(B.version,10)==3){A=A.concat(a.keywords);x=x.concat(a.builtins);var t=new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))","i")}else{A=A.concat(b.keywords);x=x.concat(b.builtins);var t=new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")}var r=e(A);var m=e(x);function E(J,I){if(J.sol()&&g(I).type=="py"){var F=g(I).offset;if(J.eatSpace()){var G=J.indentation();if(G>F){u(J,I,"py")}else{if(G<F&&n(J,I)){I.errorToken=true}}return null}else{var H=y(J,I);if(F>0&&n(J,I)){H+=" "+k}return H}}return y(J,I)}function y(J,I){if(J.eatSpace()){return null}var H=J.peek();if(H=="#"){J.skipToEnd();return"comment"}if(J.match(/^[0-9\.]/,false)){var G=false;if(J.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)){G=true}if(J.match(/^\d+\.\d*/)){G=true}if(J.match(/^\.\d+/)){G=true}if(G){J.eat(/J/i);return"number"}var F=false;if(J.match(/^0x[0-9a-f]+/i)){F=true}if(J.match(/^0b[01]+/i)){F=true}if(J.match(/^0o[0-7]+/i)){F=true}if(J.match(/^[1-9]\d*(e[\+\-]?\d+)?/)){J.eat(/J/i);F=true}if(J.match(/^0(?![\dx])/i)){F=true}if(F){J.eat(/L/i);return"number"}}if(J.match(t)){I.tokenize=z(J.current());return I.tokenize(J,I)}if(J.match(C)||J.match(q)){return"punctuation"}if(J.match(j)||J.match(v)){return"operator"}if(J.match(w)){return"punctuation"}if(I.lastToken=="."&&J.match(p)){return"property"}if(J.match(r)||J.match(h)){return"keyword"}if(J.match(m)){return"builtin"}if(J.match(/^(self|cls)\b/)){return"variable-2"}if(J.match(p)){if(I.lastToken=="def"||I.lastToken=="class"){return"def"}return"variable"}J.next();return k}function z(F){while("rub".indexOf(F.charAt(0).toLowerCase())>=0){F=F.substr(1)}var H=F.length==1;var G="string";function I(K,J){while(!K.eol()){K.eatWhile(/[^'"\\]/);if(K.eat("\\")){K.next();if(H&&K.eol()){return G}}else{if(K.match(F)){J.tokenize=E;return G}else{K.eat(/['"]/)}}}if(H){if(B.singleLineStringErrors){return k}else{J.tokenize=E}}return G}I.isString=true;return I}function u(I,G,F){var H=0,J=null;if(F=="py"){while(g(G).type!="py"){G.scopes.pop()}}H=g(G).offset+(F=="py"?s.indentUnit:l);if(F!="py"&&!I.match(/^(\s|#.*)*$/,false)){J=I.column()+1}G.scopes.push({offset:H,type:F,align:J})}function n(G,F){var H=G.indentation();while(g(F).offset>H){if(g(F).type!="py"){return true}F.scopes.pop()}return g(F).offset!=H}function D(J,H){var G=H.tokenize(J,H);var I=J.current();if(I=="@"){if(B.version&&parseInt(B.version,10)==3){return J.match(p,false)?"meta":"operator"}else{return J.match(p,false)?"meta":k}}if((G=="variable"||G=="builtin")&&H.lastToken=="meta"){G="meta"}if(I=="pass"||I=="return"){H.dedent+=1}if(I=="lambda"){H.lambda=true}if(I==":"&&!H.lambda&&g(H).type=="py"){u(J,H,"py")}var F=I.length==1?"[({".indexOf(I):-1;if(F!=-1){u(J,H,"])}".slice(F,F+1))}F="])}".indexOf(I);if(F!=-1){if(g(H).type==I){H.scopes.pop()}else{return k}}if(H.dedent>0&&J.eol()&&g(H).type=="py"){if(H.scopes.length>1){H.scopes.pop()}H.dedent-=1}return G}var o={startState:function(F){return{tokenize:E,scopes:[{offset:F||0,type:"py",align:null}],lastToken:null,lambda:false,dedent:0}},token:function(I,G){var H=G.errorToken;if(H){G.errorToken=false}var F=D(I,G);if(F&&F!="comment"){G.lastToken=(F=="keyword"||F=="punctuation")?I.current():F}if(F=="punctuation"){F=null}if(I.eol()&&G.lambda){G.lambda=false}return H?F+" "+k:F},indent:function(I,F){if(I.tokenize!=E){return I.tokenize.isString?c.Pass:0}var H=g(I);var G=F&&F.charAt(0)==H.type;if(H.align!=null){return H.align-(G?1:0)}else{if(G&&I.scopes.length>1){return I.scopes[I.scopes.length-2].offset}else{return H.offset}}},closeBrackets:{triples:"'\""},lineComment:"#",fold:"indent"};return o});c.defineMIME("text/x-python","python");var f=function(j){return j.split(" ")};c.defineMIME("text/x-cython",{name:"python",extra_keywords:f("by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE")})});
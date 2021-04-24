/*!
 * @version 7c5fba7
 * 
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"8Ab+":function(t,n,r){(n=t.exports=r("JPst")(!1)).push([t.i,".buttons-root-3lJ {\n    max-width: 100%;\n}\n.buttons-root-3lJ > div {\n    display: inline-block;\n    margin-bottom: 0.5rem;\n    max-width: 100%;\n}\n.buttons-root-3lJ button[class] {\n    max-width: 100%;\n    overflow: hidden;\n    min-width: var(--buttonMinWidth);\n}\n.buttons-stacked-1pN {\n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: column;\n}\n.buttons-inline-3IH > div {\n    margin-inline-end: 0.5rem;\n}\n",""]),n.locals={root:"buttons-root-3lJ",stacked:"buttons-stacked-1pN",inline:"buttons-inline-3IH"}},fwGW:function(t,n,r){"use strict"
r.r(n),r.d(n,"default",function(){return w})
var e=r("RIqP"),o=r.n(e),i=r("MVZn"),a=r.n(i),s=r("J4zp"),l=r.n(s),d=r("q1tI"),u=r.n(d),c=r("LboF"),f=r.n(c),g=r("8Ab+"),p=r.n(g),b={injectType:"singletonStyleTag",insert:"head",singleton:!0},m=(f()(p.a,b),p.a.locals||{}),y=r("17x9"),h=r("y1Xp")
function _createForOfIteratorHelper(t,r){var o
if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(o=function _unsupportedIterableToArray(t,n){if(!t)return
if("string"==typeof t)return _arrayLikeToArray(t,n)
var r=Object.prototype.toString.call(t).slice(8,-1)
"Object"===r&&t.constructor&&(r=t.constructor.name)
if("Map"===r||"Set"===r)return Array.from(t)
if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _arrayLikeToArray(t,n)}(t))||r&&t&&"number"==typeof t.length){o&&(t=o)
var i=0,a=function F(){}
return{s:a,n:function n(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function e(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,d=!0,u=!1
return{s:function s(){o=t[Symbol.iterator]()},n:function n(){var t=o.next()
return d=t.done,t},e:function e(t){u=!0,l=t},f:function f(){try{d||null==o.return||o.return()}finally{if(u)throw l}}}}function _arrayLikeToArray(t,n){(null==n||n>t.length)&&(n=t.length)
for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r]
return e}var v=function Buttons(t){var n=Object(h.a)(m,t.classes),r=t.appearance,e=t.isSameWidth,i=t.textAlign,s=t.border,c=t.borderColor,f=t.borderWidth,g=t.borderRadius,p=t.marginTop,b=t.marginRight,y=t.marginBottom,v=t.marginLeft,w=t.paddingTop,x=t.paddingRight,A=t.paddingBottom,T=t.paddingLeft,j=t.children,O=t.cssClasses,k=void 0===O?[]:O,L=n["".concat(r)],R=Object(d.useRef)(null),S=u.a.useState(0),I=l()(S,2),W=I[0],C=I[1],J={"--buttonMinWidth":W?W+"px":null},B=a()({border:s,borderColor:c,borderWidth:f,borderRadius:g,marginTop:p,marginRight:b,marginBottom:y,marginLeft:v,paddingTop:w,paddingRight:x,paddingBottom:A,paddingLeft:T},J)
Object(d.useLayoutEffect)(function(){if(e){var t,n=0,r=_createForOfIteratorHelper(R.current.querySelectorAll("button"))
try{for(r.s();!(t=r.n()).done;){var o=t.value.offsetWidth
o>n&&(n=o)}}catch(t){r.e(t)}finally{r.f()}C(n)}},[e])
return B.justifyContent="flex-start",i&&(B.justifyContent={left:"flex-start",center:"center",right:"flex-end"}[i]||"flex-start",B.textAlign=i),u.a.createElement("div",{ref:R,style:B,className:[n.root,L].concat(o()(k)).join(" ")},j)}
v.propTypes={appearance:Object(y.oneOf)(["inline","stacked"]),classes:Object(y.shape)({root:y.string,stacked:y.string,inline:y.string}),isSameWidth:y.bool,textAlign:y.string,border:y.string,borderColor:y.string,borderWidth:y.string,borderRadius:y.string,marginTop:y.string,marginRight:y.string,marginBottom:y.string,marginLeft:y.string,paddingTop:y.string,paddingRight:y.string,paddingBottom:y.string,paddingLeft:y.string,cssClasses:Object(y.arrayOf)(y.string)}
var w=v}}])

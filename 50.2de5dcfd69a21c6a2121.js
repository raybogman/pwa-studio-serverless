/*!
 * @version 7c5fba7
 * 
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{TN8f:function(e,n,t){(n=e.exports=t("JPst")(!1)).push([e.i,".createAccountPage-container-p4Q {\n    margin: 16px auto 0;\n    max-width: 360px;\n}\n",""]),n.locals={container:"createAccountPage-container-p4Q"}},YQ8e:function(e,n,t){"use strict"
t.r(n),t.d(n,"default",function(){return O})
var a=t("q1tI"),c=t.n(a),i=t("17x9"),r=t("lSNA"),s=t.n(r),u=t("MVZn"),o=t.n(u),l=t("Ty5D"),p=["email","firstName","lastName"],f=function useCreateAccountPage(){var e=Object(l.g)(),n=Object(l.h)().search
return{handleCreateAccount:Object(a.useCallback)(function(){e.push("/")},[e]),initialValues:Object(a.useMemo)(function(){return function getCreateAccountInitialValues(e){var n=new URLSearchParams(e)
return p.reduce(function(e,t){return o()({},e,s()({},t,n.get(t)))},{})}(n)},[n])}},h=t("+h8t"),b=t("y1Xp"),d=t("LboF"),g=t.n(d),m=t("TN8f"),j=t.n(m),w={injectType:"singletonStyleTag",insert:"head",singleton:!0},A=(g()(j.a,w),j.a.locals||{}),C=function CreateAccountPage(e){var n=f(),t=n.initialValues,a=n.handleCreateAccount,i=Object(b.a)(A,e.classes)
return c.a.createElement("div",{className:i.container},c.a.createElement(h.a,{initialValues:t,isCancelButtonHidden:!0,onSubmit:a}))}
C.propTypes={classes:Object(i.shape)({container:i.string}),initialValues:Object(i.shape)({})}
var O=C}}])

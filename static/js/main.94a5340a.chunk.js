(this.webpackJsonpreact_homepage=this.webpackJsonpreact_homepage||[]).push([[0],{156:function(e,t,n){},163:function(e,t,n){},185:function(e,t,n){},296:function(e,t,n){},537:function(e,t,n){},539:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(18),s=n.n(r),i=(n(156),n(140)),o=n(141),l=n(151),u=n(150),j=n(24),d=n(10),b=n(23),h=n(550),O=n(553),x=n(549),m=n(7),p=n(1),f=Object(a.createContext)({}),g=function(e){var t=e.children,n=Object(a.useState)(!0),c=Object(m.a)(n,2),r=c[0],s=c[1],i=function(){var e=localStorage.getItem("theme"),t=!0;return null!==e&&(t="light"===e),t};Object(a.useEffect)((function(){s(i())}),[]);var o=function(e){var t=e?"light":"dark";localStorage.setItem("theme",t)};return Object(p.jsx)(f.Provider,{value:{isLightTheme:r,light:{syntax:"#1a1a1a",ui:"none",bg:"rgb(240, 241, 255)"},dark:{syntax:"#ececec",ui:"none",bg:"rgb(63, 63, 63)"},toggleTheme:function(){s(!r)},setTheme:function(e){s(e),o(e)},cacheTheme:o,getCachedTheme:i},children:t})},v=(n(163),function(){var e=Object(a.useContext)(f),t=e.getCachedTheme,n=e.isLightTheme,c=e.setTheme,r=Object(a.useState)(!1),s=Object(m.a)(r,2),i=s[0],o=s[1],l={color:"#ececec80"},u={color:"rgb(245, 245, 245)"},j=n?l:u,d=n?u:l;Object(a.useEffect)((function(){o(!t())}),[t]);return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:"sliderholder",children:[Object(p.jsx)("p",{className:"themefont",style:d,children:"Light\xa0"}),Object(p.jsxs)("label",{className:"switch",children:[Object(p.jsx)("input",{type:"checkbox",checked:!n,onChange:function(){c(i),o(!i)}}),Object(p.jsx)("span",{className:"slider round"})]}),Object(p.jsx)("p",{className:"themefont",style:j,children:"\xa0Dark\xa0\xa0\xa0"})]})})}),y=n(8),w=n.n(y),k=n(9),C=n(45),N=n(16),S=n.n(N),A="".concat("https://andrewohnslandhomepageapi.herokuapp.com","/api"),I=function(){var e=Object(k.a)(w.a.mark((function e(){var t,n,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("".concat(A,"/image/all/details"));case 2:return t=e.sent,n=[{name:"Select image",value:"noId"}],a=t.data.map((function(e){var t=void 0!==e.category?" (".concat(e.category,")"):"";return{name:"".concat(e.name).concat(t),value:e._id}})),e.abrupt("return",[].concat(n,Object(C.a)(a)));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(k.a)(w.a.mark((function e(t){var n,a,c;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("".concat(A,"/image/").concat(t));case 2:return n=e.sent,a=n.data,e.next=6,a.map((function(e){return{width:e.width,height:e.height,src:e.img,title:e.name}}));case 6:return c=e.sent,e.abrupt("return",c);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(e){return S.a.post("".concat(A,"/image/add"),e,{withCredentials:!0,validateStatus:function(){return!0}})},E=function(e){return S.a.delete("".concat(A,"/image/delete/").concat(e),{withCredentials:!0,validateStatus:function(){return!0}})},F=function(e,t){return S.a.post("".concat(A,"/user/login"),{username:e,password:t},{withCredentials:!0,headers:{"Content-Type":"application/json"},validateStatus:function(){return!0}})},W=function(){var e=Object(k.a)(w.a.mark((function e(t,n){var a,c;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("".concat(A,"/").concat(t,"/").concat(n));case 2:return a=e.sent,c=a.data,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),P=function(){var e=Object(k.a)(w.a.mark((function e(t){var n,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("".concat(A,"/").concat(t));case 2:return n=e.sent,a=n.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=Object(k.a)(w.a.mark((function e(t){var n,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("".concat(A,"/").concat(t,"/admin"),{withCredentials:!0,validateStatus:function(){return!0}});case 2:return n=e.sent,a=n.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(e,t,n,a){return S.a.post("".concat(A,"/user/change"),{username:e,password:t,newPassword:n,repeatedPassword:a},{withCredentials:!0,headers:{"Content-Type":"application/json"},validateStatus:function(){return!0}})},G=function(){var e=Object(k.a)(w.a.mark((function e(t){var n,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.a.get("".concat(A,"/category/").concat(t));case 3:if(n=e.sent,void 0!==(a=n.data)){e.next=7;break}return e.abrupt("return",[]);case 7:return e.abrupt("return",a);case 10:return e.prev=10,e.t0=e.catch(0),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),B=Object(a.createContext)({}),M=function(e){var t=e.children,n=Object(a.useState)(null),c=Object(m.a)(n,2),r=c[0],s=c[1],i=function(){var e=Object(k.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",S.a.get("".concat(A,"/user/auth"),{withCredentials:!0}).then((function(){return!0})).catch((function(){return!1})).then((function(e){s(e)})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){i()}),[]);return Object(p.jsx)(B.Provider,{value:{isAuth:r,setIsAuth:function(e){s(e)},getAuthStatus:i},children:t})},H=n.p+"static/media/github-original.46830165.svg",_=Object(d.o)((function(){var e=Object(a.useContext)(B).isAuth;return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)(h.a,{fixed:"top",collapseOnSelect:!0,expand:"lg",bg:"primary",variant:"dark",children:[Object(p.jsx)(h.a.Brand,{children:"Andre Wohnsland"}),Object(p.jsx)(h.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(p.jsxs)(h.a.Collapse,{id:"responsive-navbar-nav",children:[Object(p.jsxs)(O.a,{className:"mr-auto",children:[Object(p.jsx)(b.LinkContainer,{exact:!0,to:"/",children:Object(p.jsx)(O.a.Link,{children:"Home"})}),Object(p.jsx)(b.LinkContainer,{to:"/projects",children:Object(p.jsx)(O.a.Link,{children:"Projects"})}),Object(p.jsx)(b.LinkContainer,{to:"/blog",children:Object(p.jsx)(O.a.Link,{children:"Blog"})}),Object(p.jsxs)(x.a,{title:"Pictures",id:"collasible-nav-dropdown",children:[Object(p.jsx)(b.LinkContainer,{to:"/pictures/fotography",children:Object(p.jsx)(x.a.Item,{children:"Fotography"})}),Object(p.jsx)(b.LinkContainer,{to:"/pictures/woodwork",children:Object(p.jsx)(x.a.Item,{children:"Woodwork"})})]}),Object(p.jsx)(b.LinkContainer,{to:"/about",children:Object(p.jsx)(O.a.Link,{children:"About"})})]}),Object(p.jsx)(v,{}),Object(p.jsxs)(O.a,{children:[e&&Object(p.jsxs)(x.a,{title:"Admin",id:"collasible-nav-dropdown",children:[Object(p.jsx)(b.LinkContainer,{to:"/admin/projects",children:Object(p.jsx)(x.a.Item,{children:"Edit Projects"})}),Object(p.jsx)(b.LinkContainer,{to:"/admin/blog",children:Object(p.jsx)(x.a.Item,{children:"Edit Blog Article"})}),Object(p.jsx)(b.LinkContainer,{exact:!0,to:"/admin/image",children:Object(p.jsx)(x.a.Item,{children:"Add Images"})}),Object(p.jsx)(b.LinkContainer,{exact:!0,to:"/admin/image/delete",children:Object(p.jsx)(x.a.Item,{children:"Delete Images"})}),Object(p.jsx)(b.LinkContainer,{to:"/admin/changepassword",children:Object(p.jsx)(x.a.Item,{children:"Change Password"})})]}),Object(p.jsx)(O.a.Link,{href:"https://github.com/AndreWohnsland",children:Object(p.jsxs)("div",{className:"github",children:[Object(p.jsx)("img",{src:H,alt:"GitHub Logo",width:"20px",height:"20px"}),"\xa0GitHub"]})})]})]})]})})})),U=function(){return Object(p.jsx)("div",{className:"footer",children:Object(p.jsxs)("footer",{children:[Object(p.jsxs)("div",{className:"left",children:["\xa9\xa0","".concat((new Date).getFullYear()," A. Wohnsland")]}),Object(p.jsxs)("div",{className:"right",children:["Made with React\xa0",Object(p.jsx)("span",{role:"img","aria-label":"heart",children:"\u2764\ufe0f"})]})]})})},K=n(53),z=n(39),J=function(e){var t=new Intl.DateTimeFormat("en-GB",{weekday:"short",year:"numeric",month:"short",day:"numeric",timeZone:"UTC"}),n=new Date(e);return t.format(n)},V=function(e){var t=e.element,n=e.elementType,a=J(t.createdAt),c=J(t.updatedAt);return Object(p.jsx)(j.Link,{to:"/".concat(n,"/").concat(t._id),style:{textDecoration:"none"},children:Object(p.jsxs)("div",{className:"card-div",children:[Object(p.jsx)("h3",{className:"card-title",children:t.title}),Object(p.jsx)("span",{className:"card-info",children:a===c?"Created ".concat(J(t.createdAt)):"Updated ".concat(J(t.updatedAt))}),Object(p.jsx)("p",{className:"card-desc",children:t.description}),Object(p.jsx)("p",{className:"card-category",children:t.category.sort().map((function(e){return Object(p.jsxs)("span",{children:["#",e]})}))})]})})},Y=function(e){var t=e.text;return Object(p.jsx)("div",{className:"main-header text-center",children:Object(p.jsx)("h2",{children:t})})},q=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},Q=function(){return Object(p.jsx)("div",{className:"shimmer-wrapper",children:Object(p.jsx)("div",{className:"shimmer"})})},Z=(n(185),function(e){var t=e.type,n="skeleton ".concat(t);return Object(p.jsx)("div",{className:n})}),X=function(e){var t=e.theme||"dark";return Object(p.jsxs)("div",{className:"skeleton-wrapper ".concat(t),children:[Object(p.jsxs)("div",{className:"skeleton-article",children:[Object(p.jsx)(Z,{type:"title"}),Object(p.jsx)(Z,{type:"text"}),Object(p.jsx)(Z,{type:"text"}),Object(p.jsx)(Z,{type:"text"})]}),Object(p.jsx)(Q,{})]})},$=n(149),ee=function(e){var t=e.categoryInfo,n=e.categoryValue,a=e.onChange;return Object(p.jsx)($.a,{isMulti:!0,closeMenuOnSelect:!1,name:"categories",options:t,className:"basic-multi-select category-multi-select",classNamePrefix:"select",placeholder:"Select Category to Filter",value:n,onChange:a})},te={staleTime:6e4,cacheTime:36e5},ne=function(e){var t=e.elementType,n=e.header,c=Object(a.useState)([]),r=Object(m.a)(c,2),s=r[0],i=r[1];Object(a.useEffect)((function(){i([]),document.title="".concat(q(t)," | Andre Wohnsland")}),[t]);var o,l,u,j=Object(z.a)("".concat(t,"s"),(function(){return P(t)}),Object(K.a)({},te)),d=j.data,b=j.status,h=Object(z.a)("".concat(t,"s_cats"),(function(){return G(t)}),Object(K.a)({},te)),O=h.data,x=h.status,f=(l=x,void 0===(o=O)||"loading"===l||"error"===l?[]:o.map((function(e){return{value:e,label:e}})));return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(Y,{text:n}),Object(p.jsxs)("div",{className:"main-text",children:["loading"===b&&[1,2,3,4,5].map((function(e){return Object(p.jsx)(X,{theme:"dark"},e)})),"error"===b&&Object(p.jsx)("p",{children:"Error fetching data!"}),"success"===b&&d&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(ee,{categoryInfo:f,categoryValue:s,onChange:function(e){0===e.length?i([]):i(e.map((function(e){return e})))}}),(u=d,u.filter((function(e){return 0===s.length||e.category.some((function(e){return s.map((function(e){return e.value})).includes(e)}))}))).map((function(e){return Object(p.jsx)(V,{element:e,elementType:t},e._id)}))]})]})]})},ae=function(){return Object(a.useEffect)((function(){document.title="Home | Andre Wohnsland"}),[]),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(Y,{text:"Hi there!"}),Object(p.jsxs)("div",{className:"main-text-page",children:[Object(p.jsx)("p",{children:"Welcome to my little humble homepage. I am Andre, an IoT-Enthusiast, Engineer, Developer, and Explorer! I enjoy spending my free time learning new technologies and tinker around with soft- and hardware of all kinds. That's how this homepage was born. In the process of learning React, I created this page to practise the framework and give me the possibility to present some of my work, as well as create blog entries."}),Object(p.jsxs)("p",{children:["It's nothing big, but it gets better over time as I get better with React and other frameworks. Have a look around, get a glimpse what I do and maybe have a look in some of my projects",Object(p.jsx)("span",{role:"img","aria-label":"smile",children:"\ud83d\ude03"}),". If you want to dive deeper, you can also have a look into my Github!"]}),Object(p.jsx)("p",{children:"In the meantime explore the different section. You can find them in the header. There is a list of some of my projects (mostly programming topics) and a section for blog entries. Also, there are some pictures from my hobby fotography and my other passion, woodworking with resign. For now, that's all, maybe next time you can discover even more information!"})]})]})},ce=function(){return Object(a.useEffect)((function(){document.title="About | Andre Wohnsland"}),[]),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(Y,{text:"Made with React"}),Object(p.jsxs)("div",{className:"main-text-page",children:[Object(p.jsx)("p",{children:"This page was created while practising and improving my react knowledge. It is also used to present some of my other coding projects and give me the possibility to write blog entries. Here is a list of the mandatory tools and frameworks used in combination with this side."}),Object(p.jsx)("p",{className:"list-header",children:"For the Frontend:"}),Object(p.jsxs)("ul",{className:"list-elements",children:[Object(p.jsx)("li",{children:"React"}),Object(p.jsx)("li",{children:"React Router (Dom)"}),Object(p.jsx)("li",{children:"React (Router) Bootstrap"}),Object(p.jsx)("li",{children:"React Query"}),Object(p.jsx)("li",{children:"React Markdown"}),Object(p.jsx)("li",{children:"React Syntax Highlighter"}),Object(p.jsx)("li",{children:"Axios"})]}),Object(p.jsx)("p",{className:"list-header",children:"For the Backend:"}),Object(p.jsxs)("ul",{className:"list-elements",children:[Object(p.jsx)("li",{children:"Express"}),Object(p.jsx)("li",{children:"MongoDB / Mongoose"}),Object(p.jsx)("li",{children:"CORS"}),Object(p.jsx)("li",{children:"Jsonwebtoken"}),Object(p.jsx)("li",{children:"Cookie Parser"}),Object(p.jsx)("li",{children:"Bcrypt"})]})]})]})},re=n(44),se=n.n(re),ie=n(32),oe=n(71),le=n.n(oe),ue=n(145),je=n.n(ue),de=(n(295),n(552)),be=n(546),he=(n(296),function(e){var t=e.identifier,n=e.text;return Object(p.jsx)(se.a,{className:"".concat(t," md-custom-block"),escapeHtml:!1,source:n,plugins:[le.a],renderers:{inlineMath:function(e){var t=e.value;return Object(p.jsx)(ie.a,{math:t})},math:function(e){var t=e.value;return Object(p.jsx)(ie.a,{block:!0,math:t})}}})}),Oe=function(e){var t=e.identifier,n=e.text;return Object(p.jsx)(he,{identifier:t,text:n})},xe=function(e){return void 0!==e&&["warning","danger","info","helpful"].includes(e)},me=function(e){var t=e.language,n=e.value;return xe(t)?Object(p.jsx)(Oe,{identifier:t,text:n}):Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("p",{className:"header-code",children:t}),Object(p.jsx)(de.a,{language:t,style:be.a,wrapLongLines:!1,children:n})]})},pe=function e(t,n){return"string"===typeof n?t+n:c.a.Children.toArray(n.props.children).reduce(e,t)},fe=function(e){var t=e.children,n=e.level,a=c.a.Children.toArray(t).reduce(pe,"").toLowerCase().replace(/\W/g,"-");return c.a.createElement("h".concat(n),{id:a,style:{textAlign:"left",padding:"15px 0px 2px 0px"}},t)},ge=function(e){var t=e.identifier,n=e.attributes;return Object(p.jsx)(se.a,{className:t,escapeHtml:!1,source:n.text,renderers:{inlineMath:function(e){var t=e.value;return Object(p.jsx)(ie.a,{math:t})},math:function(e){var t=e.value;return Object(p.jsx)(ie.a,{block:!0,math:t})}}})},ve=function(e){var t=e.maxWidth,a=e.sourcedata;return Object(p.jsx)(se.a,{className:"blog-md",plugins:[le.a,je.a,[n(536),{startBlock:"[[",endBlock:"]]",inlineMode:!0}]],escapeHtml:!1,source:a,renderers:{code:me,heading:fe,image:function(e){var n=e.alt,a=e.src,c=e.title;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("img",{alt:n,src:a,title:c,className:"blog-picture",style:{maxWidth:t}}),Object(p.jsx)("span",{className:"picture-caption",children:"".concat(n)})]})},inlineMath:function(e){var t=e.value;return Object(p.jsx)(ie.a,{math:t})},math:function(e){var t=e.value;return Object(p.jsx)(ie.a,{block:!0,math:t})},shortcode:ge}})},ye=function(e){var t=Object(a.useCallback)((function(){var t;return null===e||void 0===e||null===(t=e.current)||void 0===t?void 0:t.offsetWidth}),[e]),n=Object(a.useState)(void 0),c=Object(m.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){var n=function(){s(t())};return e.current&&s(t()),window.addEventListener("resize",n),function(){window.removeEventListener("resize",n)}}),[e,t]),r&&r>25?r-50:r},we={staleTime:3e5,cacheTime:36e5,retry:1},ke=function(e){var t,n=e.elementType,c=Object(d.m)()._id,r=Object(a.useRef)(null),s=ye(r);Object(a.useEffect)((function(){document.title="".concat(q(n)," | Andre Wohnsland")}),[n]);var i,o,l=Object(z.a)("".concat(n,"?id=").concat(c),(function(){return W(n,c)}),we),u=l.data,j=l.status,b="here for more impressions";return(null===u||void 0===u||null===(t=u.link)||void 0===t?void 0:t.includes("github"))&&(b="at Github"),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(Y,{text:(i=j,o=u,"loading"===i?"Loading ....":"error"===i?"Error getting data!":"success"===i&&o?o.title:"Error getting data!")}),Object(p.jsxs)("div",{className:"main-text-page",ref:r,children:["error"===j&&"Probably not a valid id :( If you get here from blog or project try getting back and forth again.","success"===j&&u&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("p",{className:"blog-date",children:function(e){return"Created: ".concat(J(e.createdAt)," | Latest update: ").concat(J(e.updatedAt))}(u)}),Object(p.jsx)("p",{className:"blog-description",children:u.description}),Object(p.jsx)("hr",{className:"blog-dividor"}),Object(p.jsx)(ve,{sourcedata:u.text,maxWidth:s}),"project"===n&&Object(p.jsxs)("p",{children:["Interested? Look into the project ",Object(p.jsx)("a",{href:u.link,children:b})]})]})]})]})},Ce=n(551),Ne=n(144),Se=function(){var e=Object(d.k)(),t=Object(a.useState)(""),n=Object(m.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(""),i=Object(m.a)(s,2),o=i[0],l=i[1],u=Object(a.useState)(!0),j=Object(m.a)(u,2),b=j[0],h=j[1],O=Object(a.useContext)(B),x=O.setIsAuth,f=O.isAuth,g=Object(a.useState)(""),v=Object(m.a)(g,2),y=v[0],C=v[1];function N(){return(N=Object(k.a)(w.a.mark((function t(n){return w.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),F(c,o).then((function(t){if("OK"===t.statusText)return x(!0),void e.push("/admin/projects");h(!1),C(t.data.message)})).catch((function(e){h(!1),C(e.data)}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(a.useEffect)((function(){document.title="Login | Andre Wohnsland"}),[]),!0===f&&e.push("/admin/projects"),Object(p.jsxs)("div",{children:[Object(p.jsx)(Y,{text:"Welcome Boss"}),Object(p.jsx)("div",{className:"main-text user-input-container",children:Object(p.jsx)("div",{className:"Login user-form-container",children:Object(p.jsxs)("form",{onSubmit:function(e){return N.apply(this,arguments)},children:[Object(p.jsxs)(Ce.a.Group,{controlId:"email",children:[Object(p.jsx)(Ce.a.Label,{children:"Name"}),Object(p.jsx)(Ce.a.Control,{autoFocus:!0,type:"text",value:c,onChange:function(e){return r(e.target.value)}})]}),Object(p.jsxs)(Ce.a.Group,{controlId:"password",children:[Object(p.jsx)(Ce.a.Label,{children:"Password"}),Object(p.jsx)(Ce.a.Control,{value:o,onChange:function(e){return l(e.target.value)},type:"password"})]}),!b&&Object(p.jsx)("div",{className:"res-error",children:y}),Object(p.jsx)(Ne.a,{block:!0,disabled:!(c.length>0&&o.length>0),type:"submit",children:"Login"})]})})})]})},Ae=function(e){var t=e.label,n=e.value,a=e.onChange,c=e.options;return Object(p.jsxs)(Ce.a.Group,{controlId:t,children:[Object(p.jsx)(Ce.a.Label,{children:t}),Object(p.jsx)(Ce.a.Control,{as:"select",value:n,onChange:a,children:c.map((function(e){return Object(p.jsx)("option",{value:e.value,children:e.name},e.value)}))})]})},Ie=function(e){var t=e.label,n=e.name,a=e.value,c=e.onChange;return Object(p.jsxs)(Ce.a.Group,{controlId:n,children:[Object(p.jsx)(Ce.a.Label,{children:t}),Object(p.jsx)(Ce.a.Control,{name:n,type:"text",value:a,onChange:c})]})},Te=function(e){var t=e.label,n=e.name,a=e.value,c=e.onChange;return Object(p.jsxs)(Ce.a.Group,{controlId:n,children:[Object(p.jsx)(Ce.a.Label,{children:t}),Object(p.jsx)(Ce.a.Control,{name:n,as:"textarea",rows:16,value:a,onChange:c})]})},Le=function(e){var t=e.res,n=e.name,a=e.handleShow,c=function(){return Object(p.jsx)("button",{type:"button",className:"button-info",onClick:a,children:"x"})};if(void 0===t)return Object(p.jsxs)("div",{className:"error-div",children:[c(),Object(p.jsx)("h3",{children:"Error getting Response Data"}),Object(p.jsx)("p",{children:"There was no response object to get the data from"})]});var r=(null===t||void 0===t?void 0:t.status)>=400?"error-div":"success-div";return Object(p.jsxs)("div",{className:r,children:[c(),Object(p.jsx)("h3",{children:"".concat(t.status,", ").concat(t.statusText,":")}),Object(p.jsx)("p",{children:'Data for "'.concat(n,'":')}),Object(p.jsx)("p",{children:t.data.message||t.data})]})},Ee=function(e){var t=e.label,n=e.name,a=e.value,c=e.onChange;return Object(p.jsx)(Ce.a.Group,{controlId:n,children:Object(p.jsx)(Ce.a.Check,{name:n,type:"checkbox",checked:a,onChange:c,label:t})})},Fe=n(547),We=n(548),Pe=(n(537),function(e){var t=e.name,n=e.categories,c=e.existingCategories,r=e.setCategories,s=Object(a.useState)(""),i=Object(m.a)(s,2),o=i[0],l=i[1],u=function(e){n.includes(e)||r([].concat(Object(C.a)(n),[e])),l("")};return Object(p.jsxs)("div",{className:"category-box",children:[Object(p.jsxs)("div",{className:"selected-categories",children:[Object(p.jsx)("p",{style:{marginBottom:"6px",marginTop:"2px"},children:"Categories:\xa0\xa0"}),n.sort().map((function(e){return Object(p.jsxs)("span",{className:"selected-categories",children:[Object(p.jsx)("button",{type:"button",className:"category-close-button",onClick:function(){return function(e){var t=n.filter((function(t){return t!==e}));r(t)}(e)},children:"x"}),e]})}))]}),Object(p.jsxs)(Fe.a,{className:"mb-3",children:[Object(p.jsx)(We.a,{className:"category-input-group",children:Object(p.jsx)(Ce.a.Control,{name:t,className:"input-category",type:"text",value:o,onChange:function(e){return l(e.target.value)},onKeyPress:function(e){13===e.charCode&&u(o)}})}),Object(p.jsx)(Ne.a,{className:"add-category",onClick:function(){return u(o)},disabled:!(o.length>=3),children:"Add"})]}),Object(p.jsxs)("div",{className:"available-categories",children:[Object(p.jsx)("p",{style:{marginBottom:"6px"},children:"Existing:\xa0\xa0"}),c.map((function(e){return Object(p.jsx)(Ne.a,{onClick:function(){return u(e)},className:"available-categories",variant:"primary",size:"sm",children:e})}))]})]})}),De=function(e){var t=e.elementType,n=Object(a.useContext)(B).isAuth,c=Object(a.useState)([]),r=Object(m.a)(c,2),s=r[0],i=r[1],o=Object(a.useState)(""),l=Object(m.a)(o,2),u=l[0],j=l[1],d=Object(a.useState)(""),b=Object(m.a)(d,2),h=b[0],O=b[1],x=Object(a.useState)(""),f=Object(m.a)(x,2),g=f[0],v=f[1],y=Object(a.useState)(""),N=Object(m.a)(y,2),I=N[0],T=N[1],L=Object(a.useState)(""),E=Object(m.a)(L,2),F=E[0],W=E[1],P=Object(a.useState)(!1),R=Object(m.a)(P,2),M=R[0],H=R[1],_=Object(a.useState)(!1),U=Object(m.a)(_,2),K=U[0],z=U[1],J=Object(a.useState)(void 0),V=Object(m.a)(J,2),q=V[0],Q=V[1],Z=Object(a.useState)(""),X=Object(m.a)(Z,2),$=X[0],ee=X[1],te=Object(a.useState)([]),ne=Object(m.a)(te,2),ae=ne[0],ce=ne[1],re=Object(a.useState)([]),se=Object(m.a)(re,2),ie=se[0],oe=se[1],le=function(){j(""),O(""),v(""),T(""),W(""),H(!1),ce([])},ue=Object(a.useCallback)(Object(k.a)(w.a.mark((function e(){var n,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return le(),e.next=3,D(t);case 3:return n=e.sent,e.next=6,G(t);case 6:a=e.sent,i(n),oe(a);case 9:case"end":return e.stop()}}),e)}))),[t]);Object(a.useEffect)((function(){ue(),document.title="Admin | Andre Wohnsland"}),[ue]);var je=function(e){return u?function(e,t,n){return S.a.post("".concat(A,"/").concat(t,"/update/").concat(n),e,{withCredentials:!0,validateStatus:function(){return!0}})}(e,t,u):function(e,t){return S.a.post("".concat(A,"/").concat(t,"/add"),e,{withCredentials:!0,validateStatus:function(){return!0}})}(e,t)},de=function(){var e=Object(k.a)(w.a.mark((function e(t){var n,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=null,a={elementId:u,title:h,description:g,text:I,link:F,draft:M,category:ae},e.next=5,je(a);case 5:n=e.sent,Q(n),z(!0),ee(h),"OK"===n.statusText&&(le(),oe([]),ue());case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),be=function(){return t.charAt(0).toUpperCase()+t.slice(1)},he=[{name:"Add new ".concat(be()),value:""}];return s&&he.push.apply(he,Object(C.a)(s.map((function(e){return{name:e.title,value:e._id}})))),Object(p.jsxs)("div",{children:[Object(p.jsx)(Y,{text:"Edit ".concat(be()," Entries")}),Object(p.jsx)("div",{className:"main-text",children:n?Object(p.jsxs)(p.Fragment,{children:[K&&Object(p.jsx)(Le,{res:q,name:$,handleShow:function(){z(!K)}}),Object(p.jsx)("div",{className:"user-form-container",children:Object(p.jsxs)("form",{onSubmit:de,children:[Object(p.jsx)(Ae,{label:"Select your ".concat(t),value:u,onChange:function(e){var n=s.filter((function(t){return t._id===e.target.value}))[0];if(void 0===n)le();else{var a="";"project"===t&&n.link&&(a=n.link),j(e.target.value),O(n.title),v(n.description),T(n.text),W(a),H(n.draft),ce(n.category)}},options:he}),Object(p.jsx)(Ie,{label:"Title",name:"title",value:h,onChange:function(e){return O(e.target.value)}}),Object(p.jsx)(Ie,{label:"Description",name:"description",value:g,onChange:function(e){return v(e.target.value)}}),"project"===t&&Object(p.jsx)(Ie,{label:"Link",name:"link",value:F,onChange:function(e){return W(e.target.value)}}),Object(p.jsx)(Ee,{label:"This is currently a draft (will not be shown public)",name:"draft",value:M,onChange:function(e){return H(e.target.checked)}}),Object(p.jsx)(Pe,{name:"catselect",categories:ae,existingCategories:ie,setCategories:ce}),Object(p.jsx)(Te,{label:"Text",name:"text",value:I,onChange:function(e){return T(e.target.value)}}),Object(p.jsx)(Ne.a,{type:"submit",disabled:!(h.length>0&&g.length>0&&I.length>0&&("project"!==t||F.length>0)),children:""===u?"Create":"Change"})]})})]}):Object(p.jsx)("p",{children:"Not authentificated!"})})]})},Re=function(e){var t=e.isAuth,n=e.path,a=e.children;return Object(p.jsx)(p.Fragment,{children:null!==t&&Object(p.jsx)(p.Fragment,{children:t?Object(p.jsx)(d.d,{exact:!0,path:n,children:a}):Object(p.jsx)(d.c,{to:"/"})})})},Ge=function(){var e=Object(a.useState)(""),t=Object(m.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),s=Object(m.a)(r,2),i=s[0],o=s[1],l=Object(a.useState)(""),u=Object(m.a)(l,2),j=u[0],d=u[1],b=Object(a.useState)(""),h=Object(m.a)(b,2),O=h[0],x=h[1],f=Object(a.useState)(!1),g=Object(m.a)(f,2),v=g[0],y=g[1],C=Object(a.useState)(void 0),N=Object(m.a)(C,2),S=N[0],A=N[1];Object(a.useEffect)((function(){document.title="Admin | Andre Wohnsland"}),[]);var I=function(){var e=Object(k.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),R(n,i,j,O).then((function(e){A(e),y(!0)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsxs)("div",{children:[Object(p.jsx)(Y,{text:"Make it safer"}),Object(p.jsxs)("div",{className:"main-text user-input-container",children:[v&&Object(p.jsx)(Le,{res:S,name:"User change",handleShow:function(){return y(!v)}}),Object(p.jsxs)("div",{className:"Login user-form-container",children:[Object(p.jsx)("p",{children:"Change your password"}),Object(p.jsxs)("form",{onSubmit:I,children:[Object(p.jsx)(Ce.a.Group,{controlId:"name",children:Object(p.jsx)(Ce.a.Control,{autoFocus:!0,type:"text",placeholder:"Name",value:n,onChange:function(e){return c(e.target.value)}})}),Object(p.jsx)(Ce.a.Group,{controlId:"password",children:Object(p.jsx)(Ce.a.Control,{value:i,placeholder:"Password",onChange:function(e){return o(e.target.value)},type:"password"})}),Object(p.jsx)(Ce.a.Group,{controlId:"newPassword",children:Object(p.jsx)(Ce.a.Control,{value:j,placeholder:"New Password",onChange:function(e){return d(e.target.value)},type:"password"})}),Object(p.jsx)(Ce.a.Group,{controlId:"repeatedPassword",children:Object(p.jsx)(Ce.a.Control,{value:O,placeholder:"Repeat New Password",onChange:function(e){return x(e.target.value)},type:"password"})}),Object(p.jsx)(Ne.a,{block:!0,disabled:!(n.length>0&&i.length>0&&j.length>=8&&j===O),type:"submit",children:"Change Password"})]})]}),!(j.length>=8)&&Object(p.jsx)("p",{children:"The password needs to be at least 8 Characters. "}),!(j===O)&&Object(p.jsx)("p",{children:"Both, the new and repeated password needs to be identical. "})]})]})},Be=function(){var e=Object(a.useState)(""),t=Object(m.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(null),s=Object(m.a)(r,2),i=s[0],o=s[1],l=Object(a.useState)("fotography"),u=Object(m.a)(l,2),j=u[0],d=u[1],b=Object(a.useState)(!1),h=Object(m.a)(b,2),O=h[0],x=h[1],f=Object(a.useState)(void 0),g=Object(m.a)(f,2),v=g[0],y=g[1],C=Object(a.useState)(""),N=Object(m.a)(C,2),S=N[0],A=N[1];Object(a.useEffect)((function(){document.title="Admin | Andre Wohnsland"}),[]);var I=function(){var e=Object(k.a)(w.a.mark((function e(t){var a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),(a=new FormData).append("file",i),a.append("name",n),a.append("category",j),L(a).then((function(e){y(e),x(!0),A(n),c(""),o(null)}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsxs)("div",{children:[Object(p.jsx)(Y,{text:"Add Image"}),Object(p.jsxs)("div",{className:"main-text",children:[O&&Object(p.jsx)(Le,{res:v,name:S,handleShow:function(){x(!O)}}),Object(p.jsx)("div",{className:"user-form-container",children:Object(p.jsxs)("form",{onSubmit:I,children:[Object(p.jsx)(Ie,{label:"Name",name:"name",value:n,onChange:function(e){return c(e.target.value)}}),Object(p.jsx)(Ae,{label:"Select category",value:j,onChange:function(e){return d(e.target.value)},options:[{value:"fotography",name:"Fotography"},{value:"woodwork",name:"Woodwork"}]}),Object(p.jsx)(Ce.a.Group,{children:Object(p.jsx)(Ce.a.File,{name:"uploadImage",label:"Please select picture",required:!0,accept:"".concat("image/jpeg"),onChange:function(e){return o(null===e.target.files?null:e.target.files[0])}})}),Object(p.jsx)(Ne.a,{type:"submit",disabled:!(n.length>0&&null!==i),children:"Upload"})]})})]})]})},Me=function(){var e=Object(a.useState)(!1),t=Object(m.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(void 0),s=Object(m.a)(r,2),i=s[0],o=s[1],l=Object(a.useState)(""),u=Object(m.a)(l,2),j=u[0],d=u[1],b=Object(a.useState)("noId"),h=Object(m.a)(b,2),O=h[0],x=h[1],f=Object(a.useState)([]),g=Object(m.a)(f,2),v=g[0],y=g[1],C=function(){var e=Object(k.a)(w.a.mark((function e(){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I();case 2:t=e.sent,y(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){C(),document.title="Admin | Andre Wohnsland"}),[]);var N=function(){var e=Object(k.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),E(O).then((function(e){o(e),d("Image with id: ".concat(O)),c(!0),"OK"===e.statusText&&(x(""),C())}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsxs)("div",{children:[Object(p.jsx)(Y,{text:"Delete Image"}),Object(p.jsxs)("div",{className:"main-text",children:[n&&Object(p.jsx)(Le,{res:i,name:j,handleShow:function(){c(!n)}}),Object(p.jsx)("div",{className:"user-form-container",children:Object(p.jsxs)("form",{onSubmit:N,children:[Object(p.jsx)(Ae,{label:"Select image to delete",value:O,onChange:function(e){return x(e.target.value)},options:v}),Object(p.jsx)(Ne.a,{type:"submit",disabled:!("noId"!==O),children:"Delete"})]})})]})]})},He=n(147),_e=function(e){var t=e.theme||"dark";return Object(p.jsxs)("div",{className:"skeleton-wrapper ".concat(t),children:[Object(p.jsx)("div",{className:"skeleton-picture"}),Object(p.jsx)(Q,{})]})},Ue={staleTime:6e5,cacheTime:36e5},Ke=function(e){var t=e.title,n=t.toLowerCase();Object(a.useEffect)((function(){document.title="".concat(t," | Andre Wohnsland")}),[t]);var c=Object(z.a)(n,(function(){return T(n)}),Object(K.a)({},Ue)),r=c.data,s=c.status;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(Y,{text:t}),Object(p.jsxs)("div",{className:"main-text-picture",children:[("loading"===s||"idle"===s)&&[1,2,3,4,5].map((function(e){return Object(p.jsx)(_e,{theme:"dark"},e)})),"error"===s&&Object(p.jsx)("p",{children:"Error fetching data!"}),"success"===s&&Object(p.jsx)(p.Fragment,{children:r&&r.length>0?Object(p.jsx)(He.a,{photos:r.sort((function(){return Math.random()-.5})),direction:"column"}):Object(p.jsx)("p",{children:"Currently no Pictures here"})})]})]})},ze=function(){var e=Object(a.useContext)(B).isAuth;return Object(p.jsxs)(d.g,{children:[Object(p.jsx)(d.d,{exact:!0,path:"/",component:ae}),Object(p.jsx)(d.d,{path:"/about",component:ce}),Object(p.jsx)(d.d,{exact:!0,path:"/projects",children:Object(p.jsx)(ne,{elementType:"project",header:"My Projects"})}),Object(p.jsx)(d.d,{exact:!0,path:"/project/:_id",children:Object(p.jsx)(ke,{elementType:"project"})}),Object(p.jsx)(d.d,{exact:!0,path:"/blog",children:Object(p.jsx)(ne,{elementType:"blog",header:"It's Storytime"})}),Object(p.jsx)(d.d,{exact:!0,path:"/blog/:_id",children:Object(p.jsx)(ke,{elementType:"blog"})}),Object(p.jsx)(d.d,{exact:!0,path:"/pictures/fotography",children:Object(p.jsx)(Ke,{title:"Fotography"})}),Object(p.jsx)(d.d,{exact:!0,path:"/pictures/woodwork",children:Object(p.jsx)(Ke,{title:"Woodwork"})}),Object(p.jsx)(d.d,{path:"/admin/login",component:Se}),Object(p.jsx)(Re,{path:"/admin/projects",isAuth:e,children:Object(p.jsx)(De,{elementType:"project"})}),Object(p.jsx)(Re,{path:"/admin/blog",isAuth:e,children:Object(p.jsx)(De,{elementType:"blog"})}),Object(p.jsx)(Re,{path:"/admin/image/delete",isAuth:e,children:Object(p.jsx)(Me,{})}),Object(p.jsx)(Re,{path:"/admin/image",isAuth:e,children:Object(p.jsx)(Be,{})}),Object(p.jsx)(Re,{path:"/admin/changepassword",isAuth:e,children:Object(p.jsx)(Ge,{})}),Object(p.jsx)(d.c,{from:"*",to:"/"})]})},Je=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.context,t=e.isLightTheme,n=e.light,a=e.dark,c=t?n:a,r={backgroundColor:c.bg,color:c.syntax};return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(j.HashRouter,{children:Object(p.jsxs)("div",{className:"App",children:[Object(p.jsxs)("div",{className:"content-container",style:r,children:[Object(p.jsx)(_,{}),Object(p.jsx)("div",{className:"main",children:Object(p.jsx)(ze,{})})]}),Object(p.jsx)(U,{})]})})})}}]),n}(a.Component);Je.contextType=f;var Ve=Je;n(538);s.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(g,{children:Object(p.jsx)(M,{children:Object(p.jsx)(Ve,{})})})}),document.getElementById("root"))}},[[539,1,2]]]);
//# sourceMappingURL=main.94a5340a.chunk.js.map
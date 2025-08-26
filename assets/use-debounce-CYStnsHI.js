import{p as o}from"./index-0bceQhp9.js";function c(e,t=500){const[u,r]=o.useState(e);return o.useEffect(()=>{const n=setTimeout(()=>{r(e)},t);return()=>{clearTimeout(n)}},[e,t]),u}export{c as u};

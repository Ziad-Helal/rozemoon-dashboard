import{p as o}from"./index-DLlYwCTA.js";function c(e,t=500){const[u,r]=o.useState(e);return o.useEffect(()=>{const n=setTimeout(()=>{r(e)},t);return()=>{clearTimeout(n)}},[e,t]),u}export{c as u};

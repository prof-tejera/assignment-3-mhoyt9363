
//--------------------------------------------------
// Use the url host and pathname (captured at 
// window load) and the latest queue (q) to build the
// url and load it into the browser history.
//--------------------------------------------------

const updateURL = ( url, q ) => {

  window.history.pushState({},'',`${url.origin}/${url.pathname}/${encodeURI(JSON.stringify(q))}`);
    
return;
}

export default updateURL;
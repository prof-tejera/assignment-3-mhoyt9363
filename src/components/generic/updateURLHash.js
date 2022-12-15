
//--------------------------------------------------
// Use the url host and pathname (captured at 
// window load) and the latest queue (q) to build the
// url and load it into the browser history.
//--------------------------------------------------

const updateURLHash = ( q ) => {

  window.location.hash = `${JSON.stringify(q)}`;

  return;
}

export default updateURLHash;
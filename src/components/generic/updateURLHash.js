
//--------------------------------------------------
// Use the queue to creata a string version and 
// update the hash.
//--------------------------------------------------

const updateURLHash = ( q ) => {

  // if no entries, an update isn't needed
  if ( q.length === 0 ) return;
    
  window.location.hash = `${JSON.stringify(q)}`;

  return;
}

export default updateURLHash;
import testJSON from '../../utils/testJSON';

//--------------------------------------------------
// Returns the object represented in the hash from 
// the Url minus the '#' char.
//--------------------------------------------------

const getUrlHash = ( ) => {

  const h = decodeURI( window.location.hash.slice(1) );

  if (h.length === 0) {
    return([]);
  } else {
    if ( testJSON({ testString: h }) ) {             // check if valid JSON string
      return(JSON.parse(h));
    } else {
      return([]);
    }
  }
}

export default getUrlHash;
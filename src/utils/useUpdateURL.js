import { useContext } from 'react';
import { AppContext } from '../components/generic/Context';


//--------------------------------------------------
// Use the initial url and find the 'context' of
// the queue (after the last BASENAME in the url).
// Decode the context and if it's a valid JSON string, 
// then parse and return valid url & queue, otherwise 
// return empty values
//--------------------------------------------------

const useUpdateURL = () => {
  const { url } = useContext(AppContext);

    console.log('useUpdateURL u', url);
    console.log('useUpdateURL nu', `${url.origin}/${url.pathname}/${encodeURI(url.wkout)}`);
    History.pushState({}, '', `${url.origin}/${url.pathname}/${encodeURI(url.wkout)}`);
    // // break current url into path and queue
    // let urlQueue = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    // console.log('useUpdateURL urlq', urlQueue);
    // let urlPath = currentUrl.substring(0, currentUrl.indexOf(PATHS.BASENAME));
    // console.log('useUpdateURL ', urlPath, urlQueue);
    // urlQueue = JSON.stringify(newQueue);
    // console.log("new q", urlQueue);
    // const newUrl =  encodeURI(urlPath + `/${urlQueue}`);

    // return newUrl;
    return;
}

export default useUpdateURL;
/**
 * Define title using content type
 * @param {String} contentType
 * @param {Array} data
 * @return {string}
 */
export default function defineTitle(contentType, data = []) {
  if (contentType === "playlist") {
    if(data.length > 0){
      return data[0].Title;  
    }
    return "";  
  } else if (contentType === "threads") {
    return "Twitter Threads";
  } else if (contentType === "spl") {
    return "Program Library";
  } else if (contentType === "started") {
    return "Getting Started with BNBChain";
  } else if (contentType === "sdk") {
    return "SDKs & Frameworks";
  } else if (contentType === "ama") {
    return "AMA";
  }else {
    // Capitalize the first char
    return contentType.charAt(0).toUpperCase() + contentType.slice(1);
  }
}

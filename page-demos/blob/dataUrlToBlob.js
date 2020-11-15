const dataURLPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;

export default (dataURL) => {
    // Parse the dataURL components as per RFC 2397
    const matches = dataURL.match(dataURLPattern);
    if(!matches) {
        throw new Error('invalid data URI');
    }

    // Default to text/plain;charset=US-ASCII
    var mediaType = matches[2] ? matches[1] : 'text/plain' + (matches[3] || ';charset=US-ASCII');
    var isBase64 = !!matches[4];
    var dataString = dataURL.slice(matches[0].length);

    var byteString = isBase64
        // Convert base64 to raw binary data held in a string:
        ? atob(dataString)
        // Convert base64/URLEncoded data component to raw binary:
        : decodeURIComponent(dataString);

    // Write the bytes of the string to an ArrayBuffer:
    var byteStringLen = byteString.length;
    var arrayBuffer = new ArrayBuffer(byteStringLen);
    var intArray = new Uint8Array(arrayBuffer);

    for(var i = 0; i < byteStringLen; i += 1) {
        intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([intArray], {
        type: mediaType
    });
};


export const px2vh = (size, width = 1440) => `${(size / width) * 100}vw`;

export const truncate = ( str, n, useWordBoundary ) => {
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1);
    return (useWordBoundary 
       ? subString.substr(0, subString.lastIndexOf(' ')) 
       : subString) + "&hellip;";
};
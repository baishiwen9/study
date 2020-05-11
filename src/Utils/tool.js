
function isObj(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
}




export {
    isObj,
}
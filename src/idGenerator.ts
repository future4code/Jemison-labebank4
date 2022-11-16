
function createGuid() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export function idGenerator(){
    createGuid()
    return createGuid() + createGuid() + '-' + createGuid() + '-' + createGuid() + '-' + createGuid() + '-' + createGuid() + createGuid() + createGuid();
}
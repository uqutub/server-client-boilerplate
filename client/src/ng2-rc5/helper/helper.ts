type returnObjType = { err: any, data: any }

let responseJsonHandler = (response: returnObjType, resolve, reject) => {
    if (response.err) {
        reject(response.err);
    } else {
        resolve(response.data);
    }
}


export {
    returnObjType
    , responseJsonHandler
};

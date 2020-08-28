function deepEqual(object1, object2){
    //compare objects by identity
    if(object1 === object2) return true;

    //compare the values
    if(object1 === null || typeof object1 !== "object" ||
        object2 === null || typeof object2 !== "object") return false;
    
    let a = Object.keys(a), b = Object.keys(b);

    if(a.length !== b.length) return false;

    //compare by going over the properties recursively
    for(let key of a){
        if(!b.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
}
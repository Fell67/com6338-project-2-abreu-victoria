// Creates a copy of an object
export function copyObject(object) {
    const clonedObj = Object.create(Object.getPrototypeOf(object)) 

    for (const key of Object.keys(object)) {
        if (object[key]) {
            clonedObj[key] = JSON.parse(JSON.stringify(object[key]))
        } else {
            clonedObj[key] = undefined
        }
    }
    
    return clonedObj
}
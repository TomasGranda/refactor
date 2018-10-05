const compareArrays = (array1: any[], array2: any[]) => {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(array1);
    const bProps = Object.getOwnPropertyNames(array2);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (const i of aProps) {
        const propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (array1[propName] !== array2[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
};

export default compareArrays;
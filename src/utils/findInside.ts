const findInside = (array: any[], object: any) => {
    if(!array || !object){
        console.log("Array or Objects Undefined")
        return;
    }
    return array.map( (x: any) => {
        let response: any;
        if(x.children){
            response = findInside(x.children, object);
            if(response){
                return response;
            }
        }
        if(x.id === object.id){
            return x;
        }
    }).find( (x: any) => x !== undefined );
};

export default findInside;
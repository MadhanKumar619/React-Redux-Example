

export function createCity(capacityDetails){
    return{        
        type : "CREATE_NEW_CITY",
        payload : capacityDetails      
    }
};

export function updateobjStore(capacityObject){    
    return{
        type : "UPDATE_OBJECT_STORE",
        payload :  capacityObject
    }
};

export function changeSelectedCity(cityName){
    return{
        type : 'CHANGE_CITY',
        payload : cityName,
    }
}

export function changeSelectedIndex(index){
    return{
        type : "CHANGE_SELECTED_INDEX",
        payload : index
    }
}
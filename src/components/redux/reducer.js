let initialState= {
    objStore : [],
    selectedCity : '',
    selectedIndex : -1,
    menuList : ["Capacity","HolidayList","TimeSlots"],
    cities : ["New Delhi", "Bangalore","Chennai"]
}

const updateObjStore = (state,action)=>{
    let promise = new Promise((resolve,reject)=>{
        if(action.payload!==null){
            resolve(action.payload)
        }
        else{
            reject();
        }
    })
    return promise;
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case 'CREATE_NEW_CITY':            
            state = {
                ...state,
                objStore : [...state.objStore,action.payload] ,
                selectedIndex : state.objStore.length,
                selectedCity : action.payload.city
            }
            break;
        case 'UPDATE_NYKAA_STORE':
            updateObjStore(state,action)
                .then((objStore)=>{
                    state = {
                        ...state,
                        objStore
                    }
                }).catch(err=>{
                    return err;
                })
            break;
        case 'CHANGE_CITY':
            state = {
                ...state,
                selectedCity : action.payload
            }
            break;           
        case 'CHANGE_SELECTED_INDEX':
            state = {
                ...state,
                selectedIndex : action.payload
            }                 
        default : 
            break;
    }
    return state;
}

export default reducer;
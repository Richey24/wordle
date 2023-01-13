const videobackgroundReducer = (state = {}, action) => {

    const newState = Object.assign({}, state);

    switch (action.type){
        case "VIDEOBACKGROUND_ADD":
            newState[] = {
                complete: false,
                label: action.payload
            };
            break;
        default:
            break;
    }

    return newState;
};

export default videobackgroundReducer;
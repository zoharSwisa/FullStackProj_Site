
// action - json
// type - mandatory
// payload - optional
const userReducer = (state = {connectedUser: {}, users: [], selectedUser: {}}, action) =>
{
    switch(action.type)
    {
        case "INIT_ALL_USERS":
            return {...state, users : action.payload}

        case "LOGIN_USER":
            return {...state, connectedUser : action.payload}
        
        case "CHOOSE_USER":
            let user = state.users.find(u => u.id == action.payload);
            return {...state, selectedUser : user};

        case "UPDATE_USER":
            let users1 = state.users.map(u => {
                if (u.id == action.payload.id) {
                    return action.payload;
                }
                
                return u;
            });

            return {...state, users: users1, selectedUser : action.payload };

        case "DELETE_USER":
            let users2 = state.users.filter(u => u.id != action.payload);
            return {...state, users : users2};

        case "ADD_USER":
            let users3 = state.users;
            users3.push(action.payload);
            return {...state, users : users3};
        
        case "LOG_OUT":
            return {...state, connectedUser : {}};
        default:
            return state
    }
}


export default userReducer;

// action - json
// type - mandatory
// payload - optional
const subscriptionReducer = (state = {subscriptions: [], fileredSubscriptions: [], selectedSubscription: {}}, action) =>
{
    switch(action.type)
    {
        case "INIT_ALL_SUBSCRIPTIONS":
            return {...state, subscriptions : action.payload}

        case "INIT_FILTERED_MOVIES":
            return {...state, fileredSubscriptions : action.payload}

        case "CHOOSE_SUBSCRIPTION":
            let s = state.subscriptions.find(m => m.id == action.payload);
            return {...state, selectedSubscription : s};

        case "UPDATE_SUBSCRIPTION":
            let s2 = state.subscriptions.map(m => {
                if (m.id == action.payload.id) {
                    return action.payload;
                }
                
                return m;
            });

            return {...state, subscriptions: s2, selectedSubscription : action.payload, fileredSubscriptions: s2 };

        case "DELETE_SUBSCRIPTION":
            let s3 = state.subscriptions.filter(u => u.id != action.payload);
            return {...state, subscriptions : s3, fileredSubscriptions: s3};

        case "ADD_SUBSCRIPTION":
            let s4 = state.subscriptions;
            s4.push(action.payload);
            return {...state, subscriptions : s4, fileredSubscriptions: s4};
            
        default:
            return state
    }
}

export default subscriptionReducer;
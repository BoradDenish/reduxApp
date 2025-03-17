// increase money
export const depositMoney = (amount) => {
    return (dispatch) =>{
        dispatch({
            type: "deposit",
            payload: amount
        })
    }
}

// decrease money
export const withdrawMoney = (amount) => {
    return (dispatch) =>{
        dispatch({
            type: "withdraw",
            payload: amount
        })
    }
}


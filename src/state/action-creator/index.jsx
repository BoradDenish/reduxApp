export const depositMoney = (amount) => {
    return (dispatch) =>{
        dispatch({
            type: "deposite",
            pauload: amount
        })
    }
}

export const withdrawMoney = (amount) => {
    return (dispatch) =>{
        dispatch({
            type: "withdraw",
            pauload: amount
        })
    }
}


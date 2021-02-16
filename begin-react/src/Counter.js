import React, {useState, useReducer} from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1
        default:
            throw new Error('Unhandled action')
    }
}

function Counter() {
    // const [number, setNumber] = useState(0)
    const [number, dispatch] = useReducer(reducer, 0)

    const onIncreate = () => {
        // setNumber(prevNumber => prevNumber + 1) // 최적화시 함수형 업데이트가 더 좋음
        dispatch({
            type: 'INCREMENT'
        })
    }

    const onDecreate = () => {
        // setNumber(number - 1)
        dispatch({
            type: 'DECREMENT'
        })
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncreate}>+1</button>
            <button onClick={onDecreate}>-1</button>
        </div>
    )
}

export default Counter
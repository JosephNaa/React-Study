import React, {useState} from 'react'

function Counter() {
    const [number, setNumber] = useState(0)

    const onIncreate = () => {
        setNumber(prevNumber => prevNumber + 1) // 최적화시 함수형 업데이트가 더 좋음
    }

    const onDecreate = () => {
        setNumber(number - 1)
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
import React, {useEffect, useContext} from 'react'
import {UserDispatch} from './App'

const User = React.memo(function User({user}) {
    const {username, email, id, active} = user
    const dispatch = useContext(UserDispatch)
    // useEffect(() => {
    //     console.log('컴포넌트가 화면에 나타남')
    //     // props -> state
    //     // REST API
    //     // setInterval, setTimeout
    //     // D3 Video.js 등등 마운트 될 때 여기서 처리됨
    //     // 이미 화면이 나타난 이후임
    //     return () => {
    //         // clear 함수임, 지울 때 사용, 업데이트 직전에 호출됨
    //         // clearInterval, clearTimeout
    //         // 라이브러리 인스턴스 제거
    //         console.log('컴포넌트가 화면에서 사라짐')
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log('user 값이 설정됨')
    //     console.log(user)
    //     return () => {
    //         console.log('user 값이 바뀌기 전')
    //         console.log(user)
    //     }
    // }, [user]) 

    return (
        <div>
            <b 
                style={{
                    color: active ? 'green': 'black',
                    cursor: 'pointer'
                }}
                // onClick={() => onToggle(id)}
                onClick={() => dispatch({
                    type: 'TOGGLE_USER',
                    id
                })}
            >
                {username}
            </b> 
            &nbsp;
            <span>({email})</span>
            {/* <button onClick={() => onRemove(id)}>삭제</button> () => onRemove(id) 이렇게 말고 그냥 onRemove(id) 하면 렌더링 시점에서 삭제됨 */}
            <button onClick={() => dispatch({
                type: 'REMOVE_USER',
                id
            })}>
                삭제
            </button>
        </div>
    )
})

function UserList( {users}) {

    return (
        <div>
            {
                users.map(
                    (user, index) => (
                    <User 
                        user={user} 
                        key={user.id} 
                        // onRemove={onRemove}
                        // onToggle={onToggle}
                    />) // key가 딱히 없으면 index를 넣을 수 있음 key={index}
                )
            }
        </div>
    )
}

export default React.memo(
    UserList, 
    (prevProps, nextProps) => nextProps.users === prevProps.users
)
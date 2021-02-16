import React from 'react'

function User({user, onRemove, onToggle}) {
    const {username, email, id, active} = user
    return (
        <div>
            <b 
                style={{
                    color: active ? 'green': 'black',
                    cusor: 'pointer'
                }}
                onClick={() => onToggle(id)}
            >
                {username}
            </b> 
            &nbsp;
            <span>({email})</span>
            <button onClick={() => onRemove(id)}>삭제</button> {/*() => onRemove(id) 이렇게 말고 그냥 onRemove(id) 하면 렌더링 시점에서 삭제됨*/}
        </div>
    )
}

function UserList( {users, onRemove, onToggle}) {

    return (
        <div>
            {
                users.map(
                    (user, index) => (
                    <User 
                        user={user} 
                        key={user.id} 
                        onRemove={onRemove}
                        onToggle={onToggle}
                    />) // key가 딱히 없으면 index를 넣을 수 있음 key={index}
                )
            }
        </div>
    )
}

export default UserList
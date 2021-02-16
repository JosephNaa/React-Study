import React, {useRef, useState, useMemo, useCallback, useReducer, createContext} from 'react'
import CreateUser from './CreateUser';
import UserList from './UserList';
import Counter from './Counter'
import useInputs from './useInputs'

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...')

  return users.filter(user => user.active).length
}

const initialState = {
  // inputs: {
  //   username: '',
  //   email: '',
  // },
  users: [
    {
      id: 1,
      username: 'yoseph',
      email: 'js.pekah@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id:3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    }
  ]
}

function reducer(state, action) {
  switch (action.type) {
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   }
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      }
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.id
          ? { ...user, active: !user.active}
          : user
        )
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    default:
      throw new Error('Unhandled action')
  }
}

export const UserDispatch = createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  })
  const {username, email} = form
  const nextId = useRef(4)
  const {users} = state;
  // const {username, email} = state.inputs

  // const onChange = useCallback(e => {
  //   const {name, value} = e.target
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   })
  // }, [])

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    })
    nextId.current += 1
    reset()
  }, [username, email, reset])

  // const onToggle = useCallback(id => {
  //   dispatch({
  //     type: 'TOGGLE_USER',
  //     id
  //   })
  // }, [])

  // const onRemove = useCallback(id => {
  //   dispatch({
  //     type: 'REMOVE_USER',
  //     id
  //   })
  // }, [])

  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={users}
        // onToggle={onToggle}
        // onRemove={onRemove}  
      />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  )
}

// function App() {
//   const [inputs, setInputs] = useState({
//     username: '',
//     email: '',
//   })
//   const {username, email} = inputs

//   const onChange = useCallback(e => {
//     const {name, value} = e.target
//     setInputs({
//       ...inputs,
//       [name]: value,
//     })
//   }, [inputs])

//   const [users, setUsers] = useState([
//     {
//         id: 1,
//         username: 'yoseph',
//         email: 'js.pekah@gmail.com',
//         active: true,
//     },
//     {
//         id: 2,
//         username: 'tester',
//         email: 'tester@example.com',
//         active: false,
//     },
//     {
//         id:3,
//         username: 'liz',
//         email: 'liz@example.com',
//         active: false,
//     }
//   ])

//   const nextId = useRef(4)

//   const onCreate = useCallback(() => {
//     const user = {
//       id: nextId.current,
//       username,
//       email,
//     }
//     setUsers(users => [...users, user]) // 새로운 user 추가  // spread 연산자 사용 or concat 함수 사용 users.concat(user) 도 가능
//     setInputs({
//       username: '',
//       email: '',
//     })
//     nextId.current += 1
//   }, [username, email])

//   const onRemove = useCallback(id => {
//     setUsers(users => users.filter(user => user.id !== id))
//   }, [])

//   const onToggle = useCallback(id => {
//     setUsers(users => users.map(
//       user => user.id === id
//         ? { ...user, active: !user.active }
//         : user
//     ))
//   }, [])

//   const count = useMemo(() => countActiveUsers(users), [users])

//   return (
//     <>
//       <CreateUser 
//         username={username} 
//         email={email} 
//         onChange={onChange} 
//         onCreate={onCreate}
//       />
//       <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
//       <div>활성 사용자 수: {count}</div>
//     </>


//     // <InputSample />
    
//     // <Counter />


//     // <Wrapper>
//     // <Hello 
//     //   name="react" 
//     //   color="red" 
//     //   isSpecial={true} // {true} 생략해도 true임
//     // />
//     // <Hello color="pink"/>
//     // </Wrapper>
//   );
// }

export default App;

import React, {useRef, useState} from 'react'
import CreateUser from './CreateUser';
import UserList from './UserList';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  })
  const {username, email} = inputs

  const onChange = e => {
    const {name, value} = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const [users, setUsers] = userState([
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
  ])

  const nextId = useRef(4)

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    }
    setUsers([...users, user]) // 새로운 user 추가  // spread 연산자 사용 or concat 함수 사용 users.concat(user) 도 가능
    setInputs({
      username: '',
      email: '',
    })
    nextId.current += 1
  }

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const onToggle = id => {
    setUsers(users.map(
      user => user.id === id
        ? { ...user, active: !user.active }
        : user
    ))
  }

  return (
    <>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>


    // <InputSample />
    
    // <Counter />


    // <Wrapper>
    // <Hello 
    //   name="react" 
    //   color="red" 
    //   isSpecial={true} // {true} 생략해도 true임
    // />
    // <Hello color="pink"/>
    // </Wrapper>
  );
}

export default App;

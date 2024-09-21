import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    age: '',
  });
  const [userList, setUserList] = useState([]);


  useEffect(() => {
    const savedUsers = localStorage.getItem('userList');
    if (savedUsers) {
      setUserList(JSON.parse(savedUsers));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (user.name && user.surname && user.age) {
      setUserList([...userList, user]);
      setUser({ name: '', surname: '', age: '' });
    }
  }

  function handleDelete(index) {
    const updatedList = userList.filter((_, i) => i !== index);
    setUserList(updatedList);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ism"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Familiya"
          value={user.surname}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Yosh"
          value={user.age}
          onChange={handleChange}
        />
        <button type="submit">Qo'shish</button>
      </form>

      <div className="user-cards">
        {userList.map((u, index) => (
          <div key={index} className="user-card">
            <h3>{u.name} {u.surname}</h3>
            <p>Yoshi: {u.age}</p>
            <button onClick={() => handleDelete(index)}>O'chirish</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

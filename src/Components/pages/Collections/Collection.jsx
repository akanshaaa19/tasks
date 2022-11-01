import React, { useContext, useEffect, useState } from "react";
import "./Collection.css";

import { db } from "../../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import TodoItem from "../../UI/TodoItem/TodoItem";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../UI/Loading/Loading";

function Collection() {
  const authCtx = useContext(AuthContext);

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");

  function changeHandeler(e) {
    setInput(e.target.value);
  }

  async function submitHandeler(e) {
    setLoading(true)
    e.preventDefault();

    if(input.trim() === ''){
      alert("Invalid input")
      return;
    }

    const userRef = doc(db, "users", email);

    await updateDoc(userRef, {
      todos: arrayUnion({title: input, id: Math.random()}),
    });

    setInput("");
    setLoading(false)
  }

  useEffect(()=>{
    setLoading(true)
    authCtx.getUser(email).then(user=>{
      setTodos(user.todos)
    })
    setLoading(false)
  }, [todos, setTodos])

  return (
    <React.Fragment>
      <section id="collection" className="content">
        <div className="content">
          <h1>Tasks</h1>
          <form onSubmit={submitHandeler} className="collection-form container">
            <div className="input-div">
              <input
                placeholder="Enter Todo"
                value={input}
                onChange={changeHandeler}
              />
            </div>
            <div className="btn-div">
              <button type="submit">
                <i className="fa-solid fa-plus fa-2xl"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="collection-div">
          {todos.map((todo) => {
            return <TodoItem title={todo.title} id={todo.id} key={todo.id} />;
          })}
        </div>
        <div className="loading">{loading ? <LoadingSpinner /> : null}</div>
      </section>
    </React.Fragment>
  );
}

export default Collection;

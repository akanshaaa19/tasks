import { doc, updateDoc, arrayRemove, FieldValue } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase";
import classes from"./TodoItem.module.css";

function TodoItem(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [titleClass, setTitleClass] = useState(null);

  const email = localStorage.getItem('email')

  const checkBox = isChecked ? (
    <i className="fa-regular fa-square-check fa-2x"></i>
  ) : (
    <i className="fa-regular fa-square fa-2x"></i>
  );

  function checkHandeler(){
    setIsChecked(!isChecked);
    setTitleClass(!isChecked ? classes.strike : null)
  }

  async function deleteHandeler(obj){
    const userRef = doc(db, 'users', email)
    await updateDoc(userRef, {
      todos: arrayRemove(obj)
  });
  }

  return (
    <div className={classes.todo}>
      <div className={classes.right}>
        <div className={classes.checkBox} onClick={checkHandeler}>
          {checkBox}
        </div>
        <h3 className={titleClass}>{props.title}</h3>
      </div>
      <div className={classes.left} onClick={()=> deleteHandeler({title: props.title, id: props.id})} >
      <i className="fa-sharp fa-solid fa-trash fa-2x"></i>
      </div>
    </div>
  );
}

export default TodoItem;

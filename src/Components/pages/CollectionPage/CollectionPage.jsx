import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase";

function CollectionPage() {
  const params = useParams();
  const [input, setInput] = useState("");

  function changeHandeler(e){
    setInput(e.target.value);
  }

  async function submitHandeler(e){
    console.log(input)
    e.preventDefault();
    await updateDoc(doc(db, 'todos', params.id), {
        todos: arrayUnion(input)
    });
    setInput('')
  }

  return (
    <React.Fragment>
        <h1>{params.cTitle}</h1>
      <form onSubmit={submitHandeler} className="collection-form container">
        <div className="input-div">
          <input
            placeholder="Enter list name"
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
    </React.Fragment>
  );
}

export default CollectionPage;

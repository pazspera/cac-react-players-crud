import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const Create = () => {
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [position, setPosition] = useState("");

  const navigate = useNavigate();

  // Como llegamos a la base de datos
  const playersCollection = collection(db, "players");

  const createPlayer = async (e) => {
    e.preventDefault();

    await addDoc(playersCollection, {
      lastName: lastName,
      name: name,
      position: position,
      number: number,
    });

    navigate("/");
  };

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col">
          <h1>Create Player</h1>
          <form onSubmit={createPlayer}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Last name</label>
              <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Number</label>
              <input type="number" className="form-control" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} />
            </div>
            <div className="my-3">
              <button className="btn btn-primary me-3">Create player</button>
              <Link to={"/"}>
                <button className="btn btn-danger">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const Edit = () => {
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [position, setPosition] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  // función que actualiza un documento
  const update = async (e) => {
    e.preventDefault();

    // cómo llegar al doc que quiero editar
    const playerDoc = doc(db, "players", id);
    const data = {
      lastName: lastName,
      name: name,
      number: Number(number),
      position: position,
    };
    await updateDoc(playerDoc, data);
    navigate("/");
  };

  // función que trae un doc por su id
  // llena los inputs con los datos de db
  const getPlayerById = async (id) => {
    // cómo llegar al doc que quiero editar
    const playerDoc = doc(db, "players", id);
    const player = await getDoc(playerDoc);

    // valida que el jugador exista
    if (player.exists()) {
      setLastName(player.data().lastName);
      setName(player.data().name);
      setNumber(player.data().number);
      setPosition(player.data().position);
    } else {
      console.log("El jugador no existe");
    }
  };

  useEffect(() => {
    getPlayerById(id);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Edit Player</h1>
          <form onSubmit={update}>
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
              <button className="btn btn-primary me-3">Edit player</button>
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

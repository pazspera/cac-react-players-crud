import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

export const Show = () => {
  // 1. configurar los hooks
  const [players, setPlayers] = useState([]);

  // 2. referenciar a la db de firestore
  const playersCollection = collection(db, "players");

  // 3. función para mostrar todos los docs
  const getPlayers = async () => {
    const data = await getDocs(playersCollection);
    console.log(data.docs);
    setPlayers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(players);
  };

  // 4. función para elimar un doc
  const deletePlayer = async (id) => {
    const playerDoc = doc(db, "players", id);
    await deleteDoc(playerDoc);
    // una vez borrado, necesitamos que se actualice con la info borrada
    getPlayers();
  };

  // 5. función para la confirmación de sweet alert
  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Estás segurx?",
      text: "¡No podés revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Sí, quiero borralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        // llamar a la función eliminar
        deletePlayer(id);
        Swal.fire("¡Eliminado!", "El jugador fue eliminado", "success");
      }
    });
  };

  // 6. useEffect (función que trae todos los docs)
  useEffect(() => {
    getPlayers();
  }, []);

  // 7. devolvemos la vista del componente
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col my-3">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-primary">
                Crear
              </Link>
            </div>
            <table className="table table-dark table-hover table-striped my-4">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Número</th>
                  <th>Posición</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.lastName}</td>
                    <td>{player.number}</td>
                    <td>{player.position}</td>
                    <td>
                      <Link to={`/edit/${player.id}`} className="btn btn-light me-2">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(player.id);
                        }}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

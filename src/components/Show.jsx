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
    // getPlayers()
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
  return (<div></div>);
};

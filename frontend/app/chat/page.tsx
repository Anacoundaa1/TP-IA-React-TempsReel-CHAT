"use client";
import { useContext, useEffect, useState } from "react";
import ConteneurMessages from "./ConteneurMessages";
import Username from "./Username";
import socketContext from "../socketContext";
import HeaderPage from "./components/HeaderPage";

const Chat = () => {
  const [username, setUsername] = useState(""); // État pour stocker le nom d'utilisateur
  const [isUsernameTaken, setIsUsernameTaken] = useState(false); // État pour indiquer si le nom d'utilisateur est pris

  const socket = useContext(socketContext);

  useEffect(() => {
    // Ecouter l'évenement côté client pour indiquer que la client est connecté
    socket.on("connect", () => {
      console.log("connected");
    });

    // Écouter l'événement côté client pour indiquer si le nom d'utilisateur est pris
    socket.on("username-taken", (isTaken) => {
      setIsUsernameTaken(isTaken);
    });
  }, [socket]);

  // Fonction pour définir le nom d'utilisateur localement
  const setUsernameHandler = (newUsername: string) => {
    // Vérifier si le nom d'utilisateur est déjà pris avant de le définir
    if (!isUsernameTaken) {
      setUsername(newUsername);
    }
  };

  return (
    <div>
      <HeaderPage username={username} isUsernameTaken={isUsernameTaken} />

      <Username socket={socket} setUsername={setUsernameHandler} />
      
      <ConteneurMessages socket={socket} username={username}/>
    </div>
  );
};

export default Chat;

import Messages from "./Messages"
import SendMessage from "./SendMessages";
import { Socket } from "socket.io-client";
import { useState } from "react";
import SelecteurLangage from "./components/SelecteurLangage";



interface Props{
    socket: Socket;
    username: string;
}


const Chat = ({socket, username }: Props) => {

  const [langage, setLangage] = useState("");
  
  // Fonction qui permet de changer le langage 
  const changeLangage = (event : any) => {
    setLangage(event.target.parentElement.parentElement.getElementsByTagName('input')[1].value);
  };

  return (
    <div className="bg-white w-11/12 mx-auto rounded-lg shadow-md mt-20 mb-20 flex flex-col">

      {/* Composant pour selectionner la langue pour traduire */}
      <SelecteurLangage changeLangage={changeLangage} /> 

      {/* Composant pour afficher les messages */}
      <Messages username={username} langage={langage}/>
  

      {/* Composant pour envoyer des messages */}
      <SendMessage socket={socket} username={username} />

    </div>
  );
};

export default Chat;

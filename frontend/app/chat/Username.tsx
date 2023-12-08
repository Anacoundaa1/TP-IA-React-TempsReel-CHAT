import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';




export interface Props {
  socket: Socket;
  setUsername: (username: string) => void;
}

const Username = ({ socket, setUsername }: Props) => {
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [etat, setEtat] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  

    if(text)
    {
      socket.emit("set-username", text);

      socket.on("username-error", (error) => {
        setErrorMessage(error);
      });

      if (!errorMessage) {
        setUsername(text);
        setEtat(true);
      }
    }
    else{
      setErrorMessage("Veuillez entrer un nom d'utilisateur.")
    }

    
  };

  useEffect(() => {
    return () => {
      setErrorMessage("");
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <Input disabled={etat} value={text}  onChange={(e) => setText(e.target.value)} className="w-12/12" color="primary" placeholder="Nom d'utilisateur" />
          <Button className="bg-blue-700/100"
            color="primary"
            size="md"
            variant="solid"
            type="submit"
            hidden={etat}
          >Enregistrer</Button>
          <Button className="bg-orange-700/100"
            onClick={() => setEtat(false)}
            size="md"
            variant="solid"
            type="button"
            hidden={!etat}
          >Modifier</Button>
        </div>
        
        {/* <button >Enregistrer</button> */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
    </div>
    
    
  );
};

export default Username;

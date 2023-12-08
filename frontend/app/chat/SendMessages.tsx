import { MouseEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";
import Typography from "@mui/joy/Typography";
import { IMessage } from "./Message";
import Suggestion from "./components/Suggestion";

export interface Props {
  socket: Socket;
  username: string;
}

const SendMessage = ({ socket, username }: Props) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [openMessageVide, setOpenMessageVide] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [suggestionContent, setSuggestionContent] = useState<any>();

  const [lastMessage, setLastMessage] = useState<IMessage>();


  useEffect(() => {
    socket.on("chat-message", (data: IMessage) => {
      setLastMessage(data as any);
    });

    socket.on("suggestion", (suggestionContent) => {
      console.log("Suggestion de chatgpt : ", suggestionContent);
      setSuggestionContent(suggestionContent);
    });
  }, []);

  useEffect(() => {
    setIsDisabled(!(lastMessage && lastMessage.username !== username));
  }, [lastMessage]);

  const changeInput = (e: any) => {

    const s = document.getElementById("inputMessage") as any;
    console.log(e.target.innerHTML);
    s.value = e.target.innerHTML;
    setText(e.target.innerHTML)
  }

  const suggestion = () => {

    if (lastMessage?.username !== username) {
      console.log(
        "Demande a chat gpt de suggerer quelque chose par rapport à ça :  ",
        lastMessage?.content
      );
      socket.emit("suggestion", lastMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérifier si un nom d'utilisateur est défini et si le texte du message n'est pas vide
    if (username && text.trim() !== "") {
      socket.emit("chat-message", {
        content: text,
        timeSent: new Date().toISOString(),
        username: username, // Envoyer le nom d'utilisateur avec le message
      });
      setText("");
      setSuggestionContent(null)
    } else if (!username) {
      setOpen(true);
    }
    else{
      setOpenMessageVide(true);
    }
  };

  return (
    <div className="rounded-lg p-5 flex flex-col">
      
      <Suggestion changeInput={changeInput} username={username}  lastMessage={lastMessage} suggestionContent={suggestionContent}/>
     
      <form className="flex gap-3 flex-end w-12/12" onSubmit={handleSubmit}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-10/12"
          color="primary"
          placeholder="Écrire un message..."
          id="inputMessage"
        />
        <Button
          className="bg-blue-700/100 w-2/12"
          size="md"
          variant="solid"
          type="submit"
        >
          Envoyer
        </Button>
        <Button
          className="bg-green-700/100 w-2/12"
          onClick={suggestion}
          size="md"
          variant="solid"
          type="button"
          disabled={isDisabled}
        >
          Suggestion
        </Button>
      </form>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        color="danger"
        variant="soft"
      >
        <div>
          <Typography color="danger" level="title-lg">
            Erreur
          </Typography>
          <Typography color="danger">
            Veuillez entrer un nom d&apos;utilisateur avant d&apos;envoyer un
            message.
          </Typography>
        </div>
      </Snackbar>

      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openMessageVide}
        onClose={() => setOpenMessageVide(false)}
        color="danger"
        variant="soft"
      >
        <div>
          <Typography color="danger" level="title-lg">
            Message vide
          </Typography>
          <Typography color="danger">
            Veuillez entrer un message.
          </Typography>
        </div>
      </Snackbar>
    </div>
  );
};

export default SendMessage;

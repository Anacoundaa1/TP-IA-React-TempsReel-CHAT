import { MouseEvent, useContext, useEffect, useState } from "react";
import socketContext from "../socketContext";
import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';


//Permet de creer un type de type Imessage
export interface IMessage {
  content: string;
  timeSent: string;
  username: string;
  isMe: boolean;
  index: number;
  langage: string;
}

const Message = ({ username, isMe, content, index, langage }: IMessage) => {
  const [translatedContent, setTranslatedContent] = useState<string | null>(
    null
  );

  const [verifiedContent, setverifiedContent] = useState<string | null>(null);
  const socket = useContext(socketContext);
  const [visibleLoading, setVisibleLoading] = useState<boolean>(true);

  const [isLoading, setIsLoading] = React.useState(false);

  const { value: value1, reset: resetValue1 } = useCountUp({
    isCounting: isLoading,
    duration: 2,
    start: 0,
    end: 100,
    onComplete: () => {
      setIsLoading(false);
      resetValue1();
      setVisibleLoading(true)
    },
  });


  useEffect(() => {
    socket.on("translation", (translatedContent) => {
      console.log(translatedContent);

      if (translatedContent.id === index) {
        setverifiedContent(null);
        setTranslatedContent(translatedContent.translate);
      }
    });

    socket.on("verification", (verifiedContent) => {
      console.log(verifiedContent);

      const informationElement = document.getElementById("information-" + index);


      console.log(informationElement);


      console.log(index);
      console.log(verifiedContent.id);
      if (verifiedContent.id === index) {

        if (informationElement) {
          informationElement.style.display = "block";
        }
        setTranslatedContent(null);
        setverifiedContent(verifiedContent.verif);

        setTimeout(() => {
          if (informationElement) {
            informationElement.style.display = "none";
          }
        }, 4000);
      }

      
    });

    return () => {
      socket.off("translation");
      socket.off("verification");
      socket.off("chat-message");
    };
  }, []);

  const translate = () => {
    setVisibleLoading(false);

    let language = "english";
    console.log("On envoie ce contenu: ", content);
    if (langage != "") {
      language = langage;
    }

    if (isLoading) {
      setIsLoading(false);
      resetValue1();
      setVisibleLoading(false);
    } else {
      setIsLoading(true);
    }

    socket.emit("translate", { content, targetLanguage: language, index });
    resetValue1();
    

  };

  const verification = () => {
    setVisibleLoading(false);
    console.log("On envoie ce contenu: ", content);
    if (isLoading) {
      setIsLoading(false);
      resetValue1();
      setVisibleLoading(false);
    } else {
      setIsLoading(true);
    }
    socket.emit("verification", { content, index });
    resetValue1();
  };

  return (
    <div className={isMe ? "chat chat-end" : "chat chat-start"}>
      
      <div className="chat-header flex">{isMe ? "Moi" : username}</div>
      <div
        className={
          isMe
            ? "chat-bubble chat-bubble-info bg-blue-600 text-white flex items-center"
            : "chat-bubble chat-bubble-info bg-slate-200 flex items-center"
        }
      >
        {isMe ?  <CircularProgress hidden={visibleLoading} className="mr-3" size="sm" determinate value={value1 as number}>
        </CircularProgress> : ""}
        {translatedContent || content}
        {!isMe ?  <CircularProgress hidden={visibleLoading} className="ml-3" size="sm" determinate value={value1 as number}>
        </CircularProgress> : ""}
      </div>
      <div className="chat-footer flex flex-col gap-1">
        <div className="flex gap-1">
          <p
            onClick={translate}
            className="text-blue-500 opacity-100 cursor-pointer underline"
          >
            Traduire{" "}
          </p>
          <p> - </p>
          <p
            onClick={verification}
            className="text-blue-500 opacity-100 cursor-pointer underline"
          >
            {" "}
            Vérifier l&apos;information
          </p>
        </div>
        <div id={"information-" + index}>
          {verifiedContent ? (
            <i
              className={
                verifiedContent.toLowerCase() == "correcte"
                  ? "text-sm text-green-600"
                  : "text-sm text-red-600"
              }
            >
              L&apos;information semble {verifiedContent.toLowerCase()}
            </i>
          ) : (
            ""
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Message;

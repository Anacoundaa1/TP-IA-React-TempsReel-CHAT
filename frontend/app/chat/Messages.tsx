import { useContext, useEffect, useState } from "react";
import Message, { IMessage } from "./Message";
import socketContext from "../socketContext";

interface Props {
  username: string;
  langage: string;
}

const Messages = ({ username, langage }: Props) => {
  const socket = useContext(socketContext);

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket.on("chat-message", (data: IMessage[]) => {

      setMessages((msg) => [...msg, data] as any);
    });
  }, []);

  return (
    <div>
      <div className="mx-10 py-5">
        {messages.map((msg, index) => (
          <div key={msg.timeSent}>
            <Message
              langage={langage}
              index={index}
              isMe={msg.username === username}
              username={msg.username}
              content={msg.content}
              timeSent={msg.timeSent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;

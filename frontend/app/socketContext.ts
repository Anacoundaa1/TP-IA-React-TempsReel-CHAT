import { createContext } from "react";
import { io } from "socket.io-client";

const socketContext = createContext(io("http://localhost:3000"));

export default socketContext;

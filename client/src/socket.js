// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Make sure this matches your server port
export default socket;

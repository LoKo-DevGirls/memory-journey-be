import { createServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import app from "./app.js";

export const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("open", function open() {
    ws.send("websocket open");
  });

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});

export function sendMemoryToProcessing(memory) {
  const memoryString = JSON.stringify(memory);
  let sent = false;
  if (wss.clients.length === 0) {
    throw new Error("No clients connected");
  }

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(memoryString);
      sent = true;
    }
  });

  if (!sent) {
    throw new Error("Failed to send data");
  }
}

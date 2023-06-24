import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 7070 });

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

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(memoryString);
      sent = true;
    }
  });

  if (!sent) {
    throw new Error("Processing is not connected");
  }
}

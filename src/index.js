import { server } from "./webSocket.js";
const PORT = process.env.PORT || "80";

server.listen(PORT, () => {
  console.log(`🚀 Server is running from http://localhost:${PORT}`);
});

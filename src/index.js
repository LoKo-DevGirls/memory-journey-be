import app from "./app.js";
const PORT = process.env.PORT || "80";
// testing db

app.listen(PORT, () => {
  console.log(`🚀 Server is running from http://localhost:${PORT}`);
});

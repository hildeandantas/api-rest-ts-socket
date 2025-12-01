import "dotenv/config";
import App from "./app";
import WebSocket from "./lib/socket";

const PORT = process.env.PORT || 3000;
const app = new App().app;

const server = app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

new WebSocket(server);

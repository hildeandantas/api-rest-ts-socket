import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { verify } from "jsonwebtoken";
import "dotenv/config";

class WebSocket {
  private io: Server;

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
      connectionStateRecovery: {},
    });
    console.log("Initializing WebSocket");
    this.initialize();
  }

  private initialize() {
    this.io.on("connection", (socket) => {
      const { acess_token } = socket.handshake.query || {};

      if (!acess_token) {
        console.error("No access token provided");
        socket.disconnect();
        return;
      }

      verify(
        acess_token as string,
        process.env.JWT_SECRET as string,
        (err, decoded) => {
          if (err) {
            console.error("Token verification failed:", err.name);
            socket.disconnect();
            return;
          }
          console.log("User connected:", decoded);
        }
      );

      this.registerCoreEvents(socket);
    });
  }

  private registerCoreEvents(socket: Socket) {
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });

    socket.on("ping", (arg) => {
      socket.emit("pong", arg);
    });
  }

  public getIO(): Server {
    if (!this.io) {
      throw new Error("WebSocket is not initialized");
    }
    return this.io;
  }
}

export default WebSocket;

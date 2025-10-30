// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: process.env.PORT || 10000 });
console.log("✅ WebSocket sunucusu başlatıldı...");

wss.on("connection", (ws) => {
  console.log("💬 Yeni kullanıcı bağlandı");
  
  ws.on("message", (msg) => {
    // mesajı herkese gönder
    for (const client of wss.clients) {
      if (client.readyState === ws.OPEN) {
        client.send(msg.toString());
      }
    }
  });

  ws.on("close", () => console.log("❌ Kullanıcı ayrıldı"));
});

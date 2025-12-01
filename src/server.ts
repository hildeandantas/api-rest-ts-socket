import "dotenv/config";
import App from "./app";
import WebSocket from "./lib/socket";

const app = new App().app;
const PORT = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'local';

if (environment === 'production') {
  console.log('🔒 Log de segurança ativado (Produção)');
} else {
  console.log('🐛 Modo Debug ativado (Dev/Homolog)');
}

const server = app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Ambiente sendo utilizado: ${environment}`)
});

new WebSocket(server);

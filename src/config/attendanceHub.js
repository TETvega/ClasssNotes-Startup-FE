import { HubConnectionBuilder } from "@microsoft/signalr";

// Configuración de la conexión SignalR
const connection = new HubConnectionBuilder()
  .withUrl("https://localhost:7047/hubs/attendance", {
    accessTokenFactory: () => localStorage.getItem("token"), // obteniendo desde localeStoage provisionalmente
  })
  // .withAutomaticReconnect() // Recomendado para manejar reconexiones
  .build();

export default connection;

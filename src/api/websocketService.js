const WEBSOCKET_URL = "wss://cenffmw7jl.execute-api.ap-south-1.amazonaws.com/dev/"; // Replace with your WebSocket URL

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  // Connect WebSocket
  connect(email) {
    return new Promise((resolve, reject) => {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        this.socket = new WebSocket(`${WEBSOCKET_URL}?emailId=${email}`); // Attach email as a query param

        this.socket.onopen = () => {
          console.log("WebSocket Connected");
          this.isConnected = true;
          resolve();
        };

        this.socket.onerror = (error) => {
          console.error("WebSocket Error: ", error);
          reject(error);
        };

        this.socket.onclose = () => {
          console.log("WebSocket Disconnected");
          this.isConnected = false;
        };

        /**
         * Handle incoming messages from the WebSocket server
         * @param {MessageEvent} event - The event emitted by WebSocket
         */
        this.socket.onmessage = (event) => {
          console.log("Received Message: ", event.data);
        };
      } else {
        resolve();
      }
    });
  }

  // Send message
  sendMessage(message) {
    if (this.isConnected && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
      console.log("Message Sent: ", message);
    } else {
      console.error("WebSocket is not connected.");
    }
  }

  // Disconnect WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.close();
      console.log("WebSocket Connection Closed.");
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;

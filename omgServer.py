import asyncio
import socket
import websockets # type: ignore
import time

# Server IP
serverIP = '192.168.1.116'
# Arduino Port
serverPort = 12345
webServerPort = 8765

async def send_numbers(websocket):
    print("Web Client Connected")
    try:
         # Create a socket object for arduino
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        # Fixes rebinding issues
        server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

        # Bind arduino socket to server IP and port
        server_socket.bind((serverIP, serverPort))
        server_socket.listen(10)
        print("Server is listening on port 12345...")

        while True:

            # Accept connection from client arduino
            conn, addr = server_socket.accept()
            print(f"Connected by {addr}")
            conn.settimeout(2.5)

            # Receive data from client arduino
            data = conn.recv(25).decode()
            print("Received from client:", data)

            # Send a response to client arduino
            conn.sendall("Hello from server!".encode())

            for i in range(1000):
                try:
                    data = conn.recv(4)
                    print(f"Received: {data.decode()}")

                    # Websocket Logic
                    number = data.decode()
                    try:
                        await websocket.send(number)
                    except ValueError:
                        print("Please enter a valid number")

                except socket.timeout:
                    print("\nClient Disconnected!\n")
                    conn.close()
                    break
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")
    finally:
        print("Connection closed")

async def main():
    # Create a server object for the web socket
    server = await websockets.serve(send_numbers, serverIP, webServerPort)
    print("WebSocket server running on ws://localhost:8765")

    # Keep server running indefinitely
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())%     

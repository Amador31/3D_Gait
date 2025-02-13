import socket

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind to localhost and a port
server_socket.bind(('127.0.0.1', 12345))
server_socket.listen(1)

print("Server is listening on port 12345...")

# Accept connection from client
conn, addr = server_socket.accept()
print(f"Connected by {addr}")

# Receive data from client
data = conn.recv(1024).decode()
print("Received from client:", data)

# Send a response
conn.sendall("Hello from server!".encode())

# Close connection
conn.close()
server_socket.close()

import socket

# Create a socket object
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to the server
client_socket.connect(('127.0.0.1', 12345))

# Send data to server
client_socket.sendall("Hello from client.py".encode())

# Receive response from server
data = client_socket.recv(1024).decode()
print("Received from server:", data)

# Close connection
client_socket.close()

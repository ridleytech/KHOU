import socket
import json
import weather10day

HOST, PORT = '', 9999

listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
listen_socket.bind((HOST, PORT))
listen_socket.listen(1)

print('Serving HTTP on port %s ...' % PORT)

data = weather10day.getWeather()

while True:
    client_connection, client_address = listen_socket.accept()
    request = client_connection.recv(1024).decode("utf-8")

    if "GET /" in request:
        http_response = "HTTP/1.1 200 OK\r\n"
        http_response += "ngrok-skip-browser-warning: 1\r\n"
        http_response += "Content-Type: application/json\r\n\r\n"
        http_response += "\r\n"
        http_response += data

        client_connection.sendall(http_response.encode("utf-8"))
    else:
        # Handle other requests or methods here if needed
        http_response = "HTTP/1.1 405 Method Not Allowed\r\n"
        http_response += "Content-Type: text/plain\r\n\r\n"
        http_response += "Method Not Allowed"

        client_connection.sendall(http_response.encode("utf-8"))

    client_connection.close()

import { io } from "socket.io-client";

var socket;

export function initSocket() {
	socket = io(process.env.REACT_APP_API_BASE_URL);
	socket.on('connect', () => {
		console.log(`Conectado: ${socket.id}`)
	});
	return socket;
}

export function emitSocket(msg) {
	socket.emit('message', msg);
}

export function emitExportTestplan(id) {
	socket.emit('export-testplan', id);
}

export function closeSocket() {
	socket.disconnect();
}
import { io } from "socket.io-client";

var socket;

export function initSocket() {
	socket = io("http://localhost:4000");
	socket.on('connect', () => {
		console.log(`Conectado: ${socket.id}`)
	});
	return socket;
};

export function emitSocket(msg) {
	socket.emit('message', msg);
};

export function emitExportTestplan(id) {
	socket.emit('export-testplan', id);
};

export function closeSocket() {
	socket.disconnect();
};
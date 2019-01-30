import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000'; //Backend server url
  private socket;
  constructor() {
    this.socket = io(this.url);
    this.socket.on('chat message', function (message) {
      console.log(message);
    });
    // this.socket.on('event', function (data) { });
    // this.socket.on('disconnect', function () { });
    // this.socket.emit('on-user', 'user connected');
    // this.sendMessage();
  }

  public sendMessage(message) {
    this.socket.emit('new-message', {
      user_id: localStorage.getItem('user_id'),
      message: message
    });
  }
}

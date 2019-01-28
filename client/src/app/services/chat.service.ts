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
    // this.socket.on('connection', function () {
    //   console.log("connect");
    // });
    // this.socket.on('event', function (data) { });
    // this.socket.on('disconnect', function () { });
    // this.socket.emit('on-user', 'user connected');
  }
}

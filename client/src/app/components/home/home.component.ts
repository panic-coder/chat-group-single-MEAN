import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private chatService: ChatService) { }
  chatArray = [];
  text: String;
  ngOnInit() {
  }

  sendText() {
    // this.text = messageData;
    console.log(this.text);

    this.chatArray.push({ text: this.text });
    // console.log(this.chatArray);
    this.chatService.sendMessage(this.text);
    this.text = ''
  }

}

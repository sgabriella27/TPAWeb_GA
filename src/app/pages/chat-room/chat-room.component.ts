import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  user: any;
  userID: any;
  chat: any;
  friendChat: any;
  insertChat: any;

  constructor(private fb: FormBuilder, private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.firstDisplay(this.userID);
  }

  firstDisplay(userID: string): void {
    console.log('asd');
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
          displayName
          friends {
            friendID,
            friend {
              displayName
            }
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
      this.apollo.subscribe({
        query: gql`subscription asdf($friendID: ID!){
          privateChatAdded(userID: $friendID)
        }`, variables: {friendID: this.user.id}
      }).subscribe(resp => {
        // @ts-ignore
        this.friendChat = resp.data.privateChatAdded;
      });
    });
  }

  insertPrivateChat(): void {
    this.apollo.mutate({
      mutation: gql`mutation asdf($message: String!, $userID: ID!) {
        insertUserChat(message: $message, userID: $userID)
      }`, variables: {message: this.insertChat, userID: this.route.snapshot.paramMap.get('id')}
    }).subscribe(resp => {
      // @ts-ignore
      this.chat = resp.data.insertUserChat;
    });
  }
}

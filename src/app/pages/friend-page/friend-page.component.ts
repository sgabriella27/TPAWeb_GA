import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrls: ['./friend-page.component.scss']
})
export class FriendPageComponent implements OnInit {

  user: any;
  userID: any;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
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
          displayName,
          friendCode
          friends {
            friendID,
            friend {
              id
              displayName
              level,
              profilePic
              status
            }
          }
          friendRequest {
            friend {
              id
              displayName
              level,
              profilePic
              status
            }
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
    });
  }

  acceptFriend(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation AcceptFriendRequest ($userID: ID!, $friendID: ID!) {
        acceptFriendRequest(userID: $userID, friendID: $friendID) {
          friendID
        }
      }`, variables: {userID: this.user.id, friendID: id}
    }).subscribe(resp => {
      alert('Added Friend Success!');
    });
  }

  rejectFriend(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation RejectFriendRequest ($userID: ID!, $friendID: ID!) {
        rejectFriendRequest(userID: $userID, friendID: $friendID) {
          friendID
        }
      }`, variables: {userID: this.user.id, friendID: id}
    }).subscribe(resp => {
      alert('Reject Friend Success! :(');
    });
  }

  ignoreFriend(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation IgnoreFriendRequest ($userID: ID!, $friendID: ID!) {
        ignoreFriendRequest(userID: $userID, friendID: $friendID) {
          friendID
        }
      }`, variables: {userID: this.user.id, friendID: id}
    }).subscribe(resp => {
      alert('Ignore Friend Success! :(');
    });
  }

  addByCode(code: string): void {
    this.apollo.mutate({
      mutation: gql`
        mutation addFriendByCode($userID: ID!, $code: String!) {
          insertFriendRequestByCode(userID: $userID, code: $code) {
            friendID
          }
        }
      `, variables: { userID: this.user.id, code }
    }).subscribe(resp => {
      alert('add by code success');
    });
  }
}

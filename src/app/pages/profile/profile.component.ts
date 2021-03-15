import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  userID: any;
  allActivities: any;
  page = 1;
  aku: any;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
          displayName
          friends {
            friendID,
            friend {
              displayName
              status
            }
          }
          friendRequest {
            friend {
              displayName
            }
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.aku = res.data?.getUser;
    });
    this.firstDisplay(this.userID);
    this.getAllActivities();
  }

  firstDisplay(userID: string): void {
    this.apollo.query<{ getUserByCustomURL: any }>({
      query: gql` query getUserByCustomURL($jwtToken: String!, $page: Int!){
        getUserByCustomURL(customURL: $jwtToken) {
          id,
          displayName,
          realName,
          summary,
          profilePic,
          theme,
          level,
          friends {
            friend {
              displayName
              status
            }
          }
          frame {
            itemImg
          }
          badge {
            itemImg
          }
          miniBackground {
            itemImg
          }
          profileComment(page: $page) {
            user {
              displayName
            }
            comment
          }
        }
      }`, variables: {jwtToken: this.route.snapshot.paramMap.get('customURL'), page: this.page}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUserByCustomURL;
    });
  }

  getAllActivities(): void {
    this.apollo.query<{ getAllActivities: any }>({
      query: gql`query getAllActivities($page: Int!) {
        getAllActivities(page: $page) {
          id,
          userID,
          activity
        }
      }`, variables: {page: this.page}
    }).subscribe(resp => {
      // @ts-ignore
      this.allActivities = resp.data.getAllActivities;
    });
  }

  prevPage(): void {
    this.page--;
    this.apollo.query<{ getAllActivities: any }>({
      query: gql`query getAllActivities($page: Int!) {
        getAllActivities(page: $page) {
          id,
          userID,
          activity
        }
      }`, variables: {page: this.page}
    }).subscribe(resp => {
      this.allActivities = resp.data.getAllActivities;
    });
  }

  nextPage(): void {
    this.page++;
    this.apollo.query<{ getAllActivities: any }>({
      query: gql`query getAllActivities($page: Int!) {
        getAllActivities(page: $page) {
          id,
          userID,
          activity
        }
      }`, variables: {page: this.page}
    }).subscribe(resp => {
      this.allActivities = resp.data.getAllActivities;
    });
  }

  addFriend(): void {
    this.apollo.mutate({
      mutation: gql`mutation addFriend($userID: ID!, $friendID: ID!) {
        insertFriendRequest(userID: $userID, friendID: $friendID) {
          userID
        }
      }`, variables: {userID: this.aku.id, friendID: this.user.id}
    }).subscribe(resp => {
      alert('success!');
    });
  }

  addComment(value: string) {
    this.apollo.mutate({
      mutation: gql`mutation addComment($userID: ID!, $profileID: ID!, $comment: String!) {
        insertProfileComment(userID: $userID, profileID: $profileID, comment: $comment) {
          id
        }
      }`, variables: {userID: this.aku.id, profileID: this.user.id, comment: value}
    }).subscribe();
  }

  prevPageComment() {
    this.page--;
    this.apollo.query<{ getUserByCustomURL: any }>({
      query: gql` query getUserByCustomURL($jwtToken: String!, $page: Int!){
        getUserByCustomURL(customURL: $jwtToken) {
          id,
          displayName,
          realName,
          summary,
          profilePic,
          theme,
          level,
          friends {
            friend {
              displayName
              status
            }
          }
          frame {
            itemImg
          }
          badge {
            itemImg
          }
          miniBackground {
            itemImg
          }
          profileComment(page: $page) {
            user {
              displayName
            }
            comment
          }
        }
      }`, variables: {jwtToken: this.route.snapshot.paramMap.get('customURL'), page: this.page}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUserByCustomURL;
    });
  }

  nextPageComment() {
    this.page++;
    this.apollo.query<{ getUserByCustomURL: any }>({
      query: gql` query getUserByCustomURL($jwtToken: String!, $page: Int!){
        getUserByCustomURL(customURL: $jwtToken) {
          id,
          displayName,
          realName,
          summary,
          profilePic,
          theme,
          level,
          friends {
            friend {
              displayName
              status
            }
          }
          frame {
            itemImg
          }
          badge {
            itemImg
          }
          miniBackground {
            itemImg
          }
          profileComment(page: $page) {
            user {
              displayName
            }
            comment
          }
        }
      }`, variables: {jwtToken: this.route.snapshot.paramMap.get('customURL'), page: this.page}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUserByCustomURL;
    });
  }
}

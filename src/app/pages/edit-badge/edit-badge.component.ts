import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-badge',
  templateUrl: './edit-badge.component.html',
  styleUrls: ['./edit-badge.component.scss']
})
export class EditBadgeComponent implements OnInit {

  user: any;
  userID: any;
  badgeURL: any;

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
          profilePic,
          ownedBadge {
            id,
            itemImg
          },
          badge {
            id,
            itemImg
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      this.badgeURL = res.data.getUser.badge.itemImg;
      console.log('asdf');
      console.log(this.user);
    });
  }

  saveBadge(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation updateBadge($id: ID!, $badgeID: ID!) {
        updateBadge(id: $id, badgeID: $badgeID) {
          id
        }
      }`, variables: {id: this.user.id, badgeID: id}
    }).subscribe(resp => {
      alert('Update Badge Success');
    });
  }

  changeBadge(badgeName: string): void {
    this.badgeURL = badgeName;
  }

}

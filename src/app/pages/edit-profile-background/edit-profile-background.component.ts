import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile-background',
  templateUrl: './edit-profile-background.component.html',
  styleUrls: ['./edit-profile-background.component.scss']
})
export class EditProfileBackgroundComponent implements OnInit {

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
          ownedBackground {
            id,
            itemImg
          },
          background {
            id,
            itemImg
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
    });
  }

  saveBackground(id: any): void {
    console.log('hello');
    this.apollo.mutate({
      mutation: gql`mutation updateBackground($id: ID!, $backgroundID: ID!) {
        updateBackground(id: $id, backgroundID: $backgroundID) {
          id
        }
      }`, variables: {id: this.user.id, backgroundID: id}
    }).subscribe(resp => {
      alert('Update Background Success');
      window.location.reload();
    });
  }
}

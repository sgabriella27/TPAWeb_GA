import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-mini-profile',
  templateUrl: './edit-mini-profile.component.html',
  styleUrls: ['./edit-mini-profile.component.scss']
})
export class EditMiniProfileComponent implements OnInit {

  user: any;
  userID: any;
  miniBgURL: any;

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
          ownedMiniBackground {
            id,
            itemImg
          },
          miniBackground {
            id,
            itemImg
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      this.miniBgURL = res.data.getUser.miniBackground.itemImg;
      console.log('asdf');
      console.log(this.user);
    });
  }

  saveMiniBg(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation updateMiniBackground($id: ID!, $miniBgID: ID!) {
        updateMiniBackground(id: $id, miniBgID: $miniBgID) {
          id
        }
      }`, variables: {id: this.user.id, miniBgID: id}
    }).subscribe(resp => {
      alert('Update Mini Background Success');
    });
  }

  changeMiniBg(miniBgName: string): void {
    this.miniBgURL = miniBgName;
  }

}

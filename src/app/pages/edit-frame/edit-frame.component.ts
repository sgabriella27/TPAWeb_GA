import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-frame',
  templateUrl: './edit-frame.component.html',
  styleUrls: ['./edit-frame.component.scss']
})
export class EditFrameComponent implements OnInit {
  user: any;
  userID: any;
  frameURL: any;

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
          ownedFrame {
            id,
            itemImg
          },
          frame {
            id,
            itemImg
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      this.frameURL = res.data.getUser.frame.itemImg;
    });
  }


  saveFrame(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation updateFrame($id: ID!, $frameID: ID!) {
        updateFrame(id: $id, frameID: $frameID) {
          id
        }
      }`, variables: {id: this.user.id, frameID: id}
    }).subscribe(resp => {
      alert('Update Frame Success');
    });
  }

  changeFrame(frameName: string): void {
    this.frameURL = frameName;
  }
}

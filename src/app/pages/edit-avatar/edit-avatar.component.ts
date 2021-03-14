import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss']
})
export class EditAvatarComponent implements OnInit {

  user: any;
  userID: any;
  avatarForm = this.fb.group({
    uploadAvatar: ['', Validators.required]
  });

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
          profilePic
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
    });
  }

  upload(): void {
    this.apollo.mutate({
      mutation: gql`mutation updateAvatar($id: ID!, $profilePic: String!) {
        updateAvatar(id: $id, profilePic: $profilePic) {
          id,
          profilePic
        }
      }`, variables: {id: this.user.id, profilePic: this.avatarForm.value.uploadAvatar.name}
    }).subscribe(resp => {
      alert('Update Success!');
    });
  }

  onChange($event: Event): void {
    const input = $event.target as HTMLInputElement;
    const file = input.files?.item(0);
    console.log(file?.name);

    this.avatarForm.controls.uploadAvatar.setValue(file);
  }
}

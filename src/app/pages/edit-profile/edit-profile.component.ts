import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  user: any;
  userID: any;
  updateForm = this.fb.group({
    displayName: [''],
    realName: [''],
    customURL: [''],
    country: [''],
    summary: ['']
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
          displayName,
          realName,
          customURL,
          country,
          summary
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
      this.updateForm.controls.displayName.setValue(this.user.displayName);
      this.updateForm.controls.realName.setValue(this.user.realName);
      this.updateForm.controls.country.setValue(this.user.customURL);
      this.updateForm.controls.customURL.setValue(this.user.customURL);
      this.updateForm.controls.summary.setValue(this.user.summary);
    });
  }

  onSave(): void {
    if (this.updateForm.invalid) {
      return;
    }
    this.apollo.mutate({
      mutation: gql`mutation updateUser($id: ID!,
        $displayName: String!, $realName: String!, $country: String!, $customURL: String!, $summary: String!) {
        updateUser(input: {
          id: $id,
          displayName: $displayName,
          realName: $realName,
          country: $country,
          customURL: $customURL,
          summary: $summary
        }) {
          id,
          displayName,
          realName,
          customURL,
          country,
          summary
        }
      }`, variables: {id: this.user.id, ...this.updateForm.value}
    }).subscribe(resp => {
      alert('Update Success');
      window.location.reload();
    });
  }
}

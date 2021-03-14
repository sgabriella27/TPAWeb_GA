import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {

  theme: any;
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
          theme
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
    });
  }

  change(s: string): void {
    this.theme = s;
    console.log(this.theme);
  }

  onSave(): void {
    this.apollo.mutate({
      mutation: gql`mutation updateTheme($id: ID!, $theme: String!) {
        updateTheme(id: $id, theme: $theme) {
          id,
          theme
        }
      }`, variables: {id: this.user.id, theme: this.theme}
    }).subscribe(resp => {
      alert('Update Theme Success');
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any = null;
  userID: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.user = '';
    if (localStorage.getItem('jwt')) {
      this.userID = localStorage.getItem('jwt');
      this.firstDisplay(this.userID);
      console.log(this.userID);
    } else {
      console.log('no user!');
      console.log(this.user.accountName);
    }
  }

  firstDisplay(userID: string): void {
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          accountName
        }
      }`, variables: {userID: localStorage.getItem('jwt')}
    }).subscribe(res => {
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
    });
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/').then(function() {
      window.location.reload();
    });
  }
}

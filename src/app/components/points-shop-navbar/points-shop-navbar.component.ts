import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-points-shop-navbar',
  templateUrl: './points-shop-navbar.component.html',
  styleUrls: ['./points-shop-navbar.component.scss']
})
export class PointsShopNavbarComponent implements OnInit {
  user: any;
  userID: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) { }

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
    console.log('asd');
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          accountName,
          profilePic,
          points
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
    });
  }

}

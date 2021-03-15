import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  user: any;
  userID: any;
  wishlist: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) {
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
          accountName,
          profilePic,
          points
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
      console.log(this.user.id);
      this.getWishlist(this.user.id);
    });
  }

  getWishlist(id: any): void {
    console.log(id);
    this.apollo.query({
      query: gql`query getWishlistByUser($userID: ID!) {
        getWishlistByUser(userID: $userID) {
          id
          game {
            id
            gameTitle,
            gameBanner
          }
          user {
            id,
            displayName
          }
        }
      }`, variables: {userID: id}
    }).subscribe(resp => {
      // @ts-ignore
      this.wishlist = resp.data.getWishlistByUser;
      console.log(this.wishlist);
    });
  }

  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }

  onDelete(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation deleteWishlist($userID: ID!, $gameID: ID!) {
        deleteWishlist(userID: $userID, gameID: $gameID) {
          id
        }
      }`, variables: {userID: this.user.id, gameID: id}
    }).subscribe(resp => {
      alert('Remove Wishlist Success');
    });
  }
}

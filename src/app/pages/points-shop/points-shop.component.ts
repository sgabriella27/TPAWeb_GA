import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-points-shop',
  templateUrl: './points-shop.component.html',
  styleUrls: ['./points-shop.component.scss']
})
export class PointsShopComponent implements OnInit {
  item: any[] = [];
  userID: any;
  user: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getPointsItem: any }>({
      query: gql`query getPointsItem {
        getPointsItem {
          id,
          itemImg
          itemPoints
          itemType
        }
      }`
    }).subscribe(res => {
      this.item = res.data?.getPointsItem;
      console.log(this.item);
    });
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
    });
  }

  buyItem(itemID: any): void {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.apollo.mutate({
      mutation: gql`mutation insertPointTransaction($userID: ID!, $itemID: ID!) {
        insertPointTransaction(userID: $userID, itemID: $itemID)
      }`, variables: {userID: this.user.id, itemID}
    }).subscribe(res => {
      alert('Yeay Success!');
      window.location.reload();
    });
  }
}

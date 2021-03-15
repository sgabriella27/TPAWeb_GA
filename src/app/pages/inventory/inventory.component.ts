import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  user: any;
  page = 1;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer) {
  }

  url(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void {
    this.firstDisplay();
  }

  firstDisplay(): void {
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!, $page: Int!){
        getUser(jwtToken: $jwtToken) {
          id,
          accountName,
          profilePic,
          points
          items(page: $page) {
            gameItem {
              id
              game {
                gameTitle
              }
              gameItemName
              gameItemImg
            }
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt'), page: this.page}
    }).subscribe(res => {
      this.user = res.data?.getUser;
    });
  }

  prevPage(): void {
    this.page--;
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!, $page: Int!){
        getUser(jwtToken: $jwtToken) {
          id,
          accountName,
          profilePic,
          points
          items(page: $page) {
            gameItem {
              id
              game {
                gameTitle
              }
              gameItemName
              gameItemImg
            }
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt'), page: this.page}
    }).subscribe(res => {
      this.user = res.data?.getUser;
    });
  }

  nextPage(): void {
    this.page++;
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!, $page: Int!){
        getUser(jwtToken: $jwtToken) {
          id,
          accountName,
          profilePic,
          points
          items(page: $page) {
            gameItem {
              id
              game {
                gameTitle
              }
              gameItemName
              gameItemImg
            }
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt'), page: this.page}
    }).subscribe(res => {
      this.user = res.data?.getUser;
    });
  }

  sellItem(id: any): void {
    const price: any = prompt('input price')
    this.apollo.mutate({
      mutation: gql`mutation insertMarketItem($userID: ID!, $gameItemID: ID!, $type: String!, $prices: Int!) {
        insertMarketItem(input: {userID: $userID, gameItemID: $gameItemID, type: $type, price: $prices}) {
          gameItemID
        }
      }`, variables: {userID: this.user.id, gameItemID: id, type: 'offer', prices: price}
    }).subscribe(resp => {
      alert('Success');
    });
  }

  addWallet(id: any, price: any): void {
    this.apollo
    .mutate({
      mutation: gql`
        mutation asdf($user_id: ID!, $price: Int!) {
          addWalletAmount(userID: $user_id, amount: $price) {
            wallet
          }
        }
      `,
      variables: {user_id: id, price},
    })
    .subscribe();
  }
}

import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss']
})
export class MarketDetailComponent implements OnInit {

  id: any;
  gameItem: any;
  marketGameItem: any;
  marketGameListing: any;
  user: any;
  userID: any;
  chartData: ChartDataSets[] = [{data: [], label: 'price'}];
  labelData: Label[] = [];
  recentActivity: any;

  // tslint:disable-next-line:max-line-length
  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.apollo.query<{ getGameItemByID: any }>({
        query: gql`query getGameItemByID($id: ID!) {
          getGameItemByID(id: $id) {
            id,
            gameItemDesc,
            gameItemImg,
            gameItemName,
            game {
              gameTitle
            }
            transaction {
              gameItemID,
              price,
              createdAt
            }
          }
        }`, variables: {id: param.get('id')}
      }).subscribe(resp => {
        this.gameItem = resp.data.getGameItemByID;
        // @ts-ignore
        this.gameItem.transaction.forEach((data) => {
          // @ts-ignore
          this.chartData[0].data.push(data.price);
          this.labelData.push(data.createdAt);
        });
        console.log(this.gameItem);
      });
    });
    this.getMarketGameItem();
    this.firstDisplay(this.userID);
    this.apollo
    .subscribe({
      query: gql`
        subscription asdf($item_id: Int!) {
          messageAdded(itemID: $item_id)
        }
      `,
      variables: { item_id: this.route.snapshot.paramMap.get('id') },
    })
    .subscribe(({ data }) => {
      this.recentActivity = (data as any).messageAdded;
    });
  }

  firstDisplay(userID: string): void {
    console.log('asd');
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      this.getMarketGameListing();
    });
  }

  getMarketGameItem(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.apollo.watchQuery<{ getMarketGameItemByID: any }>({
        query: gql`query getMarketGameItemByID($id: ID!) {
          getMarketGameItemByID(id: $id) {
            type,
            price,
            user {
              id
            },
            gameItem {
              id
            }
          }
        }`, variables: {id: param.get('id')}, pollInterval: 5000
      }).valueChanges.subscribe(resp => {
        this.marketGameItem = resp.data.getMarketGameItemByID;
        console.log(this.marketGameItem);
      });
    });
  }

  insertSellListing(): void {
    const price: any = prompt('input price');
    let found = false;
    let foundItem: any;

    this.marketGameItem.forEach((m: {
      price: number;
      type: string;
      user_id: any;
    }) => {
      if (m.price === Number(price) && m.type === 'bid') {
        found = true;
        foundItem = m;
      }
    });
    console.log(price);
    if (found) {
      this.apollo.mutate({
        mutation: gql`mutation insertSellItem($userID: ID!, $gameItemID: ID!, $sellerID: ID!) {
          insertSellItem(userID: $userID, gameItemID: $gameItemID, sellerID: $sellerID)
        }`, variables: {userID: foundItem.user.id, gameItemID: foundItem.gameItem.id, sellerID: this.user.id}
      }).subscribe(resp => {
        this.addWallet(this.user.id, price);
        this.reduceWallet(foundItem.user.id, price);
        alert('Success');
      });
    } else {
      this.apollo.mutate({
        mutation: gql`mutation insertMarketItem($userID: ID!, $gameItemID: ID!, $type: String!, $prices: Int!) {
          insertMarketItem(input: {userID: $userID, gameItemID: $gameItemID, type: $type, price: $prices}) {
            gameItemID
          }
        }`, variables: {userID: this.user.id, gameItemID: this.id, type: 'offer', prices: price}
      }).subscribe(resp => {
        alert('Success');
      });
    }
  }

  insertBuyListing(): void {
    const price: any = prompt('input price');
    let found = false;
    let foundItem: any;
    console.log(price);

    this.marketGameItem.forEach((m: {
      price: number;
      type: string;
      user_id: any;
    }) => {
      console.log(this.marketGameItem);
      if (m.price === Number(price) && m.type === 'offer') {
        console.log('fghj');
        found = true;
        foundItem = m;
      }
    });

    if (found) {
      console.log(foundItem);
      this.apollo.mutate({
        mutation: gql`mutation insertBuyItem($userID: ID!, $gameItemID: ID!, $buyerID: ID!) {
          insertBuyItem(userID: $userID, gameItemID: $gameItemID, buyerID: $buyerID)
        }`, variables: {userID: foundItem.user.id, gameItemID: foundItem.gameItem.id, buyerID: this.user.id}
      }).subscribe(resp => {
        this.addWallet(foundItem.user.id, price);
        this.reduceWallet(this.user.id, price);
        alert('Success');
      });
    } else {
      this.apollo.mutate({
        mutation: gql`mutation insertMarketItem($userID: ID!, $gameItemID: ID!, $type: String!, $prices: Int!) {
          insertMarketItem(input: {userID: $userID, gameItemID: $gameItemID, type: $type, price: $prices}) {
            gameItemID
          }
        }`, variables: {userID: this.user.id, gameItemID: this.id, type: 'bid', prices: price}
      }).subscribe(resp => {
        alert('Success');
      });
    }
  }

  getMarketGameListing(): void {
    this.apollo.query({
      query: gql`query getMarketListing {
        getMarketListing{
          gameItem{
            gameItemName
            gameItemDesc
          }
          gameItemID
          price
          type
        }
      }`
    }).subscribe(({data}) => {
      this.marketGameListing = (data as any).getMarketListing;
      console.log((data as any).getMarketListing);
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

  reduceWallet(id: any, price: any): void {
    this.apollo
    .mutate({
      mutation: gql`
        mutation asdf($user_id: ID!, $price: Int!) {
          reduceWalletAmount(userID: $user_id, amount: $price) {
            wallet
          }
        }
      `,
      variables: {user_id: id, price},
    })
    .subscribe();
  }
}

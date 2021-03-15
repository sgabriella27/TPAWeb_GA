import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  user: any;
  sufficientBalance = false;
  useWallet = false;

  constructor(private apollo: Apollo, private router: Router) {
  }

  get subtotal(): any {
    let total = 0;
    this.user.cart.forEach((cart: any) => {
      total += cart.game.gamePrice;
    });
    return total;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('jwt')) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
          displayName
          wallet
          friends {
            friendID,
            friend {
              displayName
            }
          }
          cart {
            game {
              id
              gameBanner
              gameTitle
              gamePrice
            }
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      this.user = res.data?.getUser;
      this.sufficientBalance = this.user.wallet >= this.subtotal;
      if (this.sufficientBalance) {
        alert('You have enough balance');
        this.useWallet = true;
      } else {
        this.useWallet = !confirm('Insufficient balance. Use credit card?');
      }
    });
  }

  checkout(useWallet: boolean): void {
    this.apollo.mutate({
      mutation: gql`
        mutation checkout($userID: ID!, $useWallet: Boolean!) {
          checkoutCart(userID: $userID, useWallet: $useWallet)
        }
      `,
      variables: {userID: this.user.id, useWallet: this.useWallet}
    }).subscribe(() => window.location.reload());
  }

  gift(value: string): void {
    this.apollo.mutate({
      mutation: gql`
        mutation gift($userID: ID!, $friendID: ID!) {
          giftTo(userID: $userID, friendID: $friendID)
        }
      `,
      variables: {
        userID: this.user.id,
        friendID: value
      }
    }).subscribe(() => window.location.reload());
  }
}

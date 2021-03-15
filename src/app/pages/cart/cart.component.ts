import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  user: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer) {
  }

  get subtotal(): any {
    let total = 0;
    this.user.cart.forEach((cart: any) => {
      total += cart.game.gamePrice;
    });
    return total;
  }

  ngOnInit(): void {
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
          displayName
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
    });
  }

  // tslint:disable-next-line:typedef
  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }

  remove(id: any): void {
    if (!confirm('Are you sure to delete this game?')) {
      return;
    }

    this.apollo.mutate({
      mutation: gql`
        mutation removeCart($gameID: ID!, $userID: ID!) {
          removeCart(gameID: $gameID, userID: $userID)
        }
      `, variables: {
        gameID: id,
        userID: this.user.id
      }
    }).subscribe(() => window.location.reload());
  }
}

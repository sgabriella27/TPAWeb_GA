import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  games: any;
  page = 1;
  userID: any;
  user: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.apollo.query({
        query: gql`query gameByID($id: ID!, $page : Int!) {
          gameByID(id: $id) {
            id
            gameBanner,
            gameTitle,
            gameTag,
            gameCountry {
              country {
                id
                longitude
                latitude
              }
              count
            }
            gameSlideshow {
              id
              contentType
            },
            gamePublisher,
            gameDeveloper,
            gameDescription,
            gameAdult,
            promo{
              discountPromo
            },
            review(page: $page) {
              description,
              user {
                displayName,
              }
              recommended
            }
          }
        }`, variables: {id: param.get('id'), page: this.page}
      }).subscribe(resp => {
        // @ts-ignore
        this.games = resp.data.gameByID;
        console.log(this.games);
      });
    });
    this.firstDisplay(this.userID);
  }

  // tslint:disable-next-line:typedef
  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }

  prevPage(): void {
    this.page--;
    this.route.paramMap.subscribe(param => {
      this.apollo.query({
        query: gql`query gameByID($id: ID!, $page: Int!) {
          gameByID(id: $id) {
            id
            gameBanner,
            gameTitle,
            gameTag,
            gameSlideshow {
              id
              contentType
            },
            gamePublisher,
            gameDeveloper,
            gameDescription,
            gameAdult,
            review(page: $page) {
              description,
              user {
                displayName,
              }
              recommended
            }
          }
        }`, variables: {id: param.get('id'), page: this.page}
      }).subscribe(resp => {
        // @ts-ignore
        this.games = resp.data.gameByID;
      });
    });
  }

  nextPage(): void {
    this.page++;
    this.route.paramMap.subscribe(param => {
      this.apollo.query({
        query: gql`query gameByID($id: ID!, $page: Int!) {
          gameByID(id: $id) {
            id
            gameBanner,
            gameTitle,
            gameTag,
            gameSlideshow {
              id
              contentType
            },
            gamePublisher,
            gameDeveloper,
            gameDescription,
            gameAdult,
            review(page: $page) {
              description,
              user {
                displayName,
              }
              recommended
            }
          }
        }`, variables: {id: param.get('id'), page: this.page}
      }).subscribe(resp => {
        // @ts-ignore
        this.games = resp.data.gameByID;
      });
    });
  }

  firstDisplay(userID: string): void {
    console.log('asd');
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
          profilePic
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
    });
  }

  addReview(review: string, recommend: boolean): void {
    this.apollo.mutate({
      mutation: gql`mutation insertNewReview($userID: ID!, $gameID: ID!, $desc: String!, $recommended: Boolean!) {
        insertNewReview(userID: $userID, gameID: $gameID, desc: $desc, recommend: $recommended) {
          id
        }
      }`,
      variables: {
        userID: this.user.id,
        gameID: this.games.id,
        desc: review,
        recommended: recommend
      }
    }).subscribe(resp => {
      alert('Success');
    });
  }

  addWishlist(): void {
    this.apollo.mutate({
      mutation: gql`mutation insertWishlist($userID: ID!, $gameID: ID!) {
        insertWishlist(userID: $userID, gameID: $gameID) {
          id
        }
      }`, variables: {userID: this.user.id, gameID: this.games.id}
    }).subscribe(resp => {
      alert('Added Wishlist');
    });
  }

  addCart(): void {
    this.apollo.mutate({
      mutation: gql`mutation insertCart($userID: ID!, $gameID: ID!) {
        insertCart(userID: $userID, gameID: $gameID) {
          id
        }
      }`, variables: {userID: this.user.id, gameID: this.games.id}
    }).subscribe(resp => {
      alert('Added Cart');
    });
  }
}

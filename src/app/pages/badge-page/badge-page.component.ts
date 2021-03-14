import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-badge-page',
  templateUrl: './badge-page.component.html',
  styleUrls: ['./badge-page.component.scss']
})
export class BadgePageComponent implements OnInit {

  user: any;
  userID: any;
  cards: any;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCard();
  }

  firstDisplay(userID: string): void {
    console.log('asd');
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
          profilePic,
          badge {
            id,
            itemImg,
          }
          ownedBadge {
            id
            itemImg
          }
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log('asdf');
      console.log(this.user);
    });
  }

  getAllCard(): void {
    this.apollo.query({
      query: gql`query getCard {
        getCard {
          id,
          cardImg,
          status
          badge {
            id
          }
        }
      }`
    }).subscribe(resp => {
      // @ts-ignore
      this.cards = resp.data.getCard;
      this.firstDisplay(this.userID);
    });
  }

  getCardByID(id: any): any {
    console.log(id);
    console.log(this.cards);
    return this.cards.filter((card: any) => card.badge.id === id);
  }

}

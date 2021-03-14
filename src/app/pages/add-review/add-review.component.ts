import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  user: any;
  userID: any;
  games: any;
  reviewForm = this.fb.group({
    pickGame: [1, Validators.required],
    description: ['', Validators.required],
    recommend: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.firstDisplay(this.userID);
    this.getAllGames();
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

  getAllGames(): void {
    this.apollo.query<{ getGame: any }>({
      query: gql`query getGame {
        getGame {
          id,
          gameTitle
        }
      }`
    }).subscribe(resp => {
      this.games = resp.data?.getGame;
    });
  }

  addReview(): void {
    this.apollo.mutate({
      mutation: gql`mutation insertNewReview($userID: ID!, $gameID: ID!, $desc: String!, $recommended: Boolean!) {
        insertNewReview(userID: $userID, gameID: $gameID, desc: $desc, recommend: $recommended) {
          id
        }
      }`,
      variables: {
        userID: this.user.id,
        gameID: this.reviewForm.value.pickGame,
        desc: this.reviewForm.value.description,
        recommended: this.reviewForm.value.recommend
      }
    }).subscribe(resp => {
      alert('Success');
    });
  }
}

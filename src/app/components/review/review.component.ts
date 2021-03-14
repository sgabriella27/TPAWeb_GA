import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  review: any[] = [];

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getCommunityReview: any }>({
      query: gql`query getReview {
        getCommunityReview {
          id,
          description,
          recommended,
          helpful,
          notHelpful
          game {
            id,
            gameTitle,
            gameBanner
          }
        }
      }`
    }).subscribe(res => {
      this.review = res.data?.getCommunityReview;
    });
  }

  // tslint:disable-next-line:typedef
  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }


  onHelpful(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation helpfulReview($id: ID!) {
        helpfulReview(id: $id) {
          helpful
        }
      }`, variables: {id}
    }).subscribe(resp => {
      window.location.reload();
    });
  }

  onNothelptul(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation notHelpfulReview($id: ID!) {
        notHelpfulReview(id: $id) {
          notHelpful
        }
      }`, variables: {id}
    }).subscribe(resp => {
      window.location.reload();
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {

  page = 1;
  id: any;
  review: any;
  commentForm: any = this.fb.group({comment: ['']});
  user: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.apollo.query<{ getReviewByID: any }>({
        query: gql`query getReviewByID($id: ID!, $page: Int!) {
          getReviewByID(id: $id) {
            id,
            helpful,
            notHelpful
            comments(page: $page) {
              comment
              user {
                displayName,
                profilePic
              }
            }
            game {
              id,
              gameBanner,
              gameTitle
            },
            recommended,
            description,
            user {
              id,
              displayName,
              profilePic
            },
          }
        }`, variables: {id: param.get('id'), page: this.page}
      }).subscribe(resp => {
        this.review = resp.data.getReviewByID;
      });
    });

    this.apollo.query<{ getUser: any }>({
      query: gql`query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
          displayName,
          profilePic
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
      console.log(this.user.accountName);
    });
  }

  // tslint:disable-next-line:typedef
  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }

  prevPage(): void {
    this.page--;
    this.apollo.query<{ getReviewByID: any }>({
      query: gql`query getReviewByID($id: ID!, $page: Int!) {
        getReviewByID(id: $id) {
          description,
          recommended,
          helpful,
          notHelpful
          comments(page: $page) {
            comment
            user {
              displayName,
              profilePic
            }
          }
          user {
            id,
            displayName,
            profilePic
          }
          game {
            id,
            gameBanner,
            gameTitle
          },
        }
      }`, variables: {id: this.id, page: this.page}
    }).subscribe(resp => {
      this.review = resp.data.getReviewByID;
    });
  }

  nextPage(): void {
    this.page++;
    this.apollo.query<{ getReviewByID: any }>({
      query: gql`query getReviewByID($id: ID!, $page: Int!) {
        getReviewByID(id: $id) {
          description,
          recommended,
          helpful,
          notHelpful,
          comments(page: $page) {
            comment
            user {
              displayName,
              profilePic
            }
          }
          user {
            id,
            displayName,
            profilePic
          }
          game {
            id,
            gameBanner,
            gameTitle
          },
        }
      }`, variables: {id: this.id, page: this.page}
    }).subscribe(resp => {
      this.review = resp.data.getReviewByID;
    });
  }

  addComment(): void {
    this.apollo.mutate({
      mutation: gql`mutation insertReviewComment($id: ID!, $comment: String!, $userID:ID!) {
        insertReviewComment(input: {id:$id, comment:$comment, userID:$userID}) {
          comment
          user {
            displayName,
            profilePic
          }
        }
      }`, variables: {id: this.id, comment: this.commentForm.value.comment, userID: this.user.id}
    }).subscribe(resp => {
      window.location.reload();
    });
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

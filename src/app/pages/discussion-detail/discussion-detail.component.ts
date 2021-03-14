import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail.component.html',
  styleUrls: ['./discussion-detail.component.scss']
})
export class DiscussionDetailComponent implements OnInit {
  id: any;
  page = 1;
  discussion: any;
  user: any;
  commentForm: any = this.fb.group({comment: ['']});

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.apollo.query<{ getDiscussionByID: any }>({
        query: gql`query getDiscussionByID($id: ID!, $page: Int!) {
          getDiscussionByID(id: $id) {
            id,
            title,
            description,
            comments(page: $page) {
              comment,
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
            user {
              displayName,
              profilePic
            }
          }
        }`, variables: {id: param.get('id'), page: this.page}
      }).subscribe(resp => {
        this.discussion = resp.data.getDiscussionByID;
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
    this.apollo.query<{ getDiscussionByID: any }>({
      query: gql`query getDiscussionByID($id: ID!, $page: Int!) {
        getDiscussionByID(id: $id) {
          id,
          title,
          description,
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
          user {
            id,
            displayName,
            profilePic
          }
        }
      }`, variables: {id: this.id, page: this.page}
    }).subscribe(resp => {
      this.discussion = resp.data.getDiscussionByID;
    });
  }

  nextPage(): void {
    this.page++;
    this.apollo.query<{ getDiscussionByID: any }>({
      query: gql`query getDiscussionByID($id: ID!, $page: Int!) {
        getDiscussionByID(id: $id) {
          id,
          title,
          description
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
          user {
            id,
            displayName,
            profilePic
          }
        }
      }`, variables: {id: this.id, page: this.page}
    }).subscribe(resp => {
      this.discussion = resp.data.getDiscussionByID;
    });
  }

  addComment(): void {
    this.apollo.mutate({
      mutation: gql`mutation insertDiscussionComment($id: ID!, $comment: String!, $userID:ID!) {
        insertDiscussionComment(input: {id:$id, comment:$comment, userID:$userID}) {
          comment
          user {
            id,
            displayName,
            profilePic
          }
        }
      }`, variables: {id: this.id, comment: this.commentForm.value.comment, userID: this.user.id}
    }).subscribe(resp => {
      window.location.reload();
    });
  }
}

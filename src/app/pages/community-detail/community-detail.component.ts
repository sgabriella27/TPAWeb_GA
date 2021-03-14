import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-community-detail',
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.scss']
})
export class CommunityDetailComponent implements OnInit {

  asset: any;
  page = 1;
  id: any;
  commentForm: any = this.fb.group({comment: ['']});
  private user: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.apollo.query<{ getCommunityAssetByID: any }>({
        query: gql`query getCommunityID($id: ID!, $page: Int!) {
          getCommunityAssetByID(id: $id) {
            asset,
            like,
            dislike
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
          }
        }`, variables: {id: param.get('id'), page: this.page}
      }).subscribe(resp => {
        this.asset = resp.data.getCommunityAssetByID;
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

  prevPage(): void {
    this.page--;
    this.apollo.query<{ getCommunityAssetByID: any }>({
      query: gql`query getCommunityID($id: ID!, $page: Int!) {
        getCommunityAssetByID(id: $id) {
          asset,
          like,
          dislike
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
        }
      }`, variables: {id: this.id, page: this.page}
    }).subscribe(resp => {
      this.asset = resp.data.getCommunityAssetByID;
    });
  }

  nextPage(): void {
    this.page++;
    this.apollo.query<{ getCommunityAssetByID: any }>({
      query: gql`query getCommunityID($id: ID!, $page: Int!) {
        getCommunityAssetByID(id: $id) {
          asset,
          like,
          dislike
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
        }
      }`, variables: {id: this.id, page: this.page}
    }).subscribe(resp => {
      this.asset = resp.data.getCommunityAssetByID;
    });
  }

  addComment(): void {
    this.apollo.mutate({
      mutation: gql`mutation insertCommunityComment($id: ID!, $comment: String!, $userID:ID!) {
        insertCommunityComment(input: {id:$id, comment:$comment, userID:$userID}) {
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
}

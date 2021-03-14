import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  user: any;
  page = 1;
  reportReq: any;
  unsuspendList: any;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getAllUser: any }>({
      query: gql`query getAllUser($page: Int!) {
        getAllUser(page: $page) {
          id,
          accountName,
          profilePic
        }
      }`, variables: {page: this.page}
    }).subscribe(resp => {
      this.user = resp.data.getAllUser;
    });
    this.getReportList();
    this.getUnsuspendList();
  }

  prevPage(): void {
    this.page--;
    this.apollo.query<{ getAllUser: any }>({
      query: gql`query getAllUser($page: Int!) {
        getAllUser(page: $page) {
          id,
          accountName,
          profilePic
        }
      }`, variables: {page: this.page}
    }).subscribe(resp => {
      this.user = resp.data.getAllUser;
    });
  }

  nextPage(): void {
    this.page++;
    this.apollo.query<{ getAllUser: any }>({
      query: gql`query getAllUser($page: Int!) {
        getAllUser(page: $page) {
          id,
          accountName,
          profilePic
        }
      }`, variables: {page: this.page}
    }).subscribe(resp => {
      this.user = resp.data.getAllUser;
    });
  }

  getReportList(): void {
    this.apollo.query({
      query: gql`query getReportRequest {
        getReportRequest {
          id,
          reason,
          reporter {
            id,
            displayName
          },
          suspected {
            id,
            displayName
          }
        }
      }`
    }).subscribe(resp => {
      // @ts-ignore
      this.reportReq = resp.data.getReportRequest;
      console.log(this.reportReq);
    });
  }

  getUnsuspendList(): void {
    this.apollo.query({
      query: gql`query getUnsuspendRequest {
        getUnsuspensionRequest {
          reason,
          user {
            id,
            accountName
          }
        }
      }`
    }).subscribe(resp => {
      // @ts-ignore
      this.unsuspendList = resp.data.getUnsuspensionRequest;
      console.log(this.unsuspendList);
    });
  }

  declineUnsuspend(request: any): void {
    this.apollo
    .mutate({
      mutation: gql`
        mutation asdf($user_id: ID!, $reason: String!, $suspended: Boolean!) {
          createSuspensionList(
            input: {
              user_id: $user_id
              reason: $reason
              suspended: $suspended
            }
          )
        }
      `,
      variables: { user_id: request.user.id, reason: request.reason, suspended: true },
    })
    .subscribe(({ data }) => {
      alert('Still suspended');
    });
  }

  acceptUnsuspend(request: any): void {
    this.apollo
    .mutate({
      mutation: gql`
        mutation asdf($user_id: ID!, $reason: String!, $suspended: Boolean!) {
          createSuspensionList(
            input: {
              user_id: $user_id
              reason: $reason
              suspended: $suspended
            }
          )
        }
      `,
      variables: { user_id: request.user.id, reason: request.reason, suspended: false },
    })
    .subscribe(({ data }) => {
      alert('Unsuspend');
    });
  }
}

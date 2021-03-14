import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-top-up-wallet',
  templateUrl: './top-up-wallet.component.html',
  styleUrls: ['./top-up-wallet.component.scss']
})
export class TopUpWalletComponent implements OnInit {

  user: any;
  userID: any;
  redeemCode: any;
  codeForm = this.fb.group({
    codeRedeem: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
  }

  ngOnInit(): void {
    this.firstDisplay(this.userID);
  }

  firstDisplay(userID: string): void {
    console.log('asd');
    this.apollo.query<{ getUser: any }>({
      query: gql` query getUser($jwtToken: String!){
        getUser(jwtToken: $jwtToken) {
          id,
          wallet
        }
      }`, variables: {jwtToken: localStorage.getItem('jwt')}
    }).subscribe(res => {
      console.log(res.data);
      this.user = res.data?.getUser;
    });
  }

  redeem(): void {
    this.apollo.mutate({
      mutation: gql`mutation RedeemWalletCode($code: String!, $id: ID!){
        redeemWalletCode(code: $code, userID: $id) {
          id
        }
      }`, variables: {code: this.codeForm.value.codeRedeem, id: this.user.id}
    }).pipe(catchError(err => {
      alert('Redeem Code Invalid!');
      window.location.reload();
      return err;
    })).subscribe(resp => {
      alert('Redeem Success!');
      window.location.reload();
    });
  }
}

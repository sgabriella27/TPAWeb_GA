import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  loginForm = this.fb.group({
    accountName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSignIn(): void {
    const {accountName, password} = this.loginForm.value;
    console.log(accountName, password);
    if (this.loginForm.invalid) {
      return;
    }

    if (accountName !== 'admin' || password !== 'admin') {
      return;
    }

    this.apollo.query<{ login: string }>({
      query: gql`query login($accountName: String!, $password:String!) {
        login(accountName: $accountName, password: $password)
      }`, variables: this.loginForm.value
    }).subscribe(resp => {
      const jwtToken = resp.data?.login;
      if (jwtToken) {
        localStorage.setItem('jwt', jwtToken);
        this.router.navigate(['/admin']).then();
      }
    });
  }

}

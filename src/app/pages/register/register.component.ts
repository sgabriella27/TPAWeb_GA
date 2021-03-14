import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
  }

  registerForm = this.fb.group({
    accountName: ['', Validators.required],
    password: ['', Validators.required],
  });

  success: any;
  otpCode: any;

  ngOnInit(): void {
  }

  onRegister(): void {
    if (this.registerForm.invalid && !this.success) {
      return;
    }

    this.sendOTP();
    let temp = prompt('Insert OTP Code from Email : ');
    if (parseInt(temp ?? '') !== this.otpCode) {
      alert('failed');
      return;
    } else {
      alert('success');
    }

    this.apollo.mutate<{ register: User }>({
      mutation: gql`mutation register($accountName: String!, $password:String!) {
        register(input: {
          accountName: $accountName,
          password: $password
        }) {
          id
        }
      }`, variables: this.registerForm.value
    }).subscribe(resp => {
      if (resp.data?.register) {
        alert('Register Success! :D');
        this.router.navigate(['/login']).then();
      }
    });

  }

  sendOTP(): void {
    const otp = this.randomIntFromInterval(10000, 99999);
    this.otpCode = otp;
    this.apollo
    .mutate({
      mutation: gql`
        mutation asff($otp: Int!) {
          sendOTP(input: $otp)
        }
      `,
      variables: { otp },
    })
    .subscribe();
  }

  randomIntFromInterval(min: any, max: any): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  resolved($event: string): void {
    this.success = $event;
  }

}

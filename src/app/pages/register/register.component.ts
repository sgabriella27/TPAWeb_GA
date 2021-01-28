import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {User} from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    accountName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private apollo: Apollo) {
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      return;
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
      }
    });

  }

}

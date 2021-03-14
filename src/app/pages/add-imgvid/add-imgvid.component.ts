import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-imgvid',
  templateUrl: './add-imgvid.component.html',
  styleUrls: ['./add-imgvid.component.scss']
})
export class AddImgvidComponent implements OnInit {

  uploadForm = this.fb.group({
    uploadImgVid: ['', Validators.required]
  });
  user: any;
  userID: any;

  constructor(private fb: FormBuilder, private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.firstDisplay(this.userID);
  }

  uploadFile(): void {
    this.apollo.mutate({
      mutation: gql`mutation insertCommunityVidImg($asset: String!, $userID: ID!) {
        insertCommunityVidImg(imgVid: $asset, userID: $userID) {
          id
        }
      }`, variables: {asset: this.uploadForm.value.uploadImgVid.name, userID: this.user.id}
    }).subscribe(resp => {
      alert('Success!');
    });
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

  onChange($event: Event): void {
    const input = $event.target as HTMLInputElement;
    const file = input.files?.item(0);
    console.log(file?.name);

    this.uploadForm.controls.uploadImgVid.setValue(file);
  }
}

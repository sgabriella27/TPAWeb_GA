import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-video',
  templateUrl: './image-video.component.html',
  styleUrls: ['./image-video.component.scss']
})
export class ImageVideoComponent implements OnInit {
  asset: any[] = [];

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getCommunityAsset: any }>({
      query: gql`query getCommunityAsset {
        getCommunityAsset {
          id,
          asset,
          like,
          dislike
        }
      }`
    }).subscribe(res => {
      this.asset = res.data?.getCommunityAsset;
    });
  }

  onLike(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation likeCommunity($id: ID!) {
        likeCommunityAsset(id:$id) {
          like
        }
      }`, variables: {id}
    }).subscribe(resp => {
      window.location.reload();
    });
  }

  onDislike(id: any): void {
    this.apollo.mutate({
      mutation: gql`mutation dislikeCommunity($id: ID!) {
        dislikeCommunityAsset(id:$id) {
          dislike
        }
      }`, variables: {id}
    }).subscribe(resp => {
      window.location.reload();
    });
  }
}

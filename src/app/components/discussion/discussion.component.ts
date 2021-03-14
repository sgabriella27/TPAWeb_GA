import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  discussion: any[] = [];
  discussionGroup: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getDiscussion: any }>({
      query: gql`query getDiscussion {
        getDiscussion {
          id,
          user {
            id,
            accountName
          },
          game {
            id,
            gameBanner,
            gameTitle
          },
          title,
          description
        }
      }`
    }).subscribe(res => {
      this.discussion = res.data?.getDiscussion;
      //

      const arr: any[] = [];
      this.discussion.forEach(disc => {
        arr.push({
          discId: disc.id,
          gameId: disc.game.id,
          gameTitle: disc.game.gameTitle,
          title: disc.title,
          gameBanner: disc.game.gameBanner,
          description: disc.description
        });
      });

      console.log(this.discussion);
      const groupBy = (array: any, key: any) => {
        return array.reduce((result: any, currentValue: any) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );

          return result;
        }, {});
      };
      this.discussionGroup = Object.values(groupBy(arr, 'gameId'));
      console.log(this.discussionGroup);
    });
  }

  // tslint:disable-next-line:typedef
  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }
}

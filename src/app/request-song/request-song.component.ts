import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, timer, switchMap, of } from 'rxjs';
import { OpenAiService } from '../open-ai.service';

@Component({
  selector: 'app-request-song',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './request-song.component.html',
  styleUrl: './request-song.component.scss',
})
export class RequestSongComponent {
  title = 'dju';
  vibeText = new UntypedFormControl('');
  constructor(
    private activeRoute: ActivatedRoute,
    private firestore: Firestore,
    private ai: OpenAiService
  ) {}
  sugg: any;
  exampleReqs = [
    'Kaskade - 4am',
    'Taylor Swift - Shake it off ',
    'Frank Sinatra - Over',
  ];
  placeholder$: Observable<string> | undefined;
  interval$: Observable<number> = timer(0, 1000);
  sessionId: any;
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.sessionId = params.id;
    });
    // Cycle through suggestions
    this.placeholder$ = this.interval$.pipe(
      switchMap((index) =>
        of(this.exampleReqs[index % this.exampleReqs.length])
      )
    );
  }
  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  async sendSuggestion() {
    const payload = {
      song: this.vibeText.value,
      amount: 500,
      user: 'Reese Kelsey',
      created: new Date(),
      id: this.generateGuid(),
      sessionId: this.sessionId,
    };
    this.ai.parseSongName(payload.song).subscribe({
      next: async (res: any) => {
        let song = JSON.parse(res.replace(/(\w+):/g, '"$1":'));
        console.log('song', song);
        const newPayload = { ...payload, ...song };
        console.log('new payload', newPayload);
        await setDoc(
          doc(
            this.firestore,
            `sessions/${this.sessionId}/requests/${newPayload.id}`
          ),
          newPayload
        ).catch((err) => console.error('failed to send', err));
      },
      error: async (err) => {
        console.log('failed to normalize song', err);
        // If it fails it will still be requested
        await setDoc(
          doc(
            this.firestore,
            `sessions/${this.sessionId}/requests/${payload.id}`
          ),
          payload
        ).catch((err) => console.error('failed to send', err));
      },
    });
  }
}

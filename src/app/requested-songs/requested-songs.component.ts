import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { persistenceEnabled as _persistenceEnabled } from '../app.module';
import { traceUntilFirst } from '@angular/fire/performance';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { QrcodeComponent } from '../qrcode/qrcode.component';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-requested-songs',
  standalone: true,
  imports: [CommonModule, QrcodeComponent, MatButtonModule, MatIconModule],
  templateUrl: './requested-songs.component.html',
  styleUrl: './requested-songs.component.scss',
})
export class RequestedSongsComponent implements OnInit {
  song_requests$: any | Observable<any>;
  song_requests: any;
  sessionUrl: string | undefined | null = null;
  constructor(
    private firestore: Firestore,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    // const ref = doc(this.firestore, "");
    // this.song_requests$ = docData(ref).pipe(traceUntilFirst("firestore"));
    const params = this.activeRoute.snapshot;
    console.log('params', params);
    this.activeRoute.params.subscribe((params: any) => {
      console.log('subscribingn', params.id);
      if (params.id) {
        console.log('subscribingn', params.id);
        this.sessionUrl = location.host + '/session/request/' + params.id;
        this.subscribeToNewlyCreatedSession(params.id);
      }
    });
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

  async createSession() {
    const sessionId = this.generateGuid();
    // Visit this session to persist the djs created
    await setDoc(doc(this.firestore, 'sessions', sessionId), {
      name: 'Kaskade',
      sessionId: sessionId,
      current_song_play: null,
    });
    this.sessionUrl = location.host + '/session/request/' + sessionId;
    this.router.navigate(['session', sessionId]);
  }
  subscribeToNewlyCreatedSession(sessionId: string) {
    collectionData<any>(
      collection(this.firestore, `sessions/${sessionId}/requests`)
    ).subscribe((res) => {
      console.log('requests', res);
      this.song_requests = res;
    });
  }
}

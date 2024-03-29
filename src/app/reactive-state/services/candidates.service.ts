import {Injectable} from "@angular/core";
import {BehaviorSubject, delay, map, Observable, switchMap, take, tap} from "rxjs";
import {Candidate} from "../models/candidate.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class CandidatesService {

  constructor(private http: HttpClient) {
  }

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  private lastCandidatesLoad = 0;

  getCandidatesFromServer() {
    if (Date.now() - this.lastCandidatesLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
      delay(2000),
      tap(candidates => {
        this.lastCandidatesLoad = Date.now();
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getCandidateById(id: number): Observable<Candidate> {
    if (!this.lastCandidatesLoad) {
      this.getCandidatesFromServer();
    }
    return this._candidates$.pipe(
      map(candidates => candidates.filter(candidate => candidate.id === id)[0])
    );
  }

  refuseCandidate(id: number): void {
    this.setLoadingStatus(true);
    this.http.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
      switchMap(() => this.candidates$),
      take(1),
      map(candidates => candidates.filter(candidate => candidate.id != id)),
      tap(candidates => {
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  hireCandidate(id: number): void {
    this.candidates$.pipe(
      take(1),
      map(candidates => candidates.map(candidate => candidate.id === id ?
        {...candidate, company: 'SnapFace Ltd'} :
        candidate
      )),
      tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
      switchMap(updatedCandidates => this.http.patch(`${environment.apiUrl}/candidates/${id}`,
        updatedCandidates.find(candidate => candidate.id === id)))
    ).subscribe();
  }
}

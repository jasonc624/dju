import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class OpenAiService {
  private apiUrl = "https://suggestions-wiunq7jl7q-uc.a.run.app";

  constructor(private http: HttpClient) {}

  public fetchData(data: { text: string }): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

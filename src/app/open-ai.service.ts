import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Functions, httpsCallableData } from "@angular/fire/functions";

@Injectable({
  providedIn: "root",
})
export class OpenAiService {
  private apiUrl = "https://suggestions-wiunq7jl7q-uc.a.run.app";
  private functions: Functions = inject(Functions);

  constructor(private http: HttpClient) {}

  public fetchData(data: { text: string }): any {
    const getSuggestions = httpsCallableData(this.functions, "suggestions", {
      timeout: 3_000,
    });
    return getSuggestions(data);
  }
}

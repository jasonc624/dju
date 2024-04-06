import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { OpenAiService } from "./open-ai.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "dju";
  vibeText = new UntypedFormControl("");
  constructor(private ai: OpenAiService) {}

  ngOnInit(): void {}
  getSuggestions() {
    const data = { text: this.vibeText.value };
    console.log("data", data);
    this.ai.fetchData(data).subscribe((res) => {
      console.log("response", res);
    });
  }
}

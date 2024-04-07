import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { QRCodeModule } from "angularx-qrcode";

@Component({
  selector: "app-qrcode",
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: "./qrcode.component.html",
  styleUrl: "./qrcode.component.scss",
})
export class QrcodeComponent {
  @Input() qrString: string | undefined;
  constructor() {}
  ngOnInit() {}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadImageDialogComponent } from '../upload-image-dialog/upload-image-dialog.component';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() getUserFromHomePage: any;
  @Output() updateAvatar = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    new Promise((resolve) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.readAsDataURL(event.target.files[0]);

      event.target.value = '';
    }).then(base64String => {
      const dialogRef = this.dialog.open(UploadImageDialogComponent, {
        data: { base64String }
      });

      dialogRef.afterClosed().subscribe((base64Str: string | undefined) => {
        if (!base64Str) {
          return;
        }
        this.homeService.updateUserAvatar({ base64Str }).subscribe(() => {
          this.updateAvatar.emit();
        });
      });
    });

  }

}

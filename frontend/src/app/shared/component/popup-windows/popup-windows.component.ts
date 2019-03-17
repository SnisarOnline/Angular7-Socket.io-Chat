import {Component, HostListener, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from "@angular/forms";
import {PopupType} from "./popup-type-enum";
import {environment as env} from "../../../../environments/environment";


interface paramsData {
  userid: number;
  username: string;
  avatar: string;
  dialogType: PopupType;
}


@Component({
  selector: 'shared-popup-windows',
  templateUrl: './popup-windows.component.html',
  styleUrls: ['./popup-windows.component.styl']
})
/**
 * Само всплывающие окно.
 * Контент Окна отдельно.
 * @Info https://material.angular.io/components/dialog/examples
 */
export class PopupWindowsComponent {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.onSave();
    }
  }

  userIdFormControl = new FormControl(null, [Validators.required]);
  userNameFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<PopupWindowsComponent>,
    @Inject(MAT_DIALOG_DATA) public params: paramsData
  ) {
    this.userIdFormControl.setValue(this.params.userid);
    this.userNameFormControl.setValue(this.params.username);
  }

  onSave(): void {
    if (this.userNameFormControl.value == '' ) {
      return;
    }
    if (this.userIdFormControl.value === null) {
      this.userIdFormControl.setValue( this.getRandomId() );
    }
    const imgId = this.userIdFormControl.value;

    this.dialogRef.close({
      userid: this.userIdFormControl.value,
      username: this.userNameFormControl.value,
      avatar: `${env.avatarsUrl}/${imgId}.png`,
      dialogType: this.params.dialogType
    });
  }

  private getRandomId(): number {
    return Math.floor( Math.random() * (1000000)) + 1;
  }

}

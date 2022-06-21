import {
  Component,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { DatabaseService } from '../../services/database.service';
//import userSchema from '../../schemas/user.schema';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatabaseService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  @ViewChild('input', { static: false }) inputfield: any;

  tempDoc: any;

  constructor(
    private dbService: DatabaseService
  ) { 
    this.reset();
  }

  reset() {
        this.tempDoc = this.dbService.db.user.newDocument({
           // maxHP: getRandomArbitrary(100, 1000)
        });
    }

  async submit() {


      try {
          await this.tempDoc.save();
          //this.reset();
      } catch (err) {
          alert('Error: Please check console');
          console.error('hero-insert.submit(): error:');
          throw err;
      }

      this.inputfield.nativeElement.focus();
  }

}

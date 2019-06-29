import {AbstractControl} from '@angular/forms';

export class PasswordMatch{
    static matchPassword(ac: AbstractControl){
        const pwd = ac.get('password');
        const cnfpwd = ac.get('Confirmpassword');
        if (pwd.value === cnfpwd.value){
            return null;
        }
        ac.get('Confirmpassword').setErrors({mustMatch: true });
        return true;
    }
}
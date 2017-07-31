import validatorjs from 'validator';
import {configService} from './config';

const myValidators = {
    emailDifferentFromPassword: (email) => {
        return email !== this.password;
    },
    passwordConfirmationEqualPassword: (passwordConfirmation) => {
        return passwordConfirmation === this.password;
    }
};

const myConfig = {
    validatorLibrary: validatorjs,
    customValidators: myValidators
};
configService.init(myConfig);

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
const serverValidations = {
    'foo': {
        'summary': [

        ],
        'email': [
            {
                'isEmail': {
                    'message': 'must be a valid email'
                }
            },
            {
                'contains': {
                    'messsage': 'must be .es',
                    'arguments': [
                        '.es',
                    ]
                }
            },
            {
                'emailDifferentFromPassword': {
                    'message': 'email must be different from password',
                    'arguments': [
                        '$model'
                    ]
                }
            }
        ]
    }
};

const myConfig = {
    validatorLibrary: validatorjs,
    customValidators: myValidators,
    validations: serverValidations
};
configService.init(myConfig);

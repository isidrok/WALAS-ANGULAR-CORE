import validatorjs from 'validator';

const i18nConfig = {
    useI18n: false
};
const myCustomValidators =
    {
        emailDifferentFromPassword: function(email) {
            return email !== this.password;
        }
    };
const myValidations = {
    foo: {
        summary: [
        ],
        email: [
            {
                isEmail: {
                    message: 'must be a valid email'
                }
            },
            {
                contains: {
                    message: 'must contain .es',
                    arguments: [
                        '.es',
                    ]
                }
            },
            {
                emailDifferentFromPassword: {
                    message: 'email must be different from password',
                    arguments: [
                        '$model'
                    ]
                }
            }
        ]
    }
};
const myRoutes = [
    {
        route: 'clients',
        modulePath: 'http://localhost:8082/dist/demo_client.umd.js',
        moduleName: 'ClientModule',
        dependencies: [
        ]
    },
    {
        route: 'bills',
        modulePath: 'http://localhost:8081/dist/demo_bill.umd.js',
        moduleName: 'BillModule',
        dependencies: [
        //     {
        //         modulePath: 'http://localhost:8082/dist/demo_client.umd.js',
        //         moduleName: 'ClientModule'
        //     }
        ]
    }
];


export const myConfig = {
    i18n: i18nConfig,
    validation: {
        validatorLibrary: validatorjs,
        customValidators: myCustomValidators,
        validations: myValidations
    },
    loader: {
        routes: myRoutes,
        namespace: 'DEMO'
    }
};
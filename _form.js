import FormField from "components/Common/FormField/FormField";

export default {
    loginForm: {
        username: {
            label: 'Phone Number/Email',
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            value: '',
            rules: [{ required: true }]
        },
        password: FormField.password,
    },
    registerForm: {
        name: FormField.name,
        email: FormField.email,
        dob: FormField.dob,
        address: {
            size: 24,
            ...FormField.address
        },
        password: {
            divider: 'Manage Password',
            ...FormField.password
        },
        confirmPassword: FormField.confirmPassword,
        pinNumber: {
            divider: 'Manage Pin',
            ...FormField.pinNumber
        },
        confirmPinNumber: FormField.confirmPinNumber,
        securityQuestionId: FormField.securityQuestionId,
        securityAnswer: FormField.securityAnswer,
        referralCode: FormField.referralCode,
        isConfirmTerms: {
            divider: '',
            label: 'Is Accept',
            elementType: 'checkbox',
            elementConfig: {
                options: [{ value: 'yes', label: 'Terms & Conditions' }]
            },
            value: '',
            rules: [{ required: true }]
        },
    },
    preRegisterForm: {
        phone: FormField.phone,
        otp: FormField.otp,
    },
    // profileForm: {
    //     // username: {
    //     //     label: 'Username',
    //     //     elementType: 'input',
    //     //     elementConfig: {
    //     //         type: 'display'
    //     //     },
    //     //     value: '',
    //     //     validation: {
    //     //         required: true,
    //     //         isEmail: false
    //     //     },
    //     //     valid: false,
    //     //     invalidMessage: '',
    //     //     touched: false,
    //     //     rules: [{ required: true }]
    //     // },
    //     email: {
    //         label: 'Email',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: true
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },

    //     first_name: {
    //         label: 'First Name',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    //     last_name: {
    //         label: 'Last Name',
    //         elementType: 'insput',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    //     address: {
    //         label: 'Address',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    //     city: {
    //         label: 'City',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    //     // phone: {
    //     //     label: 'Phone Number',
    //     //     elementType: 'input',
    //     //     elementConfig: {
    //     //         type: 'text'
    //     //     },
    //     //     value: '',
    //     //     validation: {
    //     //         required: true,
    //     //         isEmail: false
    //     //     },
    //     //     valid: false,
    //     //     invalidMessage: '',
    //     //     touched: false,
    //     //     rules: [{ required: true }]
    //     // },
    //     nin: {
    //         label: 'Nin',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         // rules: [{ required: true }]
    //     },
    //     gender: {
    //         label: 'Gender',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    //     referralcode: {
    //         label: 'Refferal Code',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: false }]
    //     },
    //     pin: {
    //         label: 'Enter Pin',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         // rules: [{ required: true }]
    //     },
    //     repin: {
    //         label: 'Re-enter Pin',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [//{ required: true },
    //             ({ getFieldValue }) => ({
    //                 validator(_, value) {
    //                     if (!value || getFieldValue('pin') === value) {
    //                         return Promise.resolve();
    //                     }
    //                     return Promise.reject(new Error('The two pin that you entered do not match!'));
    //                 },
    //             }),]
    //     },
    //     securityquestion: {
    //         label: 'Security Question',
    //         elementType: 'select',
    //         elementConfig: {
    //             type: 'text',
    //             options: ["1.What city where you born?", "2.What is your mother's name?", "3.Where did you go for last new year celebration ?"]
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    //     securityanswer: {
    //         label: 'Security Answer',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    //     termsandcondition: {
    //         label: 'Terms And Condition',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    //     location: {
    //         label: 'Location',
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text'
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: false
    //         },
    //         valid: false,
    //         invalidMessage: '',
    //         touched: false,
    //         rules: [{ required: true }]
    //     },
    // },
    registerWithPhone: {
        phone: FormField.phone,
    }
}
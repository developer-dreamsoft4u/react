import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProForm from '@ant-design/pro-form';
import { Row, Col, message, Button, Card, Typography, Divider, Alert } from 'antd';
import { SendOutlined, SaveOutlined, CheckOutlined } from '@ant-design/icons';
import { firebase, auth } from './firebase';

import http from 'services/http.service';
import { config, endpoints } from 'config';
import Input from "components/Common/Input/Input";
import _form from './_form';
import logo from 'assets/small-logo.png';

const Register = (props) => {
    const [state, setState] = useState({
        formObject: _form.preRegisterForm,
        extraFormObject: _form.registerForm,
        otp: false,
        firebaseVerificationId: '',
        otpVerified: false,
        hasError: false,
        hasErrorMsg: ''
    });

    const handler = {
        onSubmit: (formData) => {
            http.post(endpoints.signup, formData)
                .then(res => {
                    if (res.data.status && res.data) {
                        message.success(res.data.message);
                        localStorage.setItem(config.tokenKey, res.data.accessToken);
                        // setTimeout(() => {
                        props.history.push('/login')
                        // }, 2000);
                    } else {
                        message.error(res.data.message);
                    }
                }).catch(() => {
                    message.error('Something went wrong. Please try later.');
                });
        },
        getOtp: (formData) => {
            let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            auth.signInWithPhoneNumber(`${formData.phone}`, verify).then((result) => {
                // console.log(result)
                document.getElementById('recaptcha-container').innerHTML = '';
                // window.confirmationResult = result;
                setState({ ...state, otp: true, firebaseVerificationId: result.verificationId });
            }).catch((err) => {
                console.log(err);
                setState({ ...state, otp: false, firebaseVerificationId: '' })
            });
        },
        verifyOtp: (formData) => {
            var credential = firebase.auth.PhoneAuthProvider.credential(state.firebaseVerificationId, formData.otp);
            // Then, you can sign in the user with the credential: 
            firebase.auth().signInWithCredential(credential).then((result) => {
                //result.user.phoneNumber
                message.success('OTP verified')
                setState({ ...state, otpVerified: true, hasError: '', hasErrorMsg: '' })
            }).catch(error => {
                // console.log(error, error.message)
                setState({ ...state, otpVerified: false, hasError: 'error', hasErrorMsg: error.message })
            });
        },
        onChange: (event) => {
            if (event.phone !== undefined) {
                setState({ ...state, otp: false, otpVerified: false });
            } else if (event.otp !== undefined) {
                setState({ ...state, otpVerified: false });
            }
        }
    }

    const { formObject, extraFormObject } = state;
    const formElements = [];
    Object.keys(formObject).forEach(key => {
        if (key === 'otp' && !state.otp) {
            return;
        }
        formElements.push({ id: key, config: formObject[key] });
    });
    if (state.otpVerified) {
        Object.keys(extraFormObject).forEach(key => {
            formElements.push({ id: key, config: extraFormObject[key] });
        });
    }

    const formInputs = (
        <Row gutter={{ md: 24, lg: 32 }}>
            {formElements.map(formElement => (
                <>
                    {formElement.config.divider !== undefined ?
                        formElement.config.divider ?
                            <Divider plain orientation="left">{formElement.config.divider}</Divider>
                            : <Col xs={24} sm={24} md={24} lg={24} xl={24} />
                        : ''}
                    <Col
                        xs={24} sm={24} md={24}
                        lg={formElement.config.size ? formElement.config.size : 12}
                        xl={formElement.config.size ? formElement.config.size : 12}
                        key={`col-${formElement.id}`}>
                        <Input
                            key={formElement.id}
                            name={formElement.id}
                            label={formElement.config.label}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            rules={formElement.config.rules}
                        />
                    </Col>
                </>
            ))}

        </Row>
    );

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid!'
        }
    };

    return (
        <Card>
            <Typography.Title level={2} className="text-center">
                <img style={{
                    height: '44px',
                    marginRight: 16,
                }} alt="logo" src={logo} />
                {config.siteTitle}
            </Typography.Title>
            <Typography.Title level={4} className="text-center">
                Create Account
            </Typography.Title>
            <Typography.Paragraph className="text-center">
                Already have an account?
                <Link to="/login" style={{ marginLeft: '5px' }}>
                    Login
                </Link>
            </Typography.Paragraph>
            <ProForm
                validateMessages={validateMessages}
                onValuesChange={handler.onChange}
                onFinish={async () => { }}
                syncToUrl={(values, type) => {
                    if (type === 'set') {
                        if (state.otpVerified) {
                            handler.onSubmit(values);
                        } else if (state.otp) {
                            handler.verifyOtp(values);
                        } else {
                            handler.getOtp(values);
                        }
                    }
                }}
                submitter={{
                    searchConfig: {
                        resetText: 'Reset',
                        submitText: 'Submit',
                    },
                    render: (props, doms) => {
                        let processButton = <Button
                            key='send-otp-button'
                            type='primary'
                            onClick={() => props.form.submit()}
                            icon={<SendOutlined />}
                        >
                            Send OTP
                        </Button>;
                        if (state.otpVerified) {
                            processButton = <Button
                                key='register-otp-button'
                                type='primary'
                                onClick={() => props.form.submit()}
                                icon={<SaveOutlined />}
                            >
                                Register
                            </Button>
                        } else if (state.otp) {
                            processButton = <Button
                                key='verify-otp-button'
                                type='primary'
                                onClick={() => props.form.submit()}
                                icon={<CheckOutlined />}
                            >
                                Verify OTP
                            </Button>
                        }
                        return <Row>
                            <Col xs={24}>
                                {processButton}
                                <Link to="/login" className="float-right">
                                    Login?
                                </Link>
                            </Col>
                        </Row>
                    },
                }}
            >
                {formInputs}
                <div id="recaptcha-container"></div>
                {state.hasError && <Alert message={state.hasErrorMsg} type={state.hasError} showIcon />}
            </ProForm >
        </Card>
    )
}

export default Register;
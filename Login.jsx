import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProForm from '@ant-design/pro-form';
import { Row, Col, message, Button, Card, Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import http from 'services/http.service';
import { config, endpoints } from 'config';
import Input from "components/Common/Input/Input";
import _form from './_form';
import logo from 'assets/small-logo.png';

const Login = () => {
    const [state] = useState({
        formObject: _form.loginForm
    });

    const handler = {
        onSubmit: (formData) => {
            http.post(endpoints.login, formData)
                .then(res => {
                    if (res.data.status) {
                        message.success(res.data.message);
                        localStorage.setItem(config.tokenKey, res.data.data.accessToken);
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 2000);
                    } else {
                        message.error(res.data.message);
                    }
                }).catch(() => {
                    message.error('Something went wrong. Please try later.');
                });
        }
    }

    const { formObject } = state;
    const formElements = [];
    Object.keys(formObject).forEach((key) => {
        formElements.push({ id: key, config: formObject[key] });
    });

    const formInputs = (
        <Row gutter={{ md: 24, lg: 32 }}>
            {formElements.map(formElement => (
                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
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
        <div
            style={{
                width: 500,
                margin: 'auto',
                marginTop: '100px'
            }}
        >
            <Card>
                <Typography.Title level={2} className="text-center">
                    <img style={{
                        height: '44px',
                        marginRight: 16,
                    }} alt="logo" src={logo} />
                    {config.siteTitle}
                </Typography.Title>
                <Typography.Title level={4} className="text-center">
                    Please login to access this panel
                </Typography.Title>
                <ProForm
                    validateMessages={validateMessages}
                    onFinish={async () => { }}
                    syncToUrl={(values, type) => {
                        if (type === 'set') {
                            handler.onSubmit(values);
                        }
                    }}
                    submitter={{
                        searchConfig: {
                            resetText: 'Reset',
                            submitText: 'Submit',
                        },
                        render: (props, doms) => {
                            return <Row>
                                <Col xs={24}>
                                    <Button
                                        type='primary'
                                        onClick={() => props.form.submit()}
                                    >
                                        <LoginOutlined /> Login
                                    </Button>
                                    <Link to="/register" className="float-right">
                                        Forgot Password?
                                    </Link>
                                </Col>
                                <Col xs={24} style={{ marginTop: '10px' }}>
                                    <Typography.Paragraph>
                                        Create an account?
                                        <Link to="/register" style={{ marginLeft: '5px' }}>
                                            Register
                                        </Link>
                                    </Typography.Paragraph>
                                </Col>
                            </Row>
                        },
                    }}
                >
                    {formInputs}
                </ProForm >
            </Card>
        </div>
    )
}

export default Login;
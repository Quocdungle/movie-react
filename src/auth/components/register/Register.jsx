import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../register-form/RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

Register.propTypes = {};

function Register(props) {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            //auto set username = email
            values.username = values.email;
            values.fullName = values.firstName + values.lastName;

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('new', user);
        } catch (error) {
            console.log('error', error);
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;

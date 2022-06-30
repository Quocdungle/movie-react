import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login, register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../login-form/LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            //auto set username = email
            const { closeDialog } = props;
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            if (closeDialog) {
                closeDialog();
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };
    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;

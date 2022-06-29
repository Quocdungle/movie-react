import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form;
    const hasError = errors[name];
    return (
        <Controller
            name={name}
            control={form.control}
            as={TextField}
            margin="normal"
            variant="outlined"
            fullWidth
            label={label}
            disabled={disabled}
            error={!!hasError}
            helperText={errors[name]?.message}
        />
    );
}

export default InputField;

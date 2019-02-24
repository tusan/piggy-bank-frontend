import React from 'react';
import LoginForm from '../../components/login/LoginForm';

import userService from '../../services/userService'


const handleSubmit = async (values) => {
    await userService.login(values);
}

export const LoginContainer = () => (<LoginForm handleSubmit={handleSubmit}/>)
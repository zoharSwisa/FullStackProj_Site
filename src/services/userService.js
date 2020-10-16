const axios = require('axios');

const url = 'http://localhost:8080/api/users/';

exports.login = function(userName, password)
{
    return axios.get(url + "Login?userName=" + userName + "&password=" + password);
}

exports.signin = function(userName, password)
{
    return axios.get(url + "Signin?userName=" + userName + "&password=" + password);
}

exports.createUser = function(user)
{
    return axios.post(url + "CreateUser", user);
}

exports.getAllUsers = function()
{
    return axios.get(url);
}

exports.deleteUser = function(userId)
{
    return axios.delete(url + userId);
}

exports.editUser = function(user)
{
    return axios.put(url + user.id, user);
}
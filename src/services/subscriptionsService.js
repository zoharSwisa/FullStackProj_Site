const axios = require('axios');

const url = 'http://localhost:8080/api/subscriptions/';

exports.getAllSubscriptions = function()
{
    return axios.get(url);
}

exports.addMember = function(member)
{
    return axios.post(url + "AddMember", member);
}

exports.addSubscription = function(sub)
{
    return axios.post(url + "AddSubscription", sub);
}

exports.deleteMember = function(id)
{
    return axios.delete(url + "DeleteMember/" + id);
}

exports.editMember = function(member)
{
    return axios.put(url + "EditMember/" + member.id, member);
}
const END_POINT = '/client/login';

const login = (client, request) => request.post(END_POINT).send(client);

module.exports = login;

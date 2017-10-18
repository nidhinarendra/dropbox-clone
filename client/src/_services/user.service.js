import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  getFiles,
  uploadFile,
  delete: _delete
};

function getFiles(user) {
  return fetch('/api/getFiles/' + user.id).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log('response inside getfiles services' + response.statusText);
    return response.json();
  });
}
function uploadFile(payload) {
  const requestOptions = {
    method: 'POST',
    body: payload
  };
  return fetch('/api/uploadFile', requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log('response' + response);
    return response;
  });
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch('/api/users/authenticate', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      console.log('response' + response);
      return response.json();
    })
    .then(user => {
      alert(JSON.stringify(user, null, 4));
      if (user && user.id) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/api/users/register', requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    return response.json();
    // console.log(response.json());
  });
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/users/' + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch('/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

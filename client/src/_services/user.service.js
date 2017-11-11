import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  getFiles,
  getRecentFiles,
  uploadFile,
  uploadFolder,
  getFolders,
  deleteFolder,
  deleteFile,
  updateStarFile,
  starredFolders,
  starredFiles,
  delete: _delete
};
const headers = {
  Accept: 'application/json'
};

function getFiles(userid) {
  console.log('in services getting files');
  return fetch('/api/getFiles/' + userid).then(response =>
    response
      .json()
      .then(data => ({
        data: data,
        status: response.status
      }))
      .then(res => {
        console.log(res.status, res.data);
        return res.data;
      })
  );
}

function starredFolders(userid) {
  console.log('in services getting files');
  return fetch('/api/starredFolders/' + userid).then(response =>
    response
      .json()
      .then(data => ({
        data: data,
        status: response.status
      }))
      .then(res => {
        console.log(res.status, res.data);
        return res.data;
      })
  );
}

function starredFiles(userid) {
  console.log('in services getting files');
  return fetch('/api/starredFiles/' + userid).then(response =>
    response
      .json()
      .then(data => ({
        data: data,
        status: response.status
      }))
      .then(res => {
        console.log(res.status, res.data);
        return res.data;
      })
  );
}

function deleteFolder(user, item) {
  var payload = { userid: user, item: item };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };
  console.log('in services getting files');
  return fetch('/api/deleteFolder', requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log('response' + response);
    return response.status;
  });
}

function updateStarFile(user, file, star) {
  var payload = { userid: user, file: file, star: star };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };
  console.log('in services getting files');
  return fetch('/api/updateStarFile', requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log('response' + response);
    return response.status;
  });
}

function deleteFile(user, item) {
  var payload = { userid: user, item: item };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };

  return fetch('/api/deleteFile', requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log('response' + response);
    return response.status;
  });
}

function getFolders(userid) {
  console.log('in services getting folders');
  return fetch('/api/getFolders/' + userid).then(response =>
    response
      .json()
      .then(data => ({
        data: data,
        status: response.status
      }))
      .then(res => {
        console.log(res.status, res.data);
        return res.data;
      })
  );
}

function getRecentFiles(userid) {
  console.log('in services getting files');
  return fetch('/api/getRecentFiles/' + userid).then(response =>
    response
      .json()
      .then(data => ({
        data: data,
        status: response.status
      }))
      .then(res => {
        console.log(res.status, res.data);
        return res.data;
      })
  );
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
    return response.status;
  });
}

function uploadFolder(payload) {
  console.log('the payload in user services for folder upload is', payload);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };
  return fetch('/api/uploadFolder', requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log('response' + response);
    return response.status;
  });
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
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
      if (user && user.id) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  return fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      ...headers
    },
    credentials: 'include'
  }).then(res => {
    localStorage.removeItem('user');
    return res.status;
  });
  // remove user from local storage to log user out
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

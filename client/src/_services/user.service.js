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
  updateStarFolder,
  starredFolders,
  starredFiles,
  delete: _delete
};
const headers = {
  Accept: 'application/json'
};

function getFiles(userid) {
  console.log('in services getting files');
  return fetch('/api/users/getFiles/' + userid).then(response =>
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
  return fetch('/api/users/starredFolders/' + userid).then(response =>
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
  return fetch('/api/users/starredFiles/' + userid).then(response =>
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
  return fetch('/api/users/deleteFolder', requestOptions).then(response => {
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
  return fetch('/api/users/updateStarFile', requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log('response' + response);
    return response.status;
  });
}

function updateStarFolder(user, folder, star) {
  var payload = { userid: user, folder: folder, star: star };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };
  return fetch('/api/users/updateStarFolder', requestOptions).then(response => {
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

  return fetch('/api/users/deleteFile', requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log('response' + response);
    return response.status;
  });
}

function getFolders(userid) {
  console.log('in services getting folders');
  return fetch('/api/users/getFolders/' + userid).then(response =>
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
  return fetch('/api/users/getRecentFiles/' + userid).then(response =>
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
  return fetch('/api/users/uploadFile', requestOptions).then(response => {
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
  return fetch('/api/users/uploadFolder', requestOptions).then(response => {
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
        console.log(user.id);
        console.log(user);
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
    console.log('the response for registration is ');
    console.log(response);
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response;
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

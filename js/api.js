
const users = [
  { name: 'admin', password : 'admin' },
  { name: 'guest', password : 'guest' },
];

function loginSync(name, password) {
  return users.some( user => user.name === name && password === user.password );
}

// simulates an async server call
export function login(name, password) {
  return new Promise( (resolve, reject) => {
    setTimeout( ()  => {
      if(loginSync(name, password))
        resolve('Login Successfull');
      else {
        reject('Invalid username/password');
      }
    }, 200);
  });
}

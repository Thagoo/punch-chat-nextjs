export async function userActive(clients, email) {
  var active = false;
  users.map((user) => {
    if (user.data.email == email) {
      active = true;
    }
  });
  return active;
}

export function userEmails(users) {
  let userEmails = [];

  for (const user of users) {
    if (user && user.data && user.data.email) {
      userEmails.push(user.data.email);
    }
  }
  return userEmails;
}

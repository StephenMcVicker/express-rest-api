const express = require('express');
const app = express();
const ck = require('ckey');
const PORT = ck.PORT || 3000;

const allUsers = [];
for (let index = 1; index < 10; index++) {
  const user = {
    id: index,
    name: `user${index}`,
  };
  allUsers.push(user);
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

app.use(express.json());

app.get('/users', (req, res) => {
  res.status(200).send({
    users: allUsers,
  });
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;

  const user = allUsers.find((user) => user.id === Number(id));
  if (user) {
    res.status(200).send({
      user: user,
    });
  } else {
    res.status(400).send({
      error: `User with ID ${id} was not found`,
    });
  }
});

app.post('/user/', (req, res) => {
  const { user } = req.body;

  if (!user) {
    res.status(400).send({
      error: 'User is required',
    });
  }

  if (!user.name) {
    res.status(400).send({
      error: 'Must provide a name for the user',
    });
  }

  const newUser = { id: allUsers.length + 1, ...user };
  allUsers.push(newUser);

  res.status(200).send({
    message: `Updated user list by adding user: ${newUser.name}`,
  });
});

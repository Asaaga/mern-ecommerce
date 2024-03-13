function getError(error) {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
}

export default getError;


// userRouter.post(
//   '/signup',
//   expressAsyncHandler(async (req, res) => {
//     const {email, password } = req.body;

//     const hashedPassword = bcrypt.hashSync(password, 10);

//     const query = `
//       INSERT INTO users (email, password)
//       VALUES (?, ?)
//     `;

//     database.query(query, [email, hashedPassword], (err, result) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).send({message: 'Database error' });
//         return;
//       }

//       const insertedUserId = result.insertId;
//       res.send({
//         id: insertedUserId,
//         email: email,
//         isAdmin: false, // Set the initial value as needed
//         token: generateToken({
//           id: insertedUserId,
//           email: email,
//           isAdmin: false, // Set the initial value as needed
//         }),
//       });
//     });
//   })
// );
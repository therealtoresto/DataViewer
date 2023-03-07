import bcrypt from 'bcrypt';

export const createHash = (user, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
}

// userSchema.pre('save', function(next) {
//   const user = this;
//   // Генеруємо сіль
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);

//     // Хешуємо пароль з використанням солі
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);

//       user.password = hash;
//       next();
//     });
//   });
// });
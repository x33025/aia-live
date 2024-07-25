import bcrypt from 'bcryptjs';

// The password you want to hash
const password = 'aiaisliterallythefuture123';

// Number of salt rounds
const saltRounds = 10;

// Generate the hash
bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
  } else {
    console.log('Generated hash:', hash);
  }
});
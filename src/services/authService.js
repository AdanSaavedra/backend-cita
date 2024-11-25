const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { saveUser, getUserByEmail } = require("./dynamoService");

const registerUser = async (email, password) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new Error("El usuario ya existe.");

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = uuid.v4();

  const newUser = {
    userId,
    email,
    passwordHash,
    role: "user", // Rol por defecto
    createdAt: new Date().toISOString(),
  };

  await saveUser(newUser);
  return { userId, email, role: newUser.role };
};

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error("Usuario no encontrado.");

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error("Contraseña incorrecta.");

  return { userId: user.userId, email: user.email, role: user.role };
};

module.exports = { registerUser, loginUser };

import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "nama", "email", "username", "hak_akses"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUsersbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await Users.findAll({
      where: {
        id: id,
      },
      attributes: ["id", "nama", "email", "username", "hak_akses"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, username, hak_akses, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      nama: name,
      username: username,
      email: email,
      hak_akses: hak_akses,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate password
    if (
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
    ) {
      return res.status(400).json({
        message:
          "Password minimal 8 karakter yang terdiri dari huruf besar kecil angka dan karakter spesial",
      });
    }

    const user = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Username not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Password not match",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        nama: user.nama,
        email: user.email,
        hak_akses: user.hak_akses,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        nama: user.nama,
        email: user.email,
        hak_akses: user.hak_akses,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user[0]) return res.sendStatus(204);

  const userId = user[0].id;

  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout Berhasil", status: true }); // Menggunakan res.status(200).json() untuk mengirim tanggapan JSON
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await Users.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "User berhasil dihapus" });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, username, hak_akses, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.update(
      {
        nama: name,
        username: username,
        email: email,
        hak_akses: hak_akses,
        password: hashPassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ msg: "Update Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

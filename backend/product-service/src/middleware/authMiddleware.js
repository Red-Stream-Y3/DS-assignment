import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import dotenv from 'dotenv/config';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const USER = process.env.USER_PORT || 9120;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const response = await axios.get(
        `http://localhost:${USER}/api/users/${decoded.id}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );

      req.user = response.data;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const adminSeller = (req, res, next) => {
  if ((req.user && req.user.isAdmin) || req.user.isSeller) {
    next();
  } else {
    res.status(401);
    throw new Error(
      `Not authorized as an ${req.user.isAdmin ? 'admin' : 'seller'}`
    );
  }
};

export { protect, adminSeller };

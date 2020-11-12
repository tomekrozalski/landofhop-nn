import { customAlphabet } from 'nanoid';

export function AddShortIdMiddleware(req, res, next) {
  const allowedTypes = 'abcdefghijklmnoprstuwvxyz01234567890';
  const nanoid = customAlphabet(allowedTypes, 6);
  req.body.shortId = nanoid();

  next();
}

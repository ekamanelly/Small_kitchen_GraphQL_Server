import Jwt, { Secret } from "jsonwebtoken";

const privateKey = process.env.JWT_SECRET as Secret;
console.log(privateKey);
export function signJwt(object: Object, options?: Jwt.SignOptions | undefined) {
  return Jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = Jwt.verify(token, privateKey) as T;
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}

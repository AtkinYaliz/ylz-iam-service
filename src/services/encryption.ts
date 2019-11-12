import fs = require("fs");
import jwt = require("jsonwebtoken");
import sha1 = require("sha1");

export interface IPayload {
  uid: string;
  ext: number;
  iat: number;
}

const privateKey = fs.readFileSync("private.pem", "utf8");

export function hash(value) {
  return sha1(value);
}

export function generateToken(uid: string, appId: string) {
  const oneHour = 1000 * 60 * 60;
  return jwt.sign({ uid, ext: Date.now() + oneHour, appId }, "privateKey", { algorithm: "HS256" });
}

export async function decodeToken(token: string): Promise<IPayload> {
  const decodedToken = await jwt.decode(token, { complete: true });

  return decodedToken["payload"];
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwt.verify(token, privateKey);
  } catch (err) {
    console.error("Invalid token!!!", err);
    return false;
  }

  return true;
}

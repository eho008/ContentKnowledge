import crypto from "crypto";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (password: string, salt: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.SECRET)
    .digest("hex");
};

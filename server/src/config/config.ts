export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION ?? "2h";

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET saknas i .env-filen");
}
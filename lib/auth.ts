import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";

const accessCookie = "readyai_access";
const refreshCookie = "readyai_refresh";

export type SessionUser = {
  userId: string;
  name: string;
  email: string;
  role: "student" | "mentor";
};

function secret() {
  return new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-before-deploy");
}

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function signToken(user: SessionUser, expiresIn = "15m") {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret());
}

export async function verifyToken(token: string): Promise<SessionUser> {
  const { payload } = await jwtVerify(token, secret());
  return {
    userId: String(payload.userId),
    name: String(payload.name ?? ""),
    email: String(payload.email),
    role: payload.role === "mentor" ? "mentor" : "student",
  };
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(accessCookie)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export function authCookies(accessToken: string, refreshToken: string) {
  return [
    `${accessCookie}=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=900`,
    `${refreshCookie}=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
  ];
}

export function clearAuthCookies() {
  return [
    `${accessCookie}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
    `${refreshCookie}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  ];
}

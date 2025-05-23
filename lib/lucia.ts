import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "innosys-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const getUserSession = async () => {
  const sessionId =
    (await cookies()).get(lucia.sessionCookieName)?.value || null;

  if (!sessionId) return null;

  console.log("I have sessionId", sessionId);
  return sessionId;
};

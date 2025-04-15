import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../init";
import prisma from "@/lib/prisma";
import { inferRouterInputs } from "@trpc/server";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { compareSync } from "bcrypt-ts";

export const appRouter = createTRPCRouter({
  //   userList: publicProcedure.query(async () => {
  //     const users = await prisma.user.findMany();
  //     return users;
  //   }),
  userList: privateProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await prisma.user.findUnique({
      where: {
        id: input,
      },
    });
    return user;
  }),
  userSignIn: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async (opts) => {
      const { input } = opts;

      const isEmailExist = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!isEmailExist) return { success: false, message: "User not found!" };

      const isPasswordMatch = compareSync(
        input.password,
        isEmailExist.hashPassword
      );

      if (!isPasswordMatch)
        return { success: false, message: "Password does not match!" };

      const session = await lucia.createSession(isEmailExist.id, {});
      const sessionCookie = await lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      return { success: true, message: "" };
    }),

  userCreate: publicProcedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        icNo: z.string(),
        hashPassword: z.string(),
        // optional fields
        fullname: z.string().optional(),
        contactNo: z.string().optional(),
        role: z.string().optional(),
        department: z.string().optional(),
        address: z.string().optional(),
        taxNo: z.string().optional(),

        epfNo: z.string().optional(),
        socsoNo: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      // if user already exists, throw an error
      const existingUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (existingUser)
        return { success: false, message: "User already exists." };

      const user = await prisma.user.create({
        data: {
          fullname: input.fullname,
          username: input.username,
          hashPassword: input.hashPassword,
          contactNo: input.contactNo,
          email: input.email,
          address: input.address,
          taxNo: input.taxNo,
          icNo: input.icNo,
          epfNo: input.epfNo,
          socsoNo: input.socsoNo,
        },
      });
      if (user) {
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = await lucia.createSessionCookie(session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
        return { success: true, message: "" };
      }

      return { success: false, message: "Something went wrong!" };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

// Eact input type
type RouterInput = inferRouterInputs<AppRouter>;

export type UserCreateTrpc = RouterInput["userCreate"];

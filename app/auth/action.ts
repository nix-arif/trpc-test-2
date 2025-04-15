"use server";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { UserCreateTrpc } from "@/trpc/routers/_app";
import { ssrTrpc } from "@/trpc/server";
import { z } from "zod";
import { signUpSchema } from "./SignUpForm";
import { signInSchema } from "./SignInForm";

export const submitUserCreateToTrpc = async (
  values: z.infer<typeof signUpSchema>
) => {
  const salt = genSaltSync(10);
  const hashPassword = hashSync(values.password, salt);
  const valuesToRegister = {
    email: values.email.trim(),
    username: values.username.trim(),
    icNo: values.icNo.trim(),
    hashPassword,
  };

  const response = await ssrTrpc.userCreate(valuesToRegister);
  return response;
};

export const submitUserSignIn = async (
  values: z.infer<typeof signInSchema>
) => {
  const response = await ssrTrpc.userSignIn(values);
  return response;
};

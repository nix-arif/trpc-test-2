"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitUserCreateToTrpc } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const signUpSchema = z
  .object({
    //   fullname: z.string(),
    email: z.string(),
    username: z.string(),
    icNo: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    //   contactNo: z.string(),
    //   role: z.string(),
    //   department: z.string(),
    //   address: z.string(),
    //   taxNo: z.string(),
    //   epfNo: z.string(),
    //   socsoNo: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      //   fullname: "",
      email: "",
      username: "",
      icNo: "",
      password: "",
      confirmPassword: "",
      //   contactNo: "",
      //   role: "",
      //   department: "",
      //   address: "",
      //   taxNo: "",
      //   icNo: "",
      //   epfNo: "",
      //   socsoNo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const response = await submitUserCreateToTrpc(values);
    if (response.success) {
      toast.success("Account created successfully.");
      router.push("/dashboard");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>Smart Innosys Sdn Bhd</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="username"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No IC</FormLabel>
                  <FormControl>
                    <Input
                      type="icNo"
                      placeholder="Enter your IC No"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-5">
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;

import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getUserSession } from "@/lib/lucia";

export const createTRPCContext = cache(
  async (opts: CreateNextContextOptions) => {
    const session = await getUserSession();
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return {
      session,
    };
  }
);
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
// const t = initTRPC.create({
//   /**
//    * @see https://trpc.io/docs/server/data-transformers
//    */
//   // transformer: superjson,
// });

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
const t = initTRPC.context<Context>().create();

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use((opts) => {
  opts.ctx;
  if (opts.ctx.session) {
    return opts.next();
  }

  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "Please login first",
  });
});

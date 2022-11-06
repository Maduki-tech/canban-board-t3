import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const postRouter = router({
  sendData: publicProcedure
    .input(z.object({ text: z.string(), user: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: {
          id: input.user,
        },
        data: {
          blog: {
            create: [{ post: input.text }],
          },
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany();
  }),
  unique: publicProcedure
    .input(z.object({ user: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.user,
			},include:{
				blog: true
			}
      });
    }),
});

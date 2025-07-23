import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import generateUserToken from "@/action/generateUserToken";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  appName: "better-notes",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI: process.env.BETTER_AUTH_URL + "/api/auth/callback/github",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
      redirectURI: process.env.BETTER_AUTH_URL + "/api/auth/callback/google"
    }
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['github', 'google']
    }
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path?.includes("/callback") && ctx.context.newSession?.user.id) {
        const existingUser = await prisma.user.findUnique({
          where: { id: ctx.context.newSession.user.id },
          select: { userToken: true }
        });
        if (!existingUser?.userToken) {
          const userToken = generateUserToken();
          await prisma.user.update({
            where: { id: ctx.context.newSession.user.id },
            data: { userToken }
          });
        }
      }
    })
  }
});

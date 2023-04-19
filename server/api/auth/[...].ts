import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    // secret needed to run nuxt-auth in production mode (used to encrypt data)
    secret: process.env.NUXT_SECRET,
    pages: {
      signIn: '/',
    },
    providers: [
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        CredentialsProvider.default({
            authorize (credentials: { email: string, password: string }) {
              return {
                id: 1,
                name: 'name',
                username: 'username',
                email: credentials.email,
                image: 'https://avatars.githubusercontent.com/u/23360933?s=64&v=4',
              }
            }
        })
    ],
    callbacks: {
      async session({ session, token, user }) {
        console.log(session, token, user)

        session.user.id = +token?.sub
        session.user.username = 'username2'

        return session
      },
    },
})

import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/lib/models/user';
import {connectMongoDB} from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {

            },
            async authorize(credentials) {
                const { username, password } = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({username});
                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        })
    ],
    session: {
        strategy: "jwt",

    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};
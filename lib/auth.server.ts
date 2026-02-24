import {betterAuth, type BetterAuthOptions}from 'better-auth'
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from './mongoClient.server'
import {admin}from 'better-auth/plugins'
const db=(await clientPromise).db("muniquizNew") 
const client=await clientPromise
export const auth=betterAuth({
  plugins:[admin()],
  rateLimit:{enabled:true,window:15 * 60 * 1000,max:5},
  database:mongodbAdapter(db,{client:client}),
  // nanti di change ke origin asli saat di deploy
  trustedOrigins:['myapp://',
    // Development mode - Expo's exp:// scheme with local IP ranges
        ...(process.env.NODE_ENV === "development" ? [
            "exp://",                      // Trust all Expo URLs (prefix matching)
            "exp://**",                    // Trust all Expo URLs (wildcard matching)
            "exp://192.168.*.*:*/**",      // Trust 192.168.x.x IP range with any port and path
        ] : [])],
  emailAndPassword:{enabled:true}, 
  user:{additionalFields:{
    role:{type:"string",input:false,defaultValue:'user'},
    noTelp:{type:'string',input:true}
  }},
  socialProviders:{
    google:{
      clientId:process.env.EXPO_PUBLIC_AUTH_GOOGLE_ID as string,
      clientSecret:process.env.EXPO_PUBLIC_AUTH_GOOGLE_SECRET as string,
    }
  },
  session: {
    cookieCache:{
    enabled:true,
    maxAge:60 * 5 //5 menit
  },
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24
    }
    
})
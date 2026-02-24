import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields,adminClient } from "better-auth/client/plugins";
export const authClient=createAuthClient({
    plugins:[inferAdditionalFields({user:{noTelp:{type:"string"}}}),adminClient()],
    baseURL:"http://localhost:3000",
})
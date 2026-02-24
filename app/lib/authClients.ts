import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields,adminClient } from "better-auth/client/plugins";
import { expoClient } from "@better-auth/expo/client"
import * as SecureStore from "expo-secure-store";
export const authClient=createAuthClient({
    plugins:[
        inferAdditionalFields({user:{noTelp:{type:"string"}}}),adminClient(),
        expoClient({scheme:'myapp',storagePrefix:'myapp',storage:SecureStore})
    ],
    baseURL:"http://localhost:8081/api/auth",
})
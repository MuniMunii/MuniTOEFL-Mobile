import {z}from "zod"
export const RegisterScheme = z
  .object({
    username: z
      .string()
      .min(4, "At least 4 characters")
      .max(16, "Maximum 16 characters"),
    email: z.email(),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*\d).{6,}$/,
        "Password must contain at least one uppercase letter and one number"
      ),
      noTelp:z.string().trim()
    .regex(/^\+?\d{6,17}$/, {
      message:
        "Phone number must be 6–17 digits",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["ConfirmPassword"],
    error: "Password tidak match",
  });
  export const LoginScheme=z.object({
    email:z.email(),
    password:z.string()
  })
export type RegisterType = z.infer<typeof RegisterScheme>;
export type LoginType = z.infer<typeof LoginScheme>;
import { z } from "zod";

export const logInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Please check again",
  }),
});

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Please check again" }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords must match",
      });
    }
  });

export const otpFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const userFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Can't be empty",
  }),
  lastName: z.string().min(1, {
    message: "Can't be empty",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
});

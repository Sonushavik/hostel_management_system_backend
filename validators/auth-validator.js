const { z } = require("zod");

const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(255, { message: "Name must not exceed 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters" }),

    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(20, { message: "Phone number must not exceed 20 digits" })
        .regex(/^\d+$/, { message: "Phone number must contain only digits" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be at least 7 characters" })
        .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

const signinSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be at least 7 characters" })
        .max(1024, { message: "Password can't be greater than 1024 characters" }),
});


module.exports = { signupSchema, signinSchema };

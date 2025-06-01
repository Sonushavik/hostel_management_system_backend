const {z} = require("zod");

const contactSchema = z.object({
        username:z
        .string({required_error: "Name is required"})
        .trim()
        .min(2,{message: "Name must be at least 3 characters"})
        .max(255, {message: "Name must not exceed 255 characters"}),

        email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters" }),

        phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(20, { message: "Phone number must not exceed 20 digits" })
        .regex(/^\d+$/, { message: "Phone number must contain only digits" }),

        message: z.
        string()
        .trim()
})

module.exports = {contactSchema};
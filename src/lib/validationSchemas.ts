import { z } from "zod";

// Auth validation schemas
export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

// Survey validation schemas
export const surveyStep1Schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate < today;
    }, "Date of birth must be in the past")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13 && age <= 120;
    }, "Age must be between 13 and 120 years"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  profilePhoto: z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .max(500, "URL must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export const surveyStep3Schema = z.object({
  sleepHours: z
    .number()
    .min(0, "Sleep hours cannot be negative")
    .max(24, "Sleep hours cannot exceed 24")
    .int("Sleep hours must be a whole number"),
});

// Feedback validation schema
export const feedbackSchema = z.object({
  feedback_text: z
    .string()
    .trim()
    .min(10, "Feedback must be at least 10 characters")
    .max(1000, "Feedback must be less than 1000 characters"),
});

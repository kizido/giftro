import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4, "Username must be at least 4 characters."),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const onboardSurveySchema = z.object({
  birthMonth: z
    .string()
    .max(2, "2 chars max")
    .refine(
      (val) => {
        const parsed = parseInt(val, 10);

        return (
          !isNaN(parsed) &&
          parsed.toString() === val &&
          parsed <= 12 &&
          parsed >= 1
        );
      },
      {
        message: "Inputted month is not an acceptable month",
      }
    ),
  birthDay: z
    .string()
    .max(2, "2 chars max")
    .refine(
      (val) => {
        const parsed = parseInt(val, 10);

        return (
          !isNaN(parsed) &&
          parsed.toString() === val &&
          parsed <= 31 &&
          parsed >= 1
        );
      },
      {
        message: "Inputted day is not an acceptable day of month",
      }
    ),
  birthYear: z
    .string()
    .max(4, "4 chars max")
    .refine(
      (val) => {
        const parsed = parseInt(val, 10);

        return (
          !isNaN(parsed) &&
          parsed.toString() === val &&
          parsed >= 1900 &&
          parsed <= 2024
        );
      },
      {
        message: "Inputted year is not an acceptable year",
      }
    ),
  hobbies: z.string().array(),
});

export type TOnboardSurvey = z.infer<typeof onboardSurveySchema>;

export const createEventSchema = z.object({
  eventName: z.string({
    required_error: "Please select a name.",
  }),
  eventDate: z.date({
    required_error: "Please select a date.",
  }),
  giftee: z.string({
    required_error: "Please select a giftee.",
  }),
  eventGifts: z.string({
    required_error: "Please select a name.",
  }),
  budget: z.string({
    required_error: "Please select a name.",
  }),
  annual: z.boolean(),
});
export type TCreateEvent = z.infer<typeof createEventSchema>;

export const createEventSchemaDateString = z.object({
  eventName: z.string({
    required_error: "Please select a name.",
  }),
  eventDate: z.string({
    required_error: "Please select a date.",
  }),
  giftee: z.string({
    required_error: "Please select a giftee.",
  }),
  eventGifts: z.string({
    required_error: "Please select a name.",
  }),
  budget: z.string({
    required_error: "Please select a name.",
  }),
  annual: z.boolean(),
});

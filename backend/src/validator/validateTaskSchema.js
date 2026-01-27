import yup from "yup";

export const validateTaskSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(3, "Title must have 3 character")
    .max(40, "title at most have 40 character")
    .required(),
  description: yup
    .string()
    .trim()
    .max(80, "description at most have 80 character")
    .required(),
});

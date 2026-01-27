import yup from "yup";

export const validateUserSchema = yup.object({
  userName: yup
    .string()
    .trim()
    .min(3, "Username must be atleast 3 character")
    .required(),
  email: yup.string().email("The email is not valid one").required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
    )
    .required(),
});

export const forgotPasswordSchema  = yup.object({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
    )
    .required(),
});

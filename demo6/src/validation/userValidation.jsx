import * as yup from "yup";

const userSchema = yup.object().shape({
  firstname: yup.string(),
  lastname: yup.string(),
  age: yup.number().min(10),
  email: yup.string().email(),
  salary: yup.number(),
  country: yup.string(),
  state: yup.string(),
  city: yup.string(),
  password: yup.string(),
});

export default userSchema;
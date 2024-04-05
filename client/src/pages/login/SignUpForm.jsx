import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as z from "zod";
import { signUpUser } from "../../services/userService";
import img from "../../static/images/y2.svg";

const SignUpForm = ({ setAuthForm }) => {
  const navigateTo = useNavigate();
  const schema = z.object({
    email: z.string().min(1, "Email is required").email(),
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(10, "Username must be at most 10 characters")
      .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
        message: "Username can only contain letters and numbers",
      }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .refine((data) => data === watch("password"), {
        message: "Passwords do not match",
      }),
  });
  const {
    handleSubmit,
    watch,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const handleSignUp = async (values) => {
    try {
      const userData = await signUpUser(
        values.username,
        values.email,
        values.password,
        values.confirmPassword
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        navigateTo("/");
      } else {
        throw userData.errors;
      }
    } catch (err) {
      if (Array.isArray(err)) {
        const errorMap = {
          "Username already exists": "username",
          "Email already exists": "email",
        };

        err.forEach((error) => {
          const field = errorMap[error];

          if (field) {
            setError(field, {
              message: `${
                field.charAt(0).toUpperCase() + field.slice(1)
              } is already taken`,
            });
          }
        });
      } else {
        setError("root", { message: "There was an issue signing up" });
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-neutral-900 px-8 py-7 rounded-md shadow-xl w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <NavLink to="/" className="cursor-pointer flex items-center group">
            <img
              className="h-8 rounded-full group-hover:rotate-90 transition duration-500 ease-in-out"
              src={img}
            />
            <span className="font-extrabold text-rose-600 text-3xl">Ring</span>
            <span className="text-neutral-500 font-semibold text-3xl">
              Typer
            </span>
          </NavLink>
        </div>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <label className="text-neutral-500 mr-auto">Username</label>
              <div className="h-8 flex justify-start">
                {errors.username?.message && (
                  <div className="flex items-center text-rose-500 px-2 ml-auto w-fit rounded-md text-xs mt-1 h-6">
                    <FontAwesomeIcon
                      className="p-0.5 rounded-full h-3 w-3"
                      icon={faTriangleExclamation}
                    />
                    <span>{errors.username?.message}</span>
                  </div>
                )}
              </div>
            </div>
            <input
              className="rounded-md ring-1 text-neutral-50 bg-neutral-900 ring-neutral-600 focus:ring-rose-600 focus:ring-2 py-1 px-2 focus:outline-0 transition duration-200"
              type="username"
              autoComplete="off"
              {...register("username")}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <label className="text-neutral-500 mr-auto">Email</label>
              <div className="h-8 flex justify-start">
                {errors.email?.message && (
                  <div className="flex items-center text-rose-500 px-2 ml-auto w-fit rounded-md text-xs mt-1 h-6">
                    <FontAwesomeIcon
                      className="p-0.5 rounded-full h-3 w-3"
                      icon={faTriangleExclamation}
                    />
                    <span>{errors.email?.message}</span>
                  </div>
                )}
              </div>
            </div>
            <input
              className="rounded-md ring-1 text-neutral-50 bg-neutral-900 ring-neutral-600 focus:ring-rose-600 focus:ring-2 py-1 px-2 focus:outline-0 transition duration-200"
              type="email"
              autoComplete="off"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <label className="text-neutral-500 mr-auto">Password</label>
              <div className="h-8 flex justify-start">
                {errors.password?.message && (
                  <div className="flex items-center text-rose-500 px-2 ml-auto w-fit rounded-md text-xs mt-1 h-6">
                    <FontAwesomeIcon
                      className="p-0.5 rounded-full h-3 w-3"
                      icon={faTriangleExclamation}
                    />
                    <span>{errors.password?.message}</span>
                  </div>
                )}
              </div>
            </div>
            <input
              className="rounded-md ring-1 text-neutral-50 bg-neutral-900 ring-neutral-600 focus:ring-rose-600 focus:ring-2 py-1 px-2 focus:outline-0 transition duration-200"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <label className="text-neutral-500 mr-auto">
                Confirm Password
              </label>
              <div className="h-8 flex justify-start">
                {errors.confirmPassword?.message && (
                  <div className="flex items-center text-rose-500  px-2 ml-auto w-fit rounded-md text-xs mt-1 h-6">
                    <FontAwesomeIcon
                      className="p-0.5 rounded-full h-3 w-3"
                      icon={faTriangleExclamation}
                    />
                    <span>{errors.confirmPassword?.message}</span>
                  </div>
                )}
              </div>
            </div>
            <input
              type="password"
              className="rounded-md ring-1 text-neutral-50 bg-neutral-900 ring-neutral-600 focus:ring-rose-600 focus:ring-2 py-1 px-2 focus:outline-0 transition duration-200"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
          </div>
          <div className="h-4 flex justify-start">
            {errors.root?.message && (
              <div className="flex items-center text-rose-500  px-2 ml-auto w-fit rounded-md text-xs mt-2 h-6">
                <FontAwesomeIcon
                  className="p-0.5 rounded-full h-3 w-3"
                  icon={faTriangleExclamation}
                />
                <span>{errors.root?.message}</span>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="disabled:opacity-50 shadow-neutral-950 shadow-sm disabled:cursor-default disabled:hover:text-rose-600 disabled:hover:border-rose-600 relative mt-5 cursor-pointer hover:text-neutral-50 transition duration-300 border-rose-600 border-2 hover:border-neutral-50 font-extrabold text-rose-600 px-12 bg-rose-900 bg-opacity-10 rounded-md"
              type="submit"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
            {isSubmitting && (
              <svg
                aria-hidden="true"
                className="absolute mx-auto left-0 right-0 -top-5 h-7 w-7 animate-spin fill-rose-600 text-neutral-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </div>
        </form>
        <div className="mt-10 flex justify-center flex-col items-center">
          <span className="text-neutral-500">Already have an account?</span>
          <button
            disabled={isSubmitting}
            onClick={() => setAuthForm("Sign In")}
            className="disabled:opacity-50 disabled:cursor-default  text-rose-600 font-extrabold hover:text-neutral-300 transition duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

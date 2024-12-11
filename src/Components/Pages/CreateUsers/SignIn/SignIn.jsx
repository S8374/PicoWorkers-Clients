import { UseAuth } from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
export const SignIn = ({ onSuccess }) => {
  const { signIn } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now signed in.",
        confirmButtonText: "OK",
      });
      if (onSuccess) onSuccess();
      console.log("User signed in:", result);
      // Add any additional logic (e.g., close modal, navigate)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email",
              },
            })}
            className={`mt-2 block w-full px-4 py-2 text-sm text-gray-900 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`mt-2 block w-full px-4 py-2 text-sm text-gray-900 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Get started
          </button>
        </div>
      </form>
    </div>
  );
};

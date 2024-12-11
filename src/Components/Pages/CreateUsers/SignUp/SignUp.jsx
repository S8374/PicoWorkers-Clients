import { useForm } from "react-hook-form";
import { UseAuth } from "../../../../Hooks/useAuth";
import { UseAxiosPublic } from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";  // Import SweetAlert2

export const SignUp = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // Add setError to set custom errors
  } = useForm();
  const { updateUserProfile, signUp } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  const onSubmit = (data) => {
    console.log("Form data:", data);

    // Assign coins based on the selected category
    const coins = data.category === "Worker" ? 10 : data.category === "TaskCreator" ? 50 : 0;

    // Handle the form submission logic
    signUp(data.email, data.password)
      .then(result => {
        const createdUser = result.user;
        console.log('created User', createdUser);
        
        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            const userInfo = {
              email: createdUser.email,
              userCategory: data.category,
              name: data.name,
              photoUrl: data.photoUrl,
              coins: coins,  // Adding the coins information
            };

            // Check if the email is already in use
            axiosPublic.get('/users')
              .then((res) => {
                const existingUser = res.data.find(user => user.email === data.email);
                if (existingUser) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Email already used',
                    text: 'The email address is already associated with an existing account.',
                  });

                  // Set custom error for email field
                  setError("email", {
                    type: "manual",
                    message: "Email is already in use",
                  });
                } else {
                  axiosPublic.post('/users', userInfo)
                    .then((res) => {
                      console.log('User created successfully', res.data);
                      if (res.data.insertedId) {
                       // Pass the user info to the onSuccess callback (if provided)
                        if (onSuccess) onSuccess();
                      }
                    })
                  
                }
              })
             
          })
        
      })
      .catch(error => {
        console.log('Error signing up', error);
        
        // Check if the error is email already in use and set the error under email input
        if (error.code === 'auth/email-already-in-use') {
          setError("email", {
            type: "manual",
            message: "Email is already in use",
          });
        }
      });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-2 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: "Name is required" })}
            className="mt-2 block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="mt-2 block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        {/* Photo URL Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo URL</label>
          <input
            type="url"
            placeholder="Enter Photo URL"
            {...register("photoUrl", {
              required: "Photo URL is required",
            })}
            className="mt-2 block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.photoUrl && <span className="text-red-500 text-sm">{errors.photoUrl.message}</span>}
        </div>

        {/* Select Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Your Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="mt-2 block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Worker">Worker</option>
            <option value="TaskCreator">Task Creator</option>
          </select>
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="mt-2 block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../../../../Hooks/useAuth";
import { UseAxiosPublic } from "../../../../Hooks/useAxiosPublic";
import { UseAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export const AddNewTask = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Show SweetAlert loading state
      Swal.fire({
        title: "Uploading image...",
        text: "Please wait while we upload the image.",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Image upload to imgbb
      const imageFile = new FormData();
      imageFile.append("image", data.task_image_url[0]);

      const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (imageRes.data.success) {
        const taskData = {
          title: data.task_title,
          detail: data.task_detail,
          quantity: data.task_quantity,
          payableAmount: parseFloat(data.payable_amount),
          completionDate: data.completion_date,
          submissionInfo: data.submission_info,
          imageUrl: imageRes.data.data.display_url,
          UserEmail: user.email,
          UserName: user.displayName,
          status: "Pending",
        };

        // Sending data to API
        await axiosSecure.post("/TaskItems", taskData);

        // Reset form
        reset();

        // Success message
        Swal.fire({
          icon: "success",
          title: "Task Added",
          text: "Your task has been successfully added!",
          confirmButtonColor: "#4F46E5",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "Failed to upload image. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error uploading image or saving task:", error);
      Swal.fire({
        icon: "error",
        title: "Task Submission Failed",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font1 font-bold text-center text-gray-700 mb-6">
          Add Your Task
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="task_title" className="block font-medium mb-1 font1">
                Task Title
              </label>
              <input
                {...register("task_title", { required: "Task title is required" })}
                type="text"
                id="task_title"
                placeholder="Enter task title"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              />
              {errors.task_title && (
                <p className="text-red-500 text-sm">{errors.task_title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="task_detail" className="block font-medium mb-1 font1">
                Task Detail
              </label>
              <textarea
                {...register("task_detail", { required: "Task detail is required" })}
                id="task_detail"
                placeholder="Enter task details"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              />
              {errors.task_detail && (
                <p className="text-red-500 text-sm">{errors.task_detail.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="task_quantity" className="block font-medium mb-1 font1">
                Task Quantity
              </label>
              <input
                {...register("task_quantity", { required: "Task quantity is required" })}
                type="number"
                id="task_quantity"
                placeholder="Enter task quantity"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              />
              {errors.task_quantity && (
                <p className="text-red-500 text-sm">{errors.task_quantity.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="payable_amount" className="block font-medium mb-1 font1">
                Payable Amount (per Task)
              </label>
              <input
                {...register("payable_amount", { required: "Payable amount is required" })}
                type="number"
                id="payable_amount"
                placeholder="Enter payable amount"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              />
              {errors.payable_amount && (
                <p className="text-red-500 text-sm">{errors.payable_amount.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="completion_date" className="block font-medium mb-1 font1">
                Completion Date
              </label>
              <input
                {...register("completion_date", { required: "Completion date is required" })}
                type="date"
                id="completion_date"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              />
              {errors.completion_date && (
                <p className="text-red-500 text-sm">{errors.completion_date.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="submission_info" className="block font-medium font1 mb-1">
                Submission Info
              </label>
              <textarea
                {...register("submission_info", { required: "Submission info is required" })}
                id="submission_info"
                placeholder="Enter submission information"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              />
              {errors.submission_info && (
                <p className="text-red-500 text-sm">{errors.submission_info.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="task_image_url" className="block font-medium mb-1">
                Task Image
              </label>
              <input
                {...register("task_image_url", { required: "Task image is required" })}
                type="file"
                id="task_image_url"
                className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              />
              {errors.task_image_url && (
                <p className="text-red-500 text-sm">{errors.task_image_url.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition ${loading ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

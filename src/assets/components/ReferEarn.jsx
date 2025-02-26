import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const ReferEarn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/referral", data);
      setMessage(res.data.message);
      setOpen(false);
    } catch (error) {
      setMessage("Submission failed! Check console.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <h1 className="text-4xl font-bold mb-6">Refer & Earn</h1>
      
      <button 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
      >
        Refer Now
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Refer a Friend</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium">Your Name</label>
                <input 
                  type="text" {...register("referrerName", { required: true })} 
                  className="w-full p-2 border rounded-md"
                />
                {errors.referrerName && <p className="text-red-500 text-sm">Required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Your Email</label>
                <input 
                  type="email" {...register("referrerEmail", { required: true })} 
                  className="w-full p-2 border rounded-md"
                />
                {errors.referrerEmail && <p className="text-red-500 text-sm">Required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Friend's Name</label>
                <input 
                  type="text" {...register("refereeName", { required: true })} 
                  className="w-full p-2 border rounded-md"
                />
                {errors.refereeName && <p className="text-red-500 text-sm">Required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Friend's Email</label>
                <input 
                  type="email" {...register("refereeEmail", { required: true })} 
                  className="w-full p-2 border rounded-md"
                />
                {errors.refereeEmail && <p className="text-red-500 text-sm">Required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Course Name</label>
                <input 
                  type="text" {...register("course", { required: true })} 
                  className="w-full p-2 border rounded-md"
                />
                {errors.course && <p className="text-red-500 text-sm">Required</p>}
              </div>

              <button 
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>

            {/* Close button */}
            <button 
              className="mt-3 text-gray-500 text-sm hover:text-gray-700"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
    </div>
  );
};

export default ReferEarn;

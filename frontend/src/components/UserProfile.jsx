/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast'; // For notifications
import { useForm } from 'react-hook-form';

const UserProfile = ({ id }) => {
  const { user, updateUser, updatePassword } = useUserStore();
  const [isEditing, setIsEditing] = useState(false); // Single state for editing mode
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false); // State for password visibility
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email }); // Populate the form with user data
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    console.log('Submitting user data:', data)
    const success = await updateUser(data);
    if (success) {
      toast.success('Profile updated successfully!');
      setIsEditing(false); // Stop editing mode
    } else {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value; // Access new password from the form

    if (newPassword) {
      const success = await updatePassword(id, { newPassword });
      if (success) {
        toast.success('Password updated successfully!');
        e.target.reset(); // Clear the password input field
        setIsUpdatingPassword(false); // Hide password input after successful update
      } else {
        toast.error('Failed to update password. Please try again.');
      }
    } else {
      toast.error('Please enter a new password.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">My Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-300">Name:</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className={`w-full p-2 rounded-md ${isEditing ? 'bg-gray-700' : 'bg-gray-900'} text-gray-300`}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <label className="block text-gray-300">Email:</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className={`w-full p-2 rounded-md ${isEditing ? 'bg-gray-700' : 'bg-gray-900'} text-gray-300`}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <button 
            type="button" 
            onClick={() => setIsEditing((prev) => !prev)} 
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          
          {isEditing && (
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md ml-2">
              Save Changes
            </button>
          )}
        </div>
      </form>

      <hr className="my-4 border-gray-700" />

      <div>
        <h3 className="text-xl font-semibold text-gray-300">Change Password</h3>
        <button
          type="button"
          onClick={() => setIsUpdatingPassword((prev) => !prev)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md mt-2"
        >
          {isUpdatingPassword ? 'Cancel' : 'Update Password'}
        </button>

        {isUpdatingPassword && (
          <form onSubmit={handlePasswordChange} className="flex items-center space-x-2 mt-2">
            <input
              type="password"
              name="newPassword" // Use name to access the value in the form
              placeholder="New Password"
              className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
              required
            />
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md">
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

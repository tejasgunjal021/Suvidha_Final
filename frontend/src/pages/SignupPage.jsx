

import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader, Key } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore.js";


const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		otp: "",
	});

	const [otpSent, setOtpSent] = useState(false);
	const {signup, loading, sendOtp, resendEnabled, countdown, verifyOtp, otpVerified, setOtpVerified } = useUserStore();

	const handleSendOtp = async (e) => {
		e.preventDefault();

		try {
			if (!formData.email) {
				toast.error("Please enter your email.");
				return;
			}
			await sendOtp({ email: formData.email });
			setOtpSent(true);
			setOtpVerified(false);
		} catch (error) {
			console.error("Error sending OTP:", error);
		}
	};

	const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
     await verifyOtp(formData.email, formData.otp);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };


	const handleSubmit = (e) => {
		e.preventDefault();
		if(!otpSent) {
			toast.error("Please request an OTP before signing up.");
			return;
		}
		if (!otpVerified) { // Check if OTP is verified before proceeding
			toast.error("Please verify your OTP before signing up.");
			return;
		}
    signup(formData);
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-purple-400'>Create your account</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
								Full name
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='Your Name'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-purple-500 
									 focus:border-purple-500 sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						{/* Button to send OTP */}
						{!otpSent && (
							<button
								onClick={handleSendOtp}
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-50'
								disabled={loading}
							>
								{loading ? (
									<>
										<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
										Sending OTP...
									</>
								) : (
									<>
										<Key className='mr-2 h-5 w-5' aria-hidden='true' />
										Send OTP
									</>
								)}
							</button>
						)}

						 {/* OTP Input */}
						 {otpSent && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                  OTP
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="otp"
                    type="text"
                    required
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter OTP"
                  />
                </div>

                {/* Resend OTP button */}
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={!resendEnabled}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${resendEnabled ? 'text-white bg-purple-600 hover:bg-purple-700' : 'text-gray-400 bg-gray-600'} transition duration-150 ease-in-out`}
                  >
                    {resendEnabled ? (
                      "Resend OTP"
                    ) : (
                      `Resend in ${countdown}s`
                    )}
                  </button>
                </div>

                {/* OTP Verification Button */}
                <div className="mt-2">
								<button
									type="button"
									onClick={handleVerifyOtp}
									className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out ${otpVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
									disabled={otpVerified} // Corrected the disabled attribute
								>
									Verify OTP
								</button>

                </div>
              </div>
            )}


						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-300'>
								Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
								Confirm Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border
									 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-purple-600
							 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading || !otpVerified}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
									Sign up
								</>
							)}
						</button>
					</form>

					<p className='mt-8 text-center text-sm text-gray-400'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-purple-400 hover:text-purple-300'>
							Login here <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default SignUpPage;
import * as React from 'react';

interface EmailTemplateProps {
  userName: string;
  otp: string;
}

export default function EmailTemplate({ userName, otp }:EmailTemplateProps){
  return(
  <div className="bg-gray-100 min-h-screen py-10 px-5">
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-indigo-600 p-6">
        <h1 className="text-white text-2xl font-bold">Hello, {userName}!</h1>
      </div>
      <div className="p-6">
        <p className="text-gray-700 text-lg">
          Your OTP Code
        </p>
        <p className="text-indigo-600 text-4xl font-bold mt-4">
          {otp}
        </p>
        <p className="text-gray-700 mt-4">
          Please use the above OTP to complete your verification. This OTP is valid for the next 10 minutes.
        </p>
        <p className="text-gray-700 mt-4">
          If you did not request this code, please ignore this email or contact our support team.
        </p>
        <div className="mt-6">
          <a href="" className="inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500">
            Contact Support
          </a>
        </div>
      </div>
      <div className="bg-gray-200 p-6 text-center">
        <p className="text-gray-600 text-sm">
          &copy; 2024 Vishawjeet. All rights reserved.
        </p>
        <p className="text-gray-600 text-sm">
          Bathinda, Punjab, India
        </p>
      </div>
    </div>
  </div>
)};

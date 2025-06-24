import React from 'react';
import { X } from 'lucide-react';

const ApplicationDetailModal = ({ application, onClose }) => {
  if (!application) return null;

  const { investorId, investmentId, investorProfile, paymentDetails, contactDetails } = application;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold mb-4">Application Details</h2>

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Investor:</p>
              <p>{investorId?.firstName} {investorId?.lastName}</p>
              <p>Email: {investorId?.email}</p>
            </div>

            <div>
              <p className="font-semibold">Investment Plan:</p>
              <p>{investmentId?.title}</p>
              <p>{investmentId?.description}</p>
              <p>Location: {investmentId?.location}</p>
              <p>ROI: {investmentId?.roi}%</p>
              <p>Duration: {investmentId?.durationMonths} months</p>
              <p>Amount Required: ${investmentId?.amountRequired?.toLocaleString()}</p>
            </div>

            <div>
              <p className="font-semibold">Investor Profile:</p>
              <p>Company: {investorProfile?.companyName}</p>
              <p>Focus: {investorProfile?.investmentFocus}</p>
              <p>Contact: {investorProfile?.contactEmail}</p>
              <p>Portfolio Size: {investorProfile?.portfolioSize}</p>
            </div>

            <div>
              <p className="font-semibold">Payment Details:</p>
              <p>Name: {paymentDetails?.mobileName}</p>
              <p>Number: {paymentDetails?.mobileNumber}</p>
            </div>

            <div>
              <p className="font-semibold">Contact Details:</p>
              <p>Phone: {contactDetails?.phone}</p>
              <p>Email: {contactDetails?.email}</p>
              <p>Address: {contactDetails?.address}</p>
            </div>

            <div>
              <p className="font-semibold">Status:</p>
              <p className="capitalize">{application.status}</p>
              {application.rejectionReason && (
                <p className="text-red-600">Reason: {application.rejectionReason}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ApplicationDetailModal;

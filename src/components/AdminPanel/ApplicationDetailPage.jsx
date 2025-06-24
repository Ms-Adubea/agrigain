import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGetInvestorApplications } from '../../services/admin';
import { ArrowLeft, Loader2 } from 'lucide-react';

const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const all = await apiGetInvestorApplications();
        const found = all.find(app => app._id === id);
        setApplication(found);
      } catch (err) {
        console.error('Failed to load application:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-10 text-red-600">
        Application not found.
      </div>
    );
  }

  const { investorId, investmentId, principal, status, paymentDetails, contactDetails, nextOfKin, createdAt } = application;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Applications
      </button>

      <h2 className="text-2xl font-bold mb-4">Application Details</h2>

      <div className="bg-white p-6 rounded shadow-sm border space-y-4">
        <div>
          <h4 className="font-semibold text-gray-700">Investor Info</h4>
          <p><strong>Name:</strong> {investorId.firstName} {investorId.lastName}</p>
          <p><strong>Email:</strong> {investorId.email}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700">Investment</h4>
          <p><strong>Title:</strong> {investmentId.title}</p>
          <p><strong>ROI:</strong> {investmentId.roi}%</p>
          <p><strong>Location:</strong> {investmentId.location}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700">Payment & Contact</h4>
          <p><strong>Principal:</strong> ${principal}</p>
          <p><strong>Payment Method:</strong> {application.paymentMethod}</p>
          <p><strong>Mobile Name:</strong> {paymentDetails.mobileName}</p>
          <p><strong>Mobile Number:</strong> {paymentDetails.mobileNumber}</p>
          <p><strong>Phone:</strong> {contactDetails.phone}</p>
          <p><strong>Address:</strong> {contactDetails.address}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700">Additional</h4>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Next of Kin:</strong> {nextOfKin}</p>
          <p><strong>Submitted At:</strong> {new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;

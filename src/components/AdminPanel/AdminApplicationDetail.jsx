// components/AdminPanel/AdminApplicationDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetInvestorApplications, apiUpdateApplication } from '../../services/admin';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AdminApplicationDetail = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const data = await apiGetInvestorApplications();
        const found = data.find((item) => item._id === id);
        setApplication(found);
      } catch (err) {
        console.error('Error fetching application:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await apiUpdateApplication(id, { status: newStatus });
      setApplication((prev) => ({ ...prev, status: newStatus }));
      setNotification({ type: 'success', message: `Marked as ${newStatus}` });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error(err);
      setNotification({ type: 'error', message: `Failed to update status` });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  if (loading) {
    return <div className="p-6 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  if (!application) {
    return <div className="p-6 text-center text-red-500">Application not found</div>;
  }

  const { investorId, investmentId, principal, status, paymentDetails, contactDetails, investorProfile } = application;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow border">
      <h2 className="text-2xl font-bold mb-4">Application Details</h2>

      {notification && (
        <div className={`mb-4 p-3 rounded text-sm ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {notification.message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Investor</h3>
          <p>{investorId?.firstName} {investorId?.lastName}</p>
          <p>{investorId?.email}</p>
        </div>

        <div>
          <h3 className="font-semibold">Investment</h3>
          <p>{investmentId?.title}</p>
          <p>{investmentId?.description}</p>
          <p>Location: {investmentId?.location}</p>
        </div>

        <div>
          <h3 className="font-semibold">Principal</h3>
          <p>${principal.toLocaleString()}</p>
        </div>

        <div>
          <h3 className="font-semibold">Status</h3>
          <p className={`capitalize font-medium ${status === 'approved' ? 'text-green-600' : status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
            {status}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <p>{contactDetails?.email}</p>
          <p>{contactDetails?.phone}</p>
          <p>{contactDetails?.address}</p>
        </div>

        <div className="flex gap-4 mt-6">
          {status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusUpdate('approved')}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate('rejected')}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationDetail;

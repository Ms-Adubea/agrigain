// components/TeamModal.jsx
import { X } from "lucide-react";

const TeamModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full relative shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={member.image}
            alt={member.name}
            className="w-48 h-48 object-cover rounded-full border-4 border-green-200"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
            <p className="text-green-700 font-medium mb-4">{member.role}</p>
            <p className="text-gray-700">{member.description}</p>
            <p className="text-gray-700">{member.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;

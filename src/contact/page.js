import React, { useState } from 'react';

const contactData = {
  indianGuests: {
    phone1: '1800 22 7979',
    phone2: '1800 313 5555',
    email: 'travel@veenaworld.com',
  },
  foreignNationals: {
    phone: '+91 915 200 4511',
    email: 'inbound@veenaworld.com',
  },
};

const offices = [
  {
    id: 1,
    name: 'Ahmedabad',
    address: '4, Anam 1, Commercial Co. Op. Service Society Ltd, Opp. Parimal Garden, Ambawadi, Ahmedabad- 380006, Gujarat',
    phone: '+91 8879977200',
    status: 'OPEN',
    salesOffice: true,
    forexAvailable: true,
    temporarilyClosed: false,
    closureNote: '',
  },
  {
    id: 2,
    name: 'Airoli',
    address: 'Shop no. 11 ground floor, Someshwar, Sector 8 Plot no. 5 Airoli, Navi Mumbai- 400708, Maharashtra',
    phone: '+91 8879979200',
    status: 'OPEN',
    salesOffice: true,
    forexAvailable: false,
    temporarilyClosed: false,
    closureNote: '',
  },
  {
    id: 3,
    name: 'Andheri',
    address: 'Suvidha Square, Next to St. Blases Church, CTS no. 13, Caesar Road, Amboli Naka, Andheri (W), Mumbai- 400058, Maharashtra',
    phone: '+91 8879972216',
    status: 'TEMPORARILY CLOSED',
    salesOffice: true,
    forexAvailable: true,
    temporarilyClosed: true,
    closureNote: 'Andheri office will be closed till 5th Aug 2025 for renovation work. For any queries, kindly contact on the above-mentioned number or visit nearby offices at Vile Parle or Versova.',
  },
  // Add more offices as needed
];

const ContactInfo = () => (
  <section className="bg-[#1a2e66] text-white p-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold border-b-4 border-yellow-400 inline-block pb-1">Contact Us Today!</h2>
      <div className="mt-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">For Indian Guests</h3>
          <p className="flex items-center gap-2"><span>📞</span><strong>{contactData.indianGuests.phone1}, {contactData.indianGuests.phone2}</strong></p>
          <p className="flex items-center gap-2"><span>✉️</span><strong>{contactData.indianGuests.email}</strong></p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">For Foreign Nationals/NRIs travelling to India</h3>
          <p className="flex items-center gap-2"><span>📞</span><strong>{contactData.foreignNationals.phone}</strong></p>
          <p className="flex items-center gap-2"><span>✉️</span><strong>{contactData.foreignNationals.email}</strong></p>
        </div>
      </div>
    </div>
    <CallbackRequestForm />
  </section>
);

const CallbackRequestForm = () => {
  const [fullName, setFullName] = useState('');
  const [phoneCode, setPhoneCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Request Call Back submitted for ${fullName} with phone ${phoneCode} ${phoneNumber}`);
    setFullName('');
    setPhoneCode('+91');
    setPhoneNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Full Name*"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded-md min-w-[200px]"
      />
      <select
        value={phoneCode}
        onChange={(e) => setPhoneCode(e.target.value)}
        className="p-2 border border-gray-300 rounded-md max-w-[80px]"
      >
        <option value="+91">🇮🇳 +91</option>
        <option value="+1">🇺🇸 +1</option>
        <option value="+44">🇬🇧 +44</option>
      </select>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded-md min-w-[150px]"
      />
      <button
        type="submit"
        className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-yellow-500 transition"
      >
        <span>📞</span> Request Call Back
      </button>
    </form>
  );
};

const OfficeLocation = ({ office }) => (
  <div className="bg-white rounded-lg p-6 mb-6 shadow-md relative">
    <div className="flex justify-between items-center mb-2">
      <div className="flex gap-2 items-center">
        {office.salesOffice && <span className="bg-purple-700 text-white px-2 py-0.5 rounded text-xs font-bold">SALES OFFICE</span>}
        {office.forexAvailable && <span className="bg-yellow-200 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">FOREX Available</span>}
      </div>
      <div className="flex gap-4 text-gray-600 text-sm">
        <button title="Get Directions" className="hover:underline cursor-pointer">📍 Get Directions</button>
        <button title="Share" className="hover:underline cursor-pointer">🔗 Share</button>
      </div>
    </div>
    <h3 className="text-lg font-semibold mb-1">
      {office.name}{' '}
      <span className={`font-bold ${office.temporarilyClosed ? 'text-red-600' : 'text-green-600'}`}>
        {office.status}
      </span>
    </h3>
    <p className={`${office.temporarilyClosed ? 'text-gray-400' : 'text-gray-800'} mb-4`}>{office.address}</p>
    <div className="flex gap-4 items-center">
      <button
        disabled={office.temporarilyClosed}
        className={`px-4 py-2 rounded ${office.temporarilyClosed ? 'bg-yellow-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 text-black hover:bg-yellow-500'}`}
      >
        Office Details
      </button>
      <a
        href={`tel:${office.phone}`}
        className={`px-4 py-2 rounded bg-blue-200 text-blue-800 hover:bg-blue-300`}
      >
        📞 {office.phone}
      </a>
    </div>
    {office.temporarilyClosed && (
      <p className="mt-4 p-2 bg-red-100 text-red-700 rounded text-sm">{office.closureNote}</p>
    )}
  </div>
);

const EnquiryPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Enquiry submitted:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`);
    setFormData({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Quick Enquiry</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow overflow-auto">
          <input
            type="text"
            name="name"
            placeholder="Full Name*"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number*"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="p-2 border border-gray-300 rounded resize-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

const QuickEnquiryButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-10 right-10 bg-yellow-400 text-black px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-yellow-500 transition z-50"
  >
    <span className="text-xl">✏️</span> Quick Enquiry
  </button>
);

const ContactPage = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const toggleEnquiry = () => {
    setIsEnquiryOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ContactInfo />
      <main className="max-w-6xl mx-auto p-6">
        <section>
          {offices.map((office) => (
            <OfficeLocation key={office.id} office={office} />
          ))}
        </section>
      </main>
      <QuickEnquiryButton onClick={toggleEnquiry} />
      <EnquiryPopup isOpen={isEnquiryOpen} onClose={toggleEnquiry} />
    </div>
  );
};

export default ContactPage;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPublicColorTheme, getPublicWebsiteSettings } from '../redux/slice/publicApiSlice';

const fallbackWebsiteSettings = {
  companyName: 'Weekly Travel Portal',
  phoneNumber: '+91 9876543210',
  emailId: 'info@weeklytravel.com',
  whatsappNumber: '+91 9876543210',
  gstNumber: '29ABCDE1234F1Z5',
  officeAddress: {
    officeNo: '123',
    buildingName: 'Travel Plaza',
    streetName: 'MG Road',
    location: 'City Center',
    district: 'Central District',
    city: 'Mumbai',
    pin: '400001'
  },
  branchAddresses: [
    {
      officeNo: '456',
      buildingName: 'Branch Tower',
      streetName: 'Park Street',
      location: 'Business District',
      district: 'South District',
      city: 'Delhi',
      pin: '110001'
    }
  ],
  supportContacts: [
    { type: 'Customer Support', contact: '+91 9876543210' },
    { type: 'Emergency', contact: '+91 9876543211' }
  ]
};

const Footer = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.publicApi.colorTheme) || {};
  const websiteSettings = useSelector((state) => state.publicApi.websiteSettings) || fallbackWebsiteSettings;

  useEffect(() => {
    dispatch(getPublicColorTheme());
    dispatch(getPublicWebsiteSettings());
  }, [dispatch]);

  const settings = websiteSettings.result || websiteSettings || fallbackWebsiteSettings;

  return (
    <footer className="py-12 px-4" style={{ backgroundColor: theme.footerBgColor || '#343a40', color: theme.footerTextColor || '#ffffff' }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Company: {settings.companyName}</li>
              <li>Phone: {settings.phoneNumber}</li>
              <li>Email: {settings.emailId}</li>
              <li>WhatsApp: {settings.whatsappNumber}</li>
              <li>GST: {settings.gstNumber}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Office Address</h3>
            <ul className="space-y-2">
              <li>{settings.officeAddress.officeNo}, {settings.officeAddress.buildingName}</li>
              <li>{settings.officeAddress.streetName}, {settings.officeAddress.location}</li>
              <li>{settings.officeAddress.district}, {settings.officeAddress.city} - {settings.officeAddress.pin}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Branch Address</h3>
            <ul className="space-y-2">
              {settings.branchAddresses && settings.branchAddresses.map((branch, idx) => (
                <li key={idx}>{branch.officeNo}, {branch.buildingName}, {branch.streetName}, {branch.location}, {branch.district}, {branch.city} - {branch.pin}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Support Contacts</h3>
            <ul className="space-y-2">
              {settings.supportContacts && settings.supportContacts.map((contact, idx) => (
                <li key={idx}>{contact.type}: {contact.contact}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center">
          <p>
            © Copyright {settings.companyName} {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

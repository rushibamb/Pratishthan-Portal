import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDonationInfo } from '../services/api';
import logo from '../assets/logo_f.jpg';

const DonationPage = ({ language }) => {
  const [donationInfo, setDonationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const fetchDonationInfo = async () => {
      try {
        const { data } = await getDonationInfo();
        setDonationInfo(data);
      } catch (err) {
        setError('Failed to fetch donation information.');
      } finally {
        setLoading(false);
      }
    };

    fetchDonationInfo();
  }, []);

  // Function to show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  // Function to handle QR code click
  const handleQRCodeClick = () => {
    if (donationInfo?.qrCodeUrl) {
      // Check if we're on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // On mobile, try to open the QR code in a new tab or download it
        const link = document.createElement('a');
        link.href = donationInfo.qrCodeUrl;
        link.download = 'donation-qr-code.png';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(language === 'english' ? 'QR code opened in new tab' : 'QR कोड नवीन टॅबमध्ये उघडले', 'success');
      } else {
        // On desktop, open in a new tab for better viewing
        window.open(donationInfo.qrCodeUrl, '_blank', 'noopener,noreferrer');
        showToast(language === 'english' ? 'QR code opened in new tab' : 'QR कोड नवीन टॅबमध्ये उघडले', 'success');
      }
    }
  };

  // Function to handle UPI ID click
  const handleUPIClick = () => {
    if (donationInfo?.upiId) {
      const upiId = donationInfo.upiId;
      
      // Check if we're on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Mobile-specific UPI handling
        const upiSchemes = [
          `upi://pay?pa=${upiId}&pn=Mandal&tn=Donation`,
          `googlepay://upi/pay?pa=${upiId}&pn=Mandal&tn=Donation`,
          `phonepe://pay?pa=${upiId}&pn=Mandal&tn=Donation`,
          `paytm://upi/pay?pa=${upiId}&pn=Mandal&tn=Donation`,
          `bhim://upi/pay?pa=${upiId}&pn=Mandal&tn=Donation`,
          `amazonpay://upi/pay?pa=${upiId}&pn=Mandal&tn=Donation`,
          `whatsapp://send?text=Pay to ${upiId} for Mandal donation`
        ];

        // Try to open UPI apps with a more sophisticated approach
        let appOpened = false;
        
        const tryOpenApp = (scheme, index) => {
          if (appOpened) return;
          
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = scheme;
            link.style.display = 'none';
            document.body.appendChild(link);
            
            // Add event listener to detect if app opened
            const timeout = setTimeout(() => {
              if (!appOpened) {
                // If no app opened, try the next one
                if (index < upiSchemes.length - 1) {
                  tryOpenApp(upiSchemes[index + 1], index + 1);
                } else {
                  // If all apps failed, copy to clipboard
                  copyUPIToClipboard(upiId);
                }
              }
            }, 2000);
            
            link.addEventListener('click', () => {
              appOpened = true;
              clearTimeout(timeout);
            });
            
            link.click();
            document.body.removeChild(link);
          }, index * 500);
        };

        // Start with the first app
        tryOpenApp(upiSchemes[0], 0);
        showToast(language === 'english' ? 'Opening payment apps...' : 'पेमेंट ऍप्स उघडत आहेत...', 'info');
        
      } else {
        // Desktop fallback - copy to clipboard
        copyUPIToClipboard(upiId);
      }
    }
  };

  // Function to copy UPI ID to clipboard
  const copyUPIToClipboard = (upiId) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId).then(() => {
        showToast(language === 'english' 
          ? `UPI ID ${upiId} copied to clipboard!` 
          : `UPI ID ${upiId} क्लिपबोर्डवर कॉपी केले!`, 'success');
      }).catch(() => {
        // Fallback for clipboard API failure
        fallbackCopyToClipboard(upiId);
      });
    } else {
      // Fallback for older browsers
      fallbackCopyToClipboard(upiId);
    }
  };

  // Fallback copy function for older browsers
  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showToast(language === 'english' 
        ? `UPI ID ${text} copied to clipboard!` 
        : `UPI ID ${text} क्लिपबोर्डवर कॉपी केले!`, 'success');
    } catch (err) {
      showToast(language === 'english' 
        ? `Please manually copy the UPI ID: ${text}` 
        : `कृपया UPI ID मॅन्युअली कॉपी करा: ${text}`, 'error');
    }
    
    document.body.removeChild(textArea);
  };

  // Function to copy bank details
  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(language === 'english' 
          ? `${label} copied to clipboard!` 
          : `${label} क्लिपबोर्डवर कॉपी केले!`, 'success');
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(language === 'english' 
        ? `${label} copied to clipboard!` 
        : `${label} क्लिपबोर्डवर कॉपी केले!`, 'success');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-yellow-600 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-yellow-400/30 rounded-full flex items-center justify-center">
            <i className="ri-heart-line text-3xl text-yellow-200"></i>
          </div>
          <div className="text-yellow-200 text-xl font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-yellow-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-200 text-xl font-medium">{error}</div>
          <Link to="/" className="mt-4 inline-block text-yellow-200 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-yellow-600">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 
          toast.type === 'error' ? 'bg-red-500 text-white' : 
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center">
            <i className={`mr-2 ${
              toast.type === 'success' ? 'ri-check-line' : 
              toast.type === 'error' ? 'ri-error-warning-line' : 
              'ri-information-line'
            }`}></i>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 text-yellow-200 hover:text-yellow-300 transition-colors">
              <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
              <span className="text-xl font-bold">Mandal</span>
            </Link>
            <Link 
              to="/" 
              className="px-6 py-2 bg-yellow-500 text-orange-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/20 rounded-full flex items-center justify-center">
            <i className="ri-heart-line text-4xl text-yellow-200"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-200 mb-4">
            {donationInfo?.title || 'Donation for Vergani'}
          </h1>
          <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
            {donationInfo?.description?.[language] || 'Support our cause by making a donation'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code Section */}
          {donationInfo?.qrCodeUrl && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-yellow-200 mb-6 text-center">
                {language === 'english' ? 'Scan QR Code' : 'QR कोड स्कॅन करा'}
              </h2>
              <div className="flex justify-center">
                <div 
                  className="bg-white p-4 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-200 hover:shadow-2xl"
                  onClick={handleQRCodeClick}
                  title={language === 'english' ? 'Click to open QR code' : 'QR कोड उघडण्यासाठी क्लिक करा'}
                >
                  <img 
                    src={donationInfo.qrCodeUrl} 
                    alt="QR Code" 
                    className="w-48 h-48 object-contain"
                  />
                  <div className="text-center mt-2">
                    <i className="ri-external-link-line text-blue-600 text-lg"></i>
                    <span className="text-blue-600 text-sm ml-1">
                      {language === 'english' ? 'Click to open' : 'उघडण्यासाठी क्लिक करा'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-yellow-100 mt-4">
                {language === 'english' 
                  ? 'Click the QR code to open it in full size, or scan it with your payment app' 
                  : 'QR कोड उघडण्यासाठी क्लिक करा किंवा आपल्या पेमेंट ऍपने स्कॅन करा'
                }
              </p>
            </div>
          )}

          {/* UPI ID Section - Order 1 on mobile, Order 2 on desktop */}
          {donationInfo?.upiId && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 order-1 md:order-2">
              <h2 className="text-2xl font-bold text-yellow-200 mb-6 text-center">
                {language === 'english' ? 'UPI Payment' : 'UPI पेमेंट'}
              </h2>
              <div className="text-center">
                <div 
                  className="bg-yellow-400/20 rounded-lg p-4 mb-4 cursor-pointer transform hover:scale-105 transition-transform duration-200 hover:bg-yellow-400/30"
                  onClick={handleUPIClick}
                  title={language === 'english' ? 'Click to open UPI apps' : 'UPI ऍप्स उघडण्यासाठी क्लिक करा'}
                >
                  <span className="text-yellow-200 font-medium">
                    {language === 'english' ? 'UPI ID' : 'UPI ID'}
                  </span>
                  <div className="text-2xl font-bold text-yellow-200 mt-2 flex items-center justify-center">
                    {donationInfo.upiId}
                    <i className="ri-external-link-line ml-2 text-lg"></i>
                  </div>
                  <div className="text-yellow-100 text-sm mt-2">
                    {language === 'english' ? 'Click to open payment apps' : 'पेमेंट ऍप्स उघडण्यासाठी क्लिक करा'}
                  </div>
                </div>
                <p className="text-yellow-100">
                  {language === 'english' 
                    ? 'Click the UPI ID to open payment apps or copy to clipboard' 
                    : 'UPI ID वर क्लिक करून पेमेंट ऍप्स उघडा किंवा क्लिपबोर्डवर कॉपी करा'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Bank Details Section - Order 2 on mobile, Order 1 on desktop */}
          {donationInfo?.bankDetails && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 order-2 md:order-1">
              <h2 className="text-2xl font-bold text-yellow-200 mb-6 text-center">
                {language === 'english' ? 'Bank Details' : 'बँक तपशील'}
              </h2>
              <div className="space-y-4">
                {donationInfo.bankDetails.accountName && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-yellow-100 font-medium">
                      {language === 'english' ? 'Account Name' : 'खातेदाराचे नाव'}
                    </span>
                    <span 
                      className="text-yellow-200 font-semibold cursor-pointer hover:text-yellow-300 transition-colors"
                      onClick={() => copyToClipboard(donationInfo.bankDetails.accountName, 'Account Name')}
                      title={language === 'english' ? 'Click to copy' : 'कॉपी करण्यासाठी क्लिक करा'}
                    >
                      {donationInfo.bankDetails.accountName}
                      <i className="ri-copy-line ml-2 text-sm"></i>
                    </span>
                  </div>
                )}
                {donationInfo.bankDetails.accountNumber && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-yellow-100 font-medium">
                      {language === 'english' ? 'Account Number' : 'खाते क्रमांक'}
                    </span>
                    <span 
                      className="text-yellow-200 font-semibold cursor-pointer hover:text-yellow-300 transition-colors"
                      onClick={() => copyToClipboard(donationInfo.bankDetails.accountNumber, 'Account Number')}
                      title={language === 'english' ? 'Click to copy' : 'कॉपी करण्यासाठी क्लिक करा'}
                    >
                      {donationInfo.bankDetails.accountNumber}
                      <i className="ri-copy-line ml-2 text-sm"></i>
                    </span>
                  </div>
                )}
                {donationInfo.bankDetails.ifscCode && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-yellow-100 font-medium">
                      {language === 'english' ? 'IFSC Code' : 'IFSC कोड'}
                    </span>
                    <span 
                      className="text-yellow-200 font-semibold cursor-pointer hover:text-yellow-300 transition-colors"
                      onClick={() => copyToClipboard(donationInfo.bankDetails.ifscCode, 'IFSC Code')}
                      title={language === 'english' ? 'Click to copy' : 'कॉपी करण्यासाठी क्लिक करा'}
                    >
                      {donationInfo.bankDetails.ifscCode}
                      <i className="ri-copy-line ml-2 text-sm"></i>
                    </span>
                  </div>
                )}
                {donationInfo.bankDetails.bankName && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-yellow-100 font-medium">
                      {language === 'english' ? 'Bank Name' : 'बँकेचे नाव'}
                    </span>
                    <span 
                      className="text-yellow-200 font-semibold cursor-pointer hover:text-yellow-300 transition-colors"
                      onClick={() => copyToClipboard(donationInfo.bankDetails.bankName, 'Bank Name')}
                      title={language === 'english' ? 'Click to copy' : 'कॉपी करण्यासाठी क्लिक करा'}
                    >
                      {donationInfo.bankDetails.bankName}
                      <i className="ri-copy-line ml-2 text-sm"></i>
                    </span>
                  </div>
                )}
                {donationInfo.bankDetails.branch && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-yellow-100 font-medium">
                      {language === 'english' ? 'Branch' : 'शाखा'}
                    </span>
                    <span 
                      className="text-yellow-200 font-semibold cursor-pointer hover:text-yellow-300 transition-colors"
                      onClick={() => copyToClipboard(donationInfo.bankDetails.branch, 'Branch')}
                      title={language === 'english' ? 'Click to copy' : 'कॉपी करण्यासाठी क्लिक करा'}
                    >
                      {donationInfo.bankDetails.branch}
                      <i className="ri-copy-line ml-2 text-sm"></i>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-yellow-200 mb-4">
              {language === 'english' ? 'Thank You for Your Support' : 'आपल्या पाठिंब्याबद्दल धन्यवाद'}
            </h3>
            <p className="text-yellow-100 text-lg">
              {language === 'english' 
                ? 'Your donation helps us continue our mission and serve the community better.' 
                : 'आपले दान आम्हाला आमचे ध्येय सुरू ठेवण्यास आणि समुदायाला चांगल्या प्रकारे सेवा करण्यास मदत करते.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
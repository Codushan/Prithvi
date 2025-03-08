"use client"
import { Suspense } from "react";
import { useState } from 'react';
import styles from './RegistrationForm.module.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

function RegistrationFormContent({ onBackToEvents }) {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || 'Default Topic';
  const event = searchParams.get('event');
  
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
    instituteId: '',
    instituteName: '',
  });
  
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [currentStep, setCurrentStep] = useState('details'); // Missing state declaration
  const [isSubmitting, setIsSubmitting] = useState(false); // Missing state declaration
  const [paymentStatus, setPaymentStatus] = useState(false);
  
  const router = useRouter();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPaymentScreenshot(file);
      setPaymentStatus(true);
      alert("Payment proof uploaded successfully!");
    } else {
      alert("Please upload a valid image file.");
      setPaymentScreenshot(null);
      setPaymentStatus(false);
    }
  };
  
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobileNumber) {
      alert("Please fill out all required fields!");
      return;
    }
    
    if (formData.mobileNumber === formData.whatsappNumber) {
      alert("Primary and alternate numbers should be different.");
      return;
    }
    
    setCurrentStep('payment');
  };
  
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!paymentStatus) {
      alert("Please upload payment proof before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("email", formData.email);
      submitFormData.append("mobileNumber", formData.mobileNumber);
      submitFormData.append("whatsappNumber", formData.whatsappNumber);
      submitFormData.append("instituteId", formData.instituteId);
      submitFormData.append("instituteName", formData.instituteName);
      submitFormData.append("paymentProof", paymentScreenshot);
      
      const res = await axios.post(`/api/submit/${topic}`, submitFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (res.status === 200) {
        setFormData({
          name: '',
          rollNumber: '',
          email: '',
          mobileNumber: '',
          whatsappNumber: '',
          instituteId: '',
          instituteName: '',
        });
        setPaymentScreenshot(null);
        setCurrentStep('details');
        setPaymentStatus(false);
        setIsSubmitting(false);
        
        alert('Registration successful! Thank you for registering for Prithvi\'25.');
        
        router.push('/');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('Error submitting form. Please try again.');
    }
  };
  
  return (
    <div className={styles.registrationContainer}>
      <Navbar/>
      <div className={styles.formWrapper}>
        {/* Left side (event details) - will be top on mobile */}
        <div className={styles.eventDetails}>
          <div className={styles.eventPoster}>
            <div className={styles.posterInner}>
              <div className={styles.bridgeDecoration}>
                <div className={styles.bridge}>
                  <div className={styles.bridgePillar}></div>
                  <div className={styles.bridgeSpan}></div>
                  <div className={styles.bridgePillar}></div>
                </div>
              </div>
              <h3 className={styles.eventType}>{event}</h3>
            </div>
          </div>
          
          <h2 className={styles.eventName}>{topic}</h2>
          
          <p className={styles.eventDescription}>
            Learn advanced techniques in structural design from industry experts.
          </p>
          
          <div className={styles.contactInfo}>
            <h4>Contact Details:</h4>
            <p>
              Dr. Rajesh Kumar: +91 9876543210
            </p>
          </div>
          
          <div className={styles.guidelines}>
            <h4>Guidelines:</h4>
            <ul>
              {[
                'Bring your laptop with AutoCAD installed',
                'Basic knowledge of structural engineering required',
                'Duration: 3 hours',
                'Certificate will be provided'
              ].map((guideline, index) => (
                <li key={index}>{guideline}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.registrationFee}>
            <h4>Registration Fee:</h4>
            <p>₹500</p>
          </div>
        </div>
        
        {/* Right side (form) - will be bottom on mobile */}
        <div className={styles.formSection}>
          {currentStep === 'details' ? (
            <form onSubmit={handleDetailsSubmit} className={styles.registrationForm}>
              <h3 className={styles.formTitle}>Registration Details</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="rollNumber">Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your roll number"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="whatsappNumber">WhatsApp Number</label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your WhatsApp number"
                  pattern="[0-9]{10}"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="instituteId">Institute ID</label>
                <input
                  type="text"
                  id="instituteId"
                  name="instituteId"
                  value={formData.instituteId}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your institute ID"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="instituteName">Institute Name</label>
                <input
                  type="text"
                  id="instituteName"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  placeholder="Enter your institute name"
                />
              </div>
              
              <button type="submit" className={styles.payButton}>
                Proceed to Payment
              </button>
              
              <button 
                type="button" 
                className={styles.backButton}
                onClick={onBackToEvents}
              >
                Back to Events
              </button>
            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
              <h3 className={styles.formTitle}>Payment Details</h3>
              
              <div className={styles.qrCodeContainer}>
                <div className={styles.qrCode}>
                  <div className={styles.qrInner}>
                    <div className={styles.qrPattern}></div>
                  </div>
                </div>
                <p className={styles.scanText}>Scan to pay ₹500</p>
                <p className={styles.upiId}>UPI: prithvi25@ybl</p>
              </div>
              
              <div className={styles.formGroup}>
                
                {paymentScreenshot && (
                  <div className={styles.fileInputLabel}>
                    {paymentScreenshot.name}
                  </div>
                )}
                {!paymentScreenshot && (
                  <div className={styles.fileInputLabel}>
                    <label htmlFor="paymentScreenshot">choose file</label>
                <input
                  type="file"
                  id="paymentScreenshot"
                  name="paymentScreenshot"
                  onChange={handleFileChange}
                  required
                  accept="image/*"
                  className={styles.fileInput}
                />
                  </div>
                )}
              </div>
              
              {paymentStatus && (
                <button 
                  type="submit" 
                  className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                </button>
              )}
              
              {!paymentStatus && (
                <button 
                  type="button" 
                  className={styles.submitButton}
                  onClick={() => alert("Please upload payment proof before submitting.")}
                >
                  Complete Registration
                </button>
              )}
              
              <button 
                type="button" 
                className={styles.backButton}
                onClick={() => setCurrentStep('details')}
                disabled={isSubmitting}
              >
                Back to Details
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const RegistrationForm = ({ onBackToEvents }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationFormContent onBackToEvents={onBackToEvents} />
    </Suspense>
  );
};

export default RegistrationForm;
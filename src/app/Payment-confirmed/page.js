"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/app/Payment-confirmed/paymentConfirmed.module.css"



export default function PaymentConfirmation() {
  const router = useRouter();
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmationId, setConfirmationId] = useState("");

  useEffect(() => {
    try {
      const registrationData = sessionStorage.getItem('registrationData');
      
      if (registrationData) {
        const parsedRegistration = JSON.parse(registrationData);
        const uniqueId = generateConfirmationId();
        setConfirmationId(uniqueId);
        
        setReceiptData({
          ...parsedRegistration,
          confirmationId: uniqueId,
          paymentDate: new Date().toLocaleDateString(),
          paymentTime: new Date().toLocaleTimeString(),
        });
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error retrieving registration data:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);
  const generateConfirmationId = () => {
    const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    return `PRITHVI-${randomString}-${timestamp}`;
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  const handleBackToHome = () => {
    sessionStorage.removeItem('registrationData');
    router.push('/');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Generating your confirmation receipt...</p>
      </div>
    );
  }

  if (!receiptData) {
    return (
      <div className={styles.errorContainer}>
        <h2>No registration data found</h2>
        <p>Please complete the registration process first.</p>
        <button onClick={() => router.push('/')} className={styles.backButton}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.confirmationContainer}>
      
      
      <div className={styles.receiptWrapper} id="receipt-for-print">
        <div className={styles.receiptHeader}>
          <div className={styles.logoContainer}>
            <img src="/prithvib.png" alt="Prithvi Logo" className={styles.logo} />
          </div>
          <div className={styles.receiptTitle}>
            <h1>Registration Confirmation</h1>
            <p className={styles.receiptSubtitle}>Prithvi'25</p>
          </div>
        </div>
        
        <div className={styles.receiptBody}>
          <div className={styles.confirmationMessage}>
            <div className={styles.checkmarkIcon}>✓</div>
            <h2>Payment Successful!</h2>
            <p>Your registration has been confirmed.</p>
          </div>
          
          <div className={styles.receiptDetails}>
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Confirmation ID:</span>
              <span className={styles.receiptValue}>{confirmationId}</span>
            </div>
            
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Date & Time:</span>
              <span className={styles.receiptValue}>{receiptData.paymentDate} at {receiptData.paymentTime}</span>
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Event:</span>
              <span className={styles.receiptValue}>{receiptData.event}</span>
            </div>
            
            
            
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Amount Paid:</span>
              <span className={styles.receiptValue}>₹{receiptData.newfee|| receiptData.money || '600'}</span>
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Name:</span>
              <span className={styles.receiptValue}>{receiptData.name}</span>
            </div>
            
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Email:</span>
              <span className={styles.receiptValue}>{receiptData.email}</span>
            </div>
            
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Mobile Number:</span>
              <span className={styles.receiptValue}>{receiptData.mobileNumber}</span>
            </div>
            
            <div className={styles.receiptRow}>
              <span className={styles.receiptLabel}>Institute:</span>
              <span className={styles.receiptValue}>{receiptData.instituteName}</span>
            </div>
          </div>
          
          <div className={styles.noteSection}>
            <p className={styles.note}>Please keep this confirmation for your records. You may be asked to show this at the venue.</p>
            <p className={styles.note}>For any queries, please contact the event coordinator.</p>
          </div>
        </div>
        
        <div className={styles.receiptFooter}>
          <div className={styles.footerText}>
            <p>Prithvi'25 - Department of Civil Engineering, NIT Calicut</p>
          </div>
        </div>
      </div>
      
      <div className={styles.actionButtons}>
        <button onClick={handleDownloadReceipt} className={styles.downloadButton}>
          Download Receipt
        </button>
        <button onClick={handleBackToHome} className={styles.homeButton}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
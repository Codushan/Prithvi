"use client"
import { Suspense } from "react";
import { useState, useEffect } from 'react';
import styles from '@/app/RegistrationForm/RegistrationForm.module.css';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import competitions from '@/app/Data/competitions.js';
import workshops from '@/app/Data/workshops.js';


function RegistrationFormContent() {
  const params = useParams();
  const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
    instituteId: '',
    instituteName: '',
  });
  
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [currentStep, setCurrentStep] = useState('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const { type, id } = params;
  
  useEffect(() => {
    let data = null;
    
    if (type === 'workshop') {
      const workshop = workshops.find(w => w.id.toString() === id);
      
      if (workshop) {
        data = {
          topic: workshop.title,
          event: 'Workshop',
          description: workshop.description,
          money: '600', 
        };
      }
    } else if (type === 'competition') {
    
      const competition = competitions.find(c => c.id.toString() === id || c.slug === id);
      
      if (competition) {
        data = {
          topic: competition.title,
          event: 'Competition',
          description: competition.description,
          money: competition.regfee || '99',
        };
      }
    }
    
    if (data) {
      setEventData(data);
    } else {
      router.push('/');
    }
  }, [params, router, type, id]);

  const onBackToEvents = () => {
    router.push('/')
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPaymentScreenshot(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setPaymentStatus(true);
        alert("Payment proof uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
      setPaymentScreenshot(null);
      setImagePreview(null);
      setPaymentStatus(false);
    }
  };
  
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobileNumber) {
      alert("Please fill out all required fields!");
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
      
      if (eventData && eventData.topic) {
        const res = await axios.post(`/api/submit/${eventData.topic}`, submitFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        if (res.status === 200) {
          setFormData({
            name: '',
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
          setImagePreview(null);
          
          alert('Registration successful! Thank you for registering for Prithvi\'25.');
          
          router.push('/');
        } else {
          throw new Error('Form submission failed');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleResubmission = () => {
    setPaymentScreenshot(null);
    setImagePreview(null);
    setPaymentStatus(false);

    const fileInput = document.getElementById('paymentScreenshot');
    if (fileInput) {
      fileInput.value = '';
    }
  };
  
  if (!eventData) {
    return <div>Loading...</div>;
  }

  const topic = eventData.topic;
  const event = eventData.event;
  const description = eventData.description;
  const money = eventData.money;
  
  const infa = [
    'Individual participations and teams up to 3 members are allowed. (Cross-college teams are allowed).',
    'The topic should be innovative and futuristically civil engineering-related.',
    'Participant can have their Poster presentation, PPTs, video, and prototypes (Posters are mandatory. Videos, PPTs and prototypes are not compulsory, but encouraged).',
    'If needed, Participants should bring their laptops for PPTs and video presentations.',
    'The participants should be at the venue from 11 am to 3 pm.',
    'The call of the judges will be final.',
    'Further instructions will be given at the venue.'
  ]

  const mm = [
    'Participants are to form teams of 3–4 members.',
    'The event consists of 2 rounds: Round 1 and Round 2.',
    'Round 1: Architectural Line Sketch (20 minutes) Participants prepare a Line Sketch of the question with the proper scale.',
    'Qualified teams go to the second round.',
    'Round 2: Foam Board Modelling Challenge Participants use Foam Boards to develop their line sketch into a 3D model.',
    'All the materials needed for model building will be provided.',
    'The model will be an open plan where no roof is needed. Distinction between the rooms inside should be clearly shown.',
    'Dimension of the plot should be in the range of 30 – 50 cm in length and width and elevation in the range of 10–12 cm.',
    'Extra materials and time taken will reduce the points scored.',
    'The call of the judges will be final.',
    'Further instructions will be given at the venue.',
    'Event time: Round 1 – (10–10:30 am), Round 2 – (11 – 1 pm)'
  ]

  const th = [
    'Each team should consist of 3 to 5 members.',
    'Cross college team participation is allowed.',
    'The event is scheduled from 2pm to 5pm. The hunt should be completed within 3 hours.',
    'Teams will solve clues leading to hidden locations or objects around the campus.',
    'Whoever completes all the tasks first following proper code of conduct will be the winners.',
    'Violation of any rules that includes sharing of clues will result in immediate disqualification',
    'Call of the judges will be final.',
    'Further instructions will be provided at the venue.'
  ]
   
  let a = [];

  if(topic === 'Infranova'){
    a = infa;
  }else if(topic === 'Model Masters'){
    a = mm;
  }else if(topic === 'Treasure Hunt'){
    a = th;
  }else{
    a = [];
  }
  
  let b = '';
  if(event === 'Workshop'){
    b = 'Afla Shaji: +91 9645917769'
  }else if(event === 'Competition'){
    if(topic === 'Infranova'){
      b = 'Pradeep: +91 7737922738';
    }else if(topic === 'Model Masters'){
      b = 'Sandra: +91 8547592396';
    }else if(topic === 'Treasure Hunt'){
      b = 'Sreeraj A: +91 6282841184';
    }
  }
  
  return (
    <div className={styles.registrationContainer}>
      <Navbar/>
      <div className={styles.formWrapper}>
        
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
            {description}
          </p>
          
          <div className={styles.contactInfo}>
            <h4>Contact Details:</h4>
            <p>
              {b}
            </p>
          </div>
          
          <div className={styles.guidelines}>
            {a.length > 0 && (
              <>
                <h4>Guidelines:</h4>
                <ul>
                  {a.map((guideline, index) => (
                    <li key={index}>{guideline}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          <div className={styles.registrationFee}>
            <h4>Registration Fee:</h4>
            <p>₹{money}</p>
          </div>
        </div>
        
       
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
                Back to Home
              </button>
            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
              <h3 className={styles.formTitle}>Payment Details</h3>
              
              <div className={styles.qrCodeContainer}>
                <div className={styles.qrCode}>
                  <img 
                    src="/QR.jpg" 
                    alt="Payment QR Code" 
                    className={styles.qrImage} 
                  />
                </div>
                <p className={styles.scanText}>Scan to pay ₹{money}</p>
                <p className={styles.upiId}>UPI: 7902334933@pz<br/>MUHAMMED ANAS K</p>
              </div>
              
              <div className={styles.formGroup}>
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
                
                {paymentScreenshot && (
                  <div className={styles.fileInputLabel}>
                    {paymentScreenshot.name}
                  </div>
                )}
              </div>
              
              {imagePreview && (
                <div className={styles.imagePreviewContainer}>
                  <img 
                    src={imagePreview} 
                    alt="Payment Screenshot" 
                    className={styles.imagePreview} 
                    style={{ maxWidth: "300px", marginTop: "10px", borderRadius: "4px" }} 
                  />
                  <button 
                    type="button" 
                    className={styles.resubmitButton}
                    onClick={handleResubmission}
                  >
                    Re-upload Image
                  </button>
                </div>
              )}
              
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
}

const RegistrationForm = ({ onBackToEvents }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationFormContent onBackToEvents={onBackToEvents} />
    </Suspense>
  );
};

export default RegistrationForm;
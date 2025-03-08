// pages/index.js
"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Landing from '../components/Landing';
import HolographicCity from '../components/HolographicCity';
import About from '../components/About';
import Sponsors from '../components/Sponsors';
import EventSlider from '../components/EventSlider';
import CompetitionCards from '../components/CompetitionCards';
import WorkshopCards from '../components/WorkshopCards';
import LectureCards from '../components/LectureCards';
import Lecturers from '../components/Lecturers';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Prithvi'25 | Civil Engineering Fest</title>
        <meta name="description" content="Annual Civil Engineering Festival - Prithvi'25" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <main className={styles.main}>
            <Landing />
            <HolographicCity />
            <About />
            <Sponsors />
            <EventSlider />
            <CompetitionCards />
            <WorkshopCards />
            <LectureCards />
            <Lecturers />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
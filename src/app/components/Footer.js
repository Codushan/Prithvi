// components/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.structuralElements}>
        <div className={styles.beam}></div>
        <div className={styles.column}></div>
        <div className={styles.column}></div>
        <div className={styles.blueprint}></div>
      </div>

      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <Link href='#'><Image
              src="/prithviw.png" // Add the correct extension (e.g., .png, .jpg)

              width={70}
              height={40}

              className={styles.image}
              alt="Prithvi Logo"
            /></Link>

            <h2>PRITHVI'25</h2>
            <p>Building Tomorrow's Foundation</p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h3>Events</h3>
              <ul>
                <li><Link href="#competitions">Competitions</Link></li>
                <li><Link href="#workshops">Workshops</Link></li>
                <li><Link href="#lectures">Lectures</Link></li>
                {/* <li><Link href="#exhibitions">Exhibitions</Link></li> */}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3>Information</h3>
              <ul>
                <li><Link href="#about">About</Link></li>
                <li><Link href="#schedule">Schedule</Link></li>
                <li><Link href="#venue">Venue</Link></li>
                <li><Link href="#sponsors">Sponsors</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3>Contact</h3>
              <ul>
                <li><Link href="#contact">Contact Us</Link></li>
                {/* <li><Link href="#faq">FAQ</Link></li> */}
                <li><Link href="Team">Our Team</Link></li>
                {/* <li><Link href="#support">Support</Link></li> */}
              </ul>
            </div>
          </div>

          <div className={styles.newsletter}>
            <h3>Stay Updated</h3>
            <p>Visit our official CEA website for more update and information.</p>
            {/* <h1>CEA</h1> */}
            <Link href='https://cea.nitc.ac.in/'><Image
              src="/ceaw.png" // Add the correct extension (e.g., .png, .jpg)
              width={70}
              height={40}
              className={styles.image}
              alt="CEA Logo"
            /></Link>
            <Link href='https://cea.nitc.ac.in/'>cea.nitc.ac.in</Link>
            

            {/* <div className={styles.subscribeForm}>
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div> */}
            <div className={styles.socialIcons}>
              {/* <a href="#" className={styles.socialIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className={styles.socialIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="currentColor" />
                </svg>
              </a> */}
              <a href="#" className={styles.socialIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className={styles.socialIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19.47,21h-14.9A2.56,2.56,0,0,1,2,18.49V5.51A2.56,2.56,0,0,1,4.56,3h14.9A2.56,2.56,0,0,1,22,5.51V18.49A2.56,2.56,0,0,1,19.47,21ZM8.78,8.89v7.3H11.3V8.89Zm1.29-2.07a1.22,1.22,0,0,0-1.3,1.29,1.23,1.23,0,0,0,1.2,1.29,1.41,1.41,0,0,0,2.62-.65A1.12,1.12,0,0,0,10.07,6.82ZM12.77,8.89v7.3h2.52v-3.8c0-1.13.83-1.4,1.25-1.4s1.5.42,1.5,1.4v3.8h2.41v-4.1c0-2.06-1.13-3.5-2.72-3.5a3.38,3.38,0,0,0-2.72,1.4V8.89Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; 2025 Prithvi'25. All Rights Reserved.</p>
          </div>

          <div className={styles.footerNav}>
            <ul>
              <li><Link href="#privacy">Privacy Policy</Link></li>
              <li><Link href="#terms">Terms of Service</Link></li>
              <li><Link href="#sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
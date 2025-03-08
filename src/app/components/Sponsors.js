// components/Sponsors.js
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Sponsors.module.css';

const Sponsors = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const handleScroll = () => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add(styles.visible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="sponsors" className={styles.sponsorsSection} ref={sectionRef}>
      <div className={styles.bgElements}>
        <div className={styles.bridge}></div>
        <div className={styles.pillar}></div>
        <div className={styles.pillar}></div>
        <div className={styles.girder}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          <h2>OUR <span>SPONSORS</span></h2>
          <div className={styles.underline}></div>
        </div>

        <div className={styles.description}>
          <p>Prithvi 2025: Building the Future of Civil Engineering! Join us at NIT Calicut for Prithvi 2025, where innovation meets excellence! Featuring expert talks, cutting-edge project exhibitions, and a special collaboration with Larsen & Toubro (L&T), this is your chance to shape the future of infrastructure. Exciting awards, expert panels, and groundbreaking ideas await! Don't miss out!</p>
        </div>

        <div className={styles.sponsorTiers}>
          <div className={styles.tier}>
            {/* <h3>Foundation Partners</h3> */}
            <div className={styles.sponsorGrid}>
              {[1].map((i) => (
                <div key={`platinum-${i}`} className={styles.sponsorCard}>
                  <div className={styles.blueprint}>
                    <div className={styles.blueprintLines}></div>
                  </div>
                  <div className={styles.logoPlaceholder}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <path d="M0 0 C4.11334193 3.54913435 8.06608075 7.25420066 12 11 C12.72058594 11.65613281 13.44117188 12.31226563 14.18359375 12.98828125 C35.96441224 33.45436221 48.12192672 65.38265861 49.27734375 94.82421875 C50.16963754 132.68038587 37.00786118 164.69567444 11 192 C10.39414063 192.65871094 9.78828125 193.31742188 9.1640625 193.99609375 C-7.36517965 211.45258607 -30.94386131 221.77025426 -54 227 C-54.98613281 227.226875 -55.97226563 227.45375 -56.98828125 227.6875 C-87.9420353 233.59126236 -120.36107822 226.21440494 -147 210 C-147.59296875 209.64131836 -148.1859375 209.28263672 -148.796875 208.91308594 C-177.44877352 191.11857914 -196.69990379 161.35719144 -204.49609375 128.93701172 C-212.0812422 95.28183342 -204.82987074 60.23481559 -187 31 C-183.94691981 26.43579931 -180.53075006 22.2002764 -177 18 C-176.29746094 17.15695313 -175.59492188 16.31390625 -174.87109375 15.4453125 C-131.96410706 -34.43091078 -50.88067361 -42.07148236 0 0 Z M-93 -9 C-95.35981745 -6.04653786 -97.1214265 -2.80746026 -98.9375 0.5 C-99.49324707 1.47614258 -100.04899414 2.45228516 -100.62158203 3.45800781 C-101.81361095 5.55324954 -102.99827877 7.65269305 -104.17626953 9.75585938 C-106.5812168 14.03389677 -109.04324252 18.27774844 -111.50512695 22.52319336 C-113.39772778 25.78922093 -115.28212788 29.05984733 -117.1640625 32.33203125 C-121.02054517 39.03702987 -124.88454376 45.73767172 -128.75 52.4375 C-129.3680249 53.50959717 -129.9860498 54.58169434 -130.62280273 55.6862793 C-133.53487554 60.73637867 -136.45269689 65.78292872 -139.38671875 70.8203125 C-140.16354004 72.15557983 -140.16354004 72.15557983 -140.95605469 73.51782227 C-141.91968229 75.17304482 -142.88508301 76.82723681 -143.85253906 78.48022461 C-146.01118471 81.56172917 -146.01118471 81.56172917 -147 85 C-113.835 85.495 -113.835 85.495 -80 86 C-84.95 94.58 -89.9 103.16 -95 112 C-95.66 113.65 -96.32 115.3 -97 117 C-125.38 116.67 -153.76 116.34 -183 116 C-166.76323085 86.77381552 -166.76323085 86.77381552 -158.30078125 72.56640625 C-148.87476132 56.72242979 -139.80245273 40.66719822 -130.66976929 24.65289307 C-125.19397359 15.0534978 -119.64588378 5.50028521 -114 -4 C-114.99 -4.495 -114.99 -4.495 -116 -5 C-118.49370903 -4.13024295 -120.84249823 -3.19512542 -123.25 -2.125 C-123.96293213 -1.80982422 -124.67586426 -1.49464844 -125.41040039 -1.16992188 C-135.83817786 3.59151481 -146.6918443 10.06549152 -155 18 C-155 18.66 -155 19.32 -155 20 C-155.639375 20.268125 -156.27875 20.53625 -156.9375 20.8125 C-159.33131686 21.88667752 -159.33131686 21.88667752 -160 25 C-160.66 25 -161.32 25 -162 25 C-182.88367696 49.20682057 -192.83887677 78.10944069 -191 110 C-188.63207398 138.56128048 -174.98321687 166.21888104 -153.515625 185.32080078 C-138.1299818 198.33157671 -116.61555697 211.54570592 -96 211 C-95.68998047 210.44465576 -95.37996094 209.88931152 -95.06054688 209.31713867 C-88.54249361 197.66267917 -81.90656897 186.09135067 -75.0625 174.625 C-69.17635626 164.75846638 -63.47104782 154.80854386 -57.89819336 144.76196289 C-54.0024188 137.74798297 -50.00197849 130.80781702 -45.84228516 123.94677734 C-43.71290805 120.703096 -43.71290805 120.703096 -43 117 C-54.55 116.67 -66.1 116.34 -78 116 C-75.751875 111.978125 -73.50375 107.95625 -71.1875 103.8125 C-70.13212036 101.92301636 -70.13212036 101.92301636 -69.05541992 99.99536133 C-68.49443604 98.9927124 -67.93345215 97.99006348 -67.35546875 96.95703125 C-66.78465576 95.93585205 -66.21384277 94.91467285 -65.62573242 93.86254883 C-65.08924072 92.91790771 -64.55274902 91.9732666 -64 91 C-63.64131836 90.12766724 -63.28263672 89.25533447 -62.91308594 88.35656738 C-61 86 -61 86 -57.37434387 85.39872742 C-55.8378877 85.384216 -54.30102301 85.39756735 -52.76489258 85.43237305 C-51.50602486 85.43127785 -51.50602486 85.43127785 -50.22172546 85.43016052 C-47.44533848 85.43364642 -44.6706254 85.47255362 -41.89453125 85.51171875 C-39.97068702 85.52104334 -38.04683092 85.52816112 -36.12297058 85.53315735 C-31.05753848 85.55225502 -25.99282239 85.60137977 -20.92767334 85.65667725 C-15.75982348 85.70780999 -10.591858 85.73065862 -5.42382812 85.75585938 C4.71776264 85.80949574 14.8588218 85.89484212 25 86 C24.5560791 86.76143311 24.1121582 87.52286621 23.65478516 88.30737305 C22.00087305 91.14793788 20.35001927 93.99023483 18.70117188 96.83374023 C17.98851309 98.06133057 17.27466154 99.2882293 16.55957031 100.5144043 C15.52871269 102.28251176 14.50224708 104.05310658 13.4765625 105.82421875 C12.549646 107.41882935 12.549646 107.41882935 11.60400391 109.0456543 C10.18599698 111.65742018 9.03049621 114.21676024 8 117 C7.10394043 116.87431641 6.20788086 116.74863281 5.28466797 116.61914062 C-11.34980656 114.11786526 -11.34980656 114.11786526 -26.64794922 118.93652344 C-31.2075676 124.43650251 -33.81754743 130.96150397 -36.49707031 137.52734375 C-38.97999989 143.26437921 -42.23216516 148.51918355 -45.4375 153.875 C-46.69547575 156.04843092 -47.94936533 158.22423187 -49.19921875 160.40234375 C-52.40903065 165.97457721 -55.62071188 171.54572818 -58.83398438 177.1159668 C-60.097326 179.30604871 -61.36035405 181.49631154 -62.62304688 183.68676758 C-65.53507346 188.73668376 -68.45278836 193.78308576 -71.38671875 198.8203125 C-71.90459961 199.71049072 -72.42248047 200.60066895 -72.95605469 201.51782227 C-73.91968229 203.17304482 -74.88508301 204.82723681 -75.85253906 206.48022461 C-78.01118471 209.56172917 -78.01118471 209.56172917 -79 213 C-58.88089935 213.69376209 -40.35780274 207.71633507 -23 198 C-22.00226563 197.44441406 -21.00453125 196.88882813 -19.9765625 196.31640625 C-12.42976628 191.80779017 -6.29065639 186.0697766 0 180 C0.7321875 179.33097656 1.464375 178.66195312 2.21875 177.97265625 C20.45253213 160.86039644 32.15982492 132.87593936 33.07080078 108.07226562 C33.6900225 85.1558585 29.19222786 64.99441992 18 45 C17.44441406 44.00226563 16.88882813 43.00453125 16.31640625 41.9765625 C11.80779017 34.42976628 6.0697766 28.29065639 0 22 C-0.66902344 21.2678125 -1.33804688 20.535625 -2.02734375 19.78125 C-20.50755843 0.08985846 -49.04584544 -10.09794254 -75.5546875 -11.25 C-84.5804443 -11.63928942 -84.5804443 -11.63928942 -93 -9 Z " fill="#fff" transform="translate(207,27)" />
                    </svg>
                  </div>
                  {/* <h4>Sponsor {i}</h4> */}
                </div>
              ))}
            </div>
          </div>

          {/* <div className={styles.tier}>
            <h3>Structural Supporters</h3>
            <div className={styles.sponsorGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={`gold-${i}`} className={styles.sponsorCard}>
                  <div className={styles.blueprint}>
                    <div className={styles.blueprintLines}></div>
                  </div>
                  <div className={styles.logoPlaceholder}>
                    <div className={styles.beam}></div>
                    <div className={styles.column}></div>
                  </div>
                  <h4>Sponsor {i}</h4>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className={styles.tier}>
            <h3>Technical Associates</h3>
            <div className={styles.sponsorGrid}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={`silver-${i}`} className={styles.sponsorCard}>
                  <div className={styles.blueprint}>
                    <div className={styles.blueprintLines}></div>
                  </div>
                  <div className={styles.logoPlaceholder}>
                    <div className={styles.beam}></div>
                    <div className={styles.column}></div>
                  </div>
                  <h4>Sponsor {i}</h4>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* <div className={styles.sponsorCTA}>
          <h3>Become a Sponsor</h3>
          <p>Join leading organizations in supporting innovation in civil engineering. Contact us for partnership opportunities.</p>
          <button className={styles.ctaButton}>Sponsorship Brochure</button>
        </div> */}
      </div>
    </section>
  );
};

export default Sponsors;
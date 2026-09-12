import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routing/routes';
import styles from './PrivacyPolicyScreen.module.css';

export function PrivacyPolicyScreen() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={() => navigate(ROUTES.SIGNUP)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className={styles.title}>Privacy Policy</h1>
      </header>
      <main className={styles.content}>
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to SportIQ. This is a Minimum Viable Product (MVP) currently under active local pilot testing. This platform is not a finished commercial product.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>2. Data We Collect</h2>
          <p>
            During this pilot, we collect basic information to facilitate the platform's functionality. This includes your name, email address, physical/sports information (such as height, weight, dominant foot, and selected sports), and basic location data.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>3. How We Store Your Data</h2>
          <p>
            Your data is securely stored using Supabase, our backend infrastructure provider. We do not sell your personal data to third parties.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Contact Us</h2>
          <p>
            If you have any questions or concerns about your data during this pilot phase, please contact the SportIQ administrative team.
          </p>
        </section>
      </main>
    </div>
  );
}

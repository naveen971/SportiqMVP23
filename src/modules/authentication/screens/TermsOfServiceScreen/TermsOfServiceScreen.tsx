import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routing/routes';
import styles from './TermsOfServiceScreen.module.css';

export function TermsOfServiceScreen() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={() => navigate(ROUTES.SIGNUP)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className={styles.title}>Terms of Service</h1>
      </header>
      <main className={styles.content}>
        <section className={styles.section}>
          <h2>1. Pilot Program Participation</h2>
          <p>
            By accessing SportIQ, you agree to participate in this local pilot testing phase. The platform is provided "as is" for testing and feedback purposes.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>2. User Conduct</h2>
          <p>
            You agree to provide accurate information and to use the platform respectfully. Any misuse, abuse, or unauthorized sharing of platform data may result in immediate termination of your access to the pilot program.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>3. Limitation of Liability</h2>
          <p>
            As this is an MVP under active development, the SportIQ team is not liable for any data loss, service interruptions, or inaccuracies in the platform's features or analytics during this pilot phase.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Feedback and Communications</h2>
          <p>
            Any feedback, ideas, or suggestions you provide regarding the SportIQ platform during this pilot may be used by the development team without restriction or compensation.
          </p>
        </section>
      </main>
    </div>
  );
}

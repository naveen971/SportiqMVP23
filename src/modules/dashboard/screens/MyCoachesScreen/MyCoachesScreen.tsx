import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../core/auth/AuthProvider';
import { getCoachesByOrganisation, ProfileData } from '../../../profile/services/profileService';
import { ROUTES } from '../../../../routing/routes';
import styles from './MyCoachesScreen.module.css';

export function MyCoachesScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState<ProfileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCoaches() {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCoachesByOrganisation(user.id);
        setCoaches(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load coaches.');
      } finally {
        setIsLoading(false);
      }
    }
    loadCoaches();
  }, [user]);

  const getInitials = (name: string) => {
    if (!name) return 'C';
    const parts = name.split(' ').filter(Boolean);
    const first = parts[0];
    const second = parts[1];
    if (first && second && first[0] && second[0]) {
      return (first[0] + second[0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Go back">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className={styles.pageTitle}>My Coaches</h1>
      </header>

      <main className={styles.mainContent}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <span className={`material-symbols-outlined ${styles.spinner}`}>sync</span>
            <p>Loading your coaches...</p>
          </div>
        ) : error ? (
          <div className={styles.errorAlert}>
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
          </div>
        ) : coaches.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={`material-symbols-outlined ${styles.emptyIcon}`}>group_off</span>
            <h2 className={styles.emptyTitle}>No Coaches Yet</h2>
            <p className={styles.emptyDesc}>
              When coaches select your organisation in their profile, they will appear here.
            </p>
          </div>
        ) : (
          <div className={styles.coachesGrid}>
            {coaches.map(coach => (
              <div 
                key={coach.id} 
                className={styles.coachCard}
                onClick={() => navigate(ROUTES.ATHLETE_PUBLIC_PROFILE.replace(':id', coach.id))}
              >
                <div className={styles.avatarWrapper}>
                  {coach.avatar_url ? (
                    <img src={coach.avatar_url} alt={coach.full_name} className={styles.avatarImage} />
                  ) : (
                    <span className={styles.avatarInitials}>{getInitials(coach.full_name)}</span>
                  )}
                </div>
                <div className={styles.coachInfo}>
                  <h3 className={styles.coachName}>{coach.full_name || 'Unnamed Coach'}</h3>
                  <p className={styles.coachRole}>
                    <span className={`material-symbols-outlined ${styles.coachIcon}`}>sports</span>
                    {coach.primary_position ? `Coach • ${coach.primary_position}` : 'Coach'}
                  </p>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-text-tertiary)' }}>chevron_right</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

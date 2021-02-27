import styles from '../styles/components/Leaderboard.module.css';

export function Leaderboard(){
    return (
        <div className={styles.container}>
            <header>
                Leaderboard
            </header>

            <span className={styles.position}>Posição</span>
            <span className={styles.user}>Usuario</span>
            <span className={styles.challenge}>Desafio</span>
            <span className={styles.experience}>Experiência</span>
        </div>
    )
}
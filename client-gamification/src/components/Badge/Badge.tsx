import styles from './Badge.module.css'

const Badge = ({badge}: { badge: string }) => {
    return (
        <div className={styles.container}>
            {badge}
        </div>
    )
}

export default Badge

import styles from './DetailWidget.module.css'
import {classes} from "../../utils.ts"
import Badge from "../../Badge/Badge.tsx";

const DetailWidget = () => {
    // mock data
    let totalTime = 1000
    let mostWatchedCategory = {
        name: 'Movie',
        count: 500
    }
    let badges = ['Power Player', '7 Streaks', 'master chief']

    const detailWide = classes({
        [styles.detail]: true,
        [styles.detailWide]: true
    });

    return (
        <div className={styles.container}>
            <div className={styles.detail}>
                <div className={styles.title}>Total</div>
                <div className={styles.value}>{totalTime}hrs</div>
            </div>
            <div className={styles.detail}>
                <div className={styles.title}>Category</div>
                <div className={styles.value}>{mostWatchedCategory.name}
                </div>
                <div className={styles.value}>{mostWatchedCategory.count}hrs</div>
            </div>
            <div className={styles.detail}>
                <div className={styles.title}>Badges</div>
                <div
                    className={styles.value}>{badges.length} badges
                </div>
            </div>
            <div className={detailWide}>
                {badges.map((badge, index) => (<Badge badge={badge} key={index}/>))}
            </div>
        </div>
    )
}

export default DetailWidget

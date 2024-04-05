import styles from './DetailWidget.module.css'
import Badge from "../../Badge/Badge.tsx";
import Avatar from "../UserMenu/Avatar.tsx";
import {motion} from "framer-motion";
import MetaBox from "./MetaBox.tsx";

const DetailWidget = () => {
    // mock data
    const title = 'Grand Master'
    let totalTime = 1000
    let mostWatchedCategory = {
        name: 'Movie',
        count: 500
    }
    let badges = ['Power Player', '7 Streaks', 'master chief']

    return (
        <motion.div className={styles.container}
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}>
            <div className={styles.profileWrapper}>
                <Avatar width={120} height={120}/>
                <div className={styles.profileMetaWrapper}>
                    <div className={styles.profileName}>John Doe</div>
                    <div className={styles.profileTitle}>{title}</div>
                </div>
            </div>
            <div className={styles.boxWrapper}>
                <MetaBox>
                    <div className={styles.title}>Total</div>
                    <div className={styles.value}>{totalTime}hrs</div>
                </MetaBox>
                <MetaBox>
                    <div className={styles.title}>Category</div>
                    <div className={styles.value}>{mostWatchedCategory.name}
                    </div>
                    <div className={styles.value}>{mostWatchedCategory.count}hrs</div>
                </MetaBox>
                <MetaBox>
                    <div className={styles.title}>Badges</div>
                    <div
                        className={styles.value}>{badges.length} badges
                    </div>
                </MetaBox>
                <div style={{gridColumn: 'span 3'}}>
                    <MetaBox wide>
                        {badges.map((badge, index) => (<Badge badge={badge} key={index}/>))}
                    </MetaBox>
                </div>
            </div>
        </motion.div>
    )
}

export default DetailWidget

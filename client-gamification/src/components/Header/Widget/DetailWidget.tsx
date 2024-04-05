import styles from "./DetailWidget.module.css";
import Badge from "../../Badge/Badge.tsx";
import Avatar from "../UserMenu/Avatar.tsx";
import { motion } from "framer-motion";
import MetaBox from "./MetaBox.tsx";
import { ButtonLink } from "../ButtonLink/ButtonLink.tsx";
import { StatisticsType } from "../../../types.ts";

type DetailWidgetProps = {
    statistics?: StatisticsType
};

const DetailWidget = (props: DetailWidgetProps) => {
    const totalWatched = formatMs(props.statistics?.time_watched_ms_total ?? 0);

    const categoriesDict: Record<string, number> = props.statistics?.time_watched_ms_per_category ?? {};
    const categoryNames = Object.keys(categoriesDict);
    const categoryMostWatched = categoryNames.sort((a, b) => categoriesDict[b] - categoriesDict[a] )[0] ?? ""

    const mostWatchedCategory: { name: string; total: string } = {
        name: categoryMostWatched,
        total: formatMs(categoriesDict[categoryMostWatched])
    };

    const badges = props.statistics?.badges ?? [];

    const twtMsg = `I have watched ${totalWatched} on Pluto.TV, Joins us\nIt's Free!!!`;
    const twtEncoded = encodeURI(twtMsg);

    return (
        <motion.div className={styles.container}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}>
            <div className={styles.profileWrapper}>
                <Avatar width={120} height={120} />
                <div className={styles.profileMetaWrapper}>
                    <div className={styles.profileName}>John Doe</div>
                    <div className={styles.profileTitle}>{props.statistics?.level_title ?? "Loading..."}</div>
                </div>
            </div>
            <div className={styles.boxWrapper}>
                <MetaBox>
                    <div className={styles.title}>Total</div>
                    <div className={styles.value}>{totalWatched}</div>
                </MetaBox>
                <MetaBox>
                    <div className={styles.title}>Category</div>
                    <div className={styles.value}>{mostWatchedCategory.name}
                    </div>
                    <div className={styles.value}>{mostWatchedCategory.total}</div>
                </MetaBox>
                <MetaBox>
                    <div className={styles.title}>Badges</div>
                    <div
                        className={styles.value}>{badges.length} badges
                    </div>
                </MetaBox>
                <div style={{ gridColumn: "span 3" }}>
                    <MetaBox wide>
                        {badges.map((badge, index) => (
                            <Badge name={badge.name} description={badge.description} key={index} />))}
                    </MetaBox>
                </div>
            </div>
            <div className={styles.footer}>
                <p>Share the stats with your friends and check it out who is the most devoted cinephile.</p>
                <ButtonLink href={"https://twitter.com/intent/tweet?text=" + twtEncoded.split("\n").map(it => it.trim()).join("\n")}>
                    <strong>Share</strong>
                </ButtonLink>
            </div>
        </motion.div>
    );
};

function formatMs(watchedMs: number) {
    const timeWatchedMs = watchedMs;

    const timeWatchedInMinutes = Math.round(timeWatchedMs / (1000 * 60));
    const timeWatchedInHours = Math.round(timeWatchedMs / (1000 * 60 * 60));

    const value = timeWatchedInHours >= 1 ? timeWatchedInHours : Math.max(timeWatchedInMinutes, 1);
    const unit = timeWatchedInHours >= 1 ? "HRS" : "MIN";

    return `${value}${unit}`
}

export default DetailWidget;

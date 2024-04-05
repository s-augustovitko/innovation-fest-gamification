import styles from './VideoPlayer.module.css';

const VideoPlayer = () => {
    return (
        <div className={styles.container}>
            <video controls>
                <source src="https://ww.gotoon.tv/video/SpongeBob-SquarePants-Free-Samples.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoPlayer

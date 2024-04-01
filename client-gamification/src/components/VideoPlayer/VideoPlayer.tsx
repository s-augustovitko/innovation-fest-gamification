import styles from './VideoPlayer.module.css';

const VideoPlayer = () => {
    return (
        <div className={styles.container}>
            <video controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoPlayer

import styles from "./ButtonLink.module.css";

export function ButtonLink(props: React.PropsWithChildren<{ href: string }>) {
    return (
        <a className={styles.link} href={props.href} target="_blank">
            <svg fill="#fff" height="1rem" width="1rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                    <g>
                        <path d="M512,241.7L273.643,3.343v156.152c-71.41,3.744-138.015,33.337-188.958,84.28C30.075,298.384,0,370.991,0,448.222v60.436
			l29.069-52.985c45.354-82.671,132.173-134.027,226.573-134.027c5.986,0,12.004,0.212,18.001,0.632v157.779L512,241.7z
			 M255.642,290.666c-84.543,0-163.661,36.792-217.939,98.885c26.634-114.177,129.256-199.483,251.429-199.483h15.489V78.131
			l163.568,163.568L304.621,405.267V294.531l-13.585-1.683C279.347,291.401,267.439,290.666,255.642,290.666z" />
                    </g>
                </g>
            </svg>
            <div>{props.children}</div>
        </a>
    );
}
import './App.css'
import Layout from "./components/Layout.tsx";
import Header from "./components/Header/Header.tsx";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.tsx";

function App() {
    return (
        <Layout>
            <Header/>
            <VideoPlayer/>
        </Layout>
    )
}

export default App

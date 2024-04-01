import './App.css'
import Layout from "./components/Layout.tsx";
import Header from "./components/Header/Header.tsx";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.tsx";
import ChannelSelector from "./components/ChannelSelector/ChannelSelector.tsx";

function App() {
    return (
        <Layout>
            <Header/>
            <VideoPlayer/>
            <ChannelSelector/>
        </Layout>
    )
}

export default App

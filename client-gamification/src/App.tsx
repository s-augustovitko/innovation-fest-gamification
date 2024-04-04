import './App.css'
import Layout from "./components/Layout.tsx";
import Header from "./components/Header/Header.tsx";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.tsx";
import {NotificationProvider} from "./components/Notification/NotificationContext.tsx";

function App() {
    return (
      <NotificationProvider>
        <Layout>
          <Header/>
          <VideoPlayer/>
        </Layout>
      </NotificationProvider>
    )
}

export default App

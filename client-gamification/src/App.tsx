import "./App.css";
import Layout from "./components/Layout.tsx";
import Header from "./components/Header/Header.tsx";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.tsx";
import { Provider } from "react-redux";
import { NotificationProvider } from "./components/Notification/NotificationContext.tsx";
import { store } from "./app/store.ts";

function App() {
    return (
        <Provider store={store}>
            <NotificationProvider>
                <Layout>
                    <Header />
                    <VideoPlayer />
                    <img src="/footer.png" style={{width: "100%"}}/>
                </Layout>
            </NotificationProvider>
        </Provider>
    )
}

export default App

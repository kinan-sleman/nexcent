import Header from "./components/1-Header/Header";
import Hero from "./components/2-HeroSection/Hero";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../public/style.css";
import Body from "./components/3-Body/Body";
import Footer from "./components/4-Footer/Footer";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Hero />
          <Body />
          <Footer />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

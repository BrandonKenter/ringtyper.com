import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import FooterLayout from "./layouts/FooterLayout";
import HeaderLayout from "./layouts/HeaderLayout";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Privacy from "./pages/privacy/Privacy";
import Terms from "./pages/terms/Terms";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  ScrollToTop();
  return (
    <div className="font-SourceCodePro min-w-[760px] bg-neutral-800">
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<FooterLayout />}>
            <Route path="/" element={<HeaderLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="contact" element={<Contact />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

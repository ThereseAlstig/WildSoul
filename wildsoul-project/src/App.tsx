import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Homepage } from "./pages/homePage";
import { Layout } from "./layout/layout";
import { Workout } from "./pages/workout";
import { Nutrient } from "./pages/nutrient";
import { Community } from "./pages/community";
import { Shop } from "./pages/shop";
import { WildSoulWeekly } from "./pages/wildSoulWeekly";



export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/traning" element={<Workout />} />
          <Route path="/naring" element={<Nutrient />} />
          <Route path="/community" element={<Community />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wildsoulweekly" element={<WildSoulWeekly />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
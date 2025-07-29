import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Homepage } from "./pages/homePage";
import { Layout } from "./layout/layout";
import { Workout } from "./pages/workout";
import { Nutrient } from "./pages/nutrient";
import { Community } from "./pages/community";
import { Shop } from "./pages/shop";
import { WildSoulWeekly } from "./pages/wildSoulWeekly";
import { Challenges } from "./pages/challenges";
import { Planner } from "./pages/planner";
import { Fokus } from "./pages/fokus";
import { Recepies } from "./pages/recepies";
import { Tips } from "./pages/tips";
import { Lifestyle } from "./pages/lifestyle";
import { Forum } from "./pages/forum";
import { Members } from "./pages/memebers";
import { Inspiration } from "./pages/inspiration";
import { Meetups } from "./pages/meetups";
import { Breakfast } from "./pages/breakfast";
import { Baking } from "./pages/baking";
import { TrainingProducts } from "./pages/trainingProducts";
import { WildsoulProducts } from "./pages/wildsoulProducts";
import { Cart } from "./pages/cart";
import { FoodTips } from "./pages/foodTips";
import { ExerciseTips } from "./pages/exerciseTips";
import { Other } from "./pages/other";
import MyPage from "./pages/myPage";



export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/traning" element={<Workout />} />
           <Route path="/minsida" element={<MyPage />} />
          <Route path="/traning/utmaningar" element={<Challenges />} />
          <Route path="/traning/planner" element={<Planner />} />
          <Route path="/traning/mobilitet" element={<Fokus />} />
          <Route path="/naring" element={<Nutrient />} />
          <Route path="/naring/recept" element={< Recepies/>} />
          <Route path="/naring/tips" element={< Tips/>} />
          <Route path="/naring/livsstil" element={< Lifestyle/>} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/forum" element={<Forum />} />
          <Route path="/community/medlemmar" element={<Members />} />
          <Route path="/community/inspiration" element={<Inspiration />} />
          <Route path="/community/meetups" element={<Meetups />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/frukost" element={<Breakfast />} />
          <Route path="/shop/bakning" element={<Baking/>} />
          <Route path="/shop/traning" element={<TrainingProducts/>} />
          <Route path="/shop/wildsoul-produkter" element={<WildsoulProducts/>} />
          <Route path="/shop/kundkorg" element={<Cart/>} />
          <Route path="/wildsoulweekly" element={<WildSoulWeekly />} />
          <Route path="/wildsoulweekly/kosttips" element={<FoodTips />} />
          <Route path="/wildsoulweekly/traningsinspiration" element={<ExerciseTips />} />
          <Route path="/wildsoulweekly/ovrigt" element={<Other />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
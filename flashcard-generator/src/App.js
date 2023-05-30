// import "./App.css";
import HomePage from './viewpages/HomePage';
import CreateFlashCard from './viewpages/CreateFlashCard';
import MyFlashCard from './viewpages/MyFlashCard';
import FlashCardDetails from "./viewpages/FlashCardDetails";


import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="w-full min-h-screen bg-[#f8f4ef] font-Montserrat">
    <div className="px-5 xl:px-32 container mx-auto">
      <HomePage />
      {/* All the Routes are Defined here */}
      <Routes>
        <Route path="/" element={<CreateFlashCard />} />
        <Route path="/myflashcard" element={<MyFlashCard />} />
        <Route
          path="/flashcarddetails/:groupId"
          element={<FlashCardDetails />}
        />
      </Routes>
    </div>
  </div>
  );
}

export default App;

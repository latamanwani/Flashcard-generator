import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlashcardUI from "../components/Card_UI/FlashcardUI";
import { useDispatch } from "react-redux";
import { RemoveCard } from "../app/features/flashcardSlice";

const MyFlashCard = (props) => {
  const navigate = useNavigate(); // to return the impretive method to hange the location
  const flashcard = useSelector((state) => state.flashcard.flashcards); // getting state from store
  const [showAll, setShowAll] = useState(false);
  const showLimit = !showAll ? 6 : flashcard.length; // setting showlimit of cards on the page
  const [flashcards, setFlashcards] = useState(flashcard); 
  const dispatch = useDispatch();
  
  //The code is using an array called flashcards, 
  //which has two properties: A filter function that removes all cards with a groupId that does not equal the id passed in as parameter - An empty function that prints out the id passed in as parameter
  const removeFlashcard = (id) => {
    dispatch(RemoveCard(id))
    setFlashcards(flashcards.filter((flashcard) => flashcard.card.groupid !== id)
     ); 
    
    console.log(id);
  };
  

  return (
    <section className="flex flex-col mt-16" >
      {/*if the length of flashcard is grater than 0 it will show all flashcard 
      else it will show message to create flashcard  */}
      {flashcards.length > 0 ? (
        <div>
          <div className="flex flex-wrap" >
            {flashcards.slice(0, showLimit).map(({ card }, i) => (
              <FlashcardUI 
                key={i}
                flashcard={card}
                removeFlashcard={removeFlashcard}
              />
            ))}
          </div>
          <div className="flex justify-end mr-10" >
            <button
              className="w-16 mt-1 mb-5 font-semibold text-lg text-red-600 outline-none border-none active:outline-none active:border-none"
              onClick={() => setShowAll(!showAll)} 
            >
              See all
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center shadow-lg p-20" style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(30 41 59)" }}>
          <h1 className="font-semibold text-xl text-blue-600" >
            No FlashCards avaliable,  
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              --CLICK--
            </span>
             to Create New Flashcard
          </h1>
        </div>
      )}
    </section>
  );
};

export default MyFlashCard;

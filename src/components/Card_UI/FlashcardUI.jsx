import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { MdDelete } from 'react-icons/md';
import { useDispatch } from "react-redux";
import { deleteFlashCard,updateState } from "../../app/features/flashcardSlice";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from "react-daisyui";
import 'react-toastify/dist/ReactToastify.css';

 import gray from "../../assets/gray.jpg";

// Flashcard component which displays the data in each card
 const FlashcardUI = ({ card ,flashcards }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
   
  const [showDelete, setshowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

   // This function will delete selected group of card which user want to delete.
  const deleteCard = (groupid, groupname) => {
    setshowDelete(true);
    setDeleteId({ groupid: groupid, groupname: groupname })
  }
  
    //this funtion will close the delete modal.
    const closeDelete = () => {
      setshowDelete(false);
    }
     
    const notify=()=>{
      toast("Deleted Successfully....")
    }
      //this function will handle the deleteFlashcard funtion from reducer.
      const handleDelete = () => {
        dispatch(deleteFlashCard(deleteId));
        dispatch(updateState());
        closeDelete();
        notify();
      }
  return (
    <div
      
      key={card.groupid}
      className="p-4 m-6 mx-auto flex flex-col space-y-3 items-center justify-center bg-white rounded-md text-black w-[20rem] h-[14rem] relative border-2 border-slate-200"
     >
      <div className="absolute -top-8">
        {card.groupimg ? (
          <img
            className="rounded-full w-16 h-16 object-cover aspect-square"
            src={card.groupimg}
            alt={card.groupname}
          />
        ) : (
         
            
            <img className="rounded-full w-16 h-16 object-cover aspect-square"
             src={gray}
              alt={card.groupimg} /> 
         
        )}
      </div>

      <div className="text-center">
     <div><h2 className="font-bold text-lg">{card.groupname}</h2></div> 
     <div className=" mb-3"> 
      <p className="text-center font-medium text-sm text-slate-600 line-clamp-2">
        {card.groupdescription}
      </p>
      </div>
      <p className="font-medium text-sm text-slate-700">
        {card.cards ? card.cards.length : 0} Cards
      </p>
      </div>
      <div>
      <button
        onClick={() => navigate(`/flashcarddetails/${card.groupid}`)}
        className="py-1 px-16 text-red-600 font-bold rounded-sm border-red-600 ring-2 ring-red-600"
      >
        View Cards
      </button>

      <button title="Delete Flashcard"
          // on clicking this button it will open delete modal.
          className="absolute right-[3.5rem] p-1 transition ease-in-out delay-60 duration-300  hover:-translate-y-1 hover:scale-60"
          onClick={() => deleteCard(card.groupid, card.groupname)}>
          <MdDelete className="h-6 text-red-500" />
        </button>
        </div>

          {/* delete Modal */}
      <Modal open={showDelete}  >
        <Button size="sm" shape="circle"
          className="absolute right-2 top-2 bg-white border-none "
          onClick={closeDelete}
          title="Cancel">❌</Button>
        <Modal.Body>
          <div className="p-2 text-center">
            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="mb-5 text-lg font-semibold text-gray-600 dark:text-gray-600">Are you sure you want to delete these flashcards?</h3>
            <button onClick={handleDelete}
              type="button"
              title="Yes, I'm sure"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Yes, I'm sure
            </button>
            <button onClick={closeDelete}
              type="button"
              title="No, Cancel"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              No, cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    <ToastContainer/>


    </div>
  );
};

export default FlashcardUI;
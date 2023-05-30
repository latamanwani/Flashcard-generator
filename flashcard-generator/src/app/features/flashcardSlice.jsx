
import { createSlice } from "@reduxjs/toolkit";

// Application has One Global state which can be supplied to the whole application
const initialState = {
  // First it looks into the Localstarage for any Flashcards & sets to the initial state, If not Found then it will set it to Empty array
  flashcards: localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards"))
    : [],
};

const updateLocalStorage = (arr) => {
  localStorage.setItem("flashcards", JSON.stringify(arr));
}

export const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    // This Reducer added the New Flashcards to the store
    setFlashCard(state, action) {
      state.flashcards.push({
        card: action.payload,
      });
      // after accepting the new flashcard from the user it sets to the Local Starage
      localStorage.setItem("flashcards", JSON.stringify(state.flashcards));
    },
    
    
    deleteFlashCard: (state, action) => {
      //console.log(action)

      //delete flashcard from store and localstorage
      const fcard = state.flashcards.filter(ele => {
        if (ele.card.groupid === action.payload.groupid && ele.card.groupname === action.payload.groupname) {
          return ele.card.groupname !== action.payload.groupname;
        }
        return ele;
      });
      return { ...state, flashcards: fcard };

    },

    //update the state of localstorage
    updateState: (state, action) => {
      updateLocalStorage(state.flashcards);
    }

  },
});

export const { setFlashCard , deleteFlashCard, updateState  } = flashcardSlice.actions;


export default flashcardSlice.reducer;
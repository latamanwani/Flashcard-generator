
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import FlashCardSchema from "../validations/schema/CardSchema";
import { nanoid } from "nanoid";
import {
  AiOutlinePlus,
  AiOutlineUpload,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setFlashCard } from "../app/features/flashcardSlice";
import TextError from "../validations/customErrorForm/TextError";

const CreateFlashCard = (props) => {
  const dispatch = useDispatch(); //for dispaching our action
  const filePickerRef = useRef(null);
  const editRef = useRef(null);
  const [groupImg, setGroupImg] = useState(""); //State for group image. Set initial value as empty.
  /*we are creating a functin which will take values and actions as parameter and will dispatch the action to create flashcard on calling and will reset the form and change the group image to empty string. */

  const filePicker = useRef(null);
  const [singleImg, setSelectImg] = useState("");

  const addFlashCard = (values, actions) => {
    dispatch(setFlashCard(values));
    actions.resetForm();
    setGroupImg("");
    setSelectImg("");
    actions.setSelectImg(false);
  };

  return (
    <Formik
      initialValues={{
        groupid: nanoid(), //to create unique group id
        groupname: "",
        groupdescription: "",
        groupimg: null,
        selectimg: null,
        img: null,

        cards: [
          {
            cardid: nanoid(), //to create unique Card id
            cardname: "",
            carddescription: "",
          },
        ],
        createOn: new Date(Date.now()).toLocaleString(),
      }}
      validationSchema={FlashCardSchema} //giving validation schema to the form to show error if values are entered wrong
      onSubmit={addFlashCard}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="w-full space-y-5 text-black-600 text-bold font-medium">
          <div className="md:flex flex-col px-10 py-4 bg-white drop-shadow-lg space-y-4 rounded-lg" style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(30 41 59)" }}>
            <div className="flex flex-col sm:flex-row items-center space-x-10 pt-3" >
              <div className="flex flex-col relative">
                <label style={{ color: props.mode === "white" ? "black" : "white" }} htmlFor="createGroup">Create Group *</label>
                <Field
                  type="text"
                  name="groupname" 
                  id="createGroup"
                  placeholder=" Enter Group Name "
                  className="border-gray-300 md:w-96 border-2 rounded-lg focus:ring-gray-500 focus:border focus:border-gray-700" style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(15 23 42)", color: props.mode === "white" ? "black" : "white" }}
                />
                <ErrorMessage component={TextError} name="groupname" />
              </div>
              {/*if the group image is present it will display the group image 
              else it will give the button to add group image from your device and then display it.*/}
              {groupImg ? (
                <img
                  src={groupImg}
                  alt="groupImg"
                  className="w-28 h-28 object-contain"
                />
              ) : (
                <button style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(12 74 110)" , color: props.mode === "white" ? "black" : "white"}}
                  type="button"
                  onClick={() => filePicker.current.click()}
                  className={`md:flex items-center px-10 py-2 mt-6 bg-white border-2 border-slate-300 active:border-blue-600 
                  text-blue-700 font-semibold rounded-md space-x-2 `}
                >
                  <AiOutlineUpload className="w-6 h-6"  />
                  <span >Upload Image</span>
                  <input
                    type="file"
                    ref={filePicker}
                    value={groupImg}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);

                      reader.onload = () => {
                        setFieldValue("groupimg", reader.result);
                        setGroupImg(reader.result);
                      };
                    }}
                    hidden
                  />
                </button>
              )}
            </div>

            <div className="flex flex-col w-full sm:w-[70%]" >
              <label style={{ color: props.mode === "white" ? "black" : "white" }} htmlFor="addDescription" className="mb-2">
                Add Description
              </label>
              <Field
                as="textarea"
                name="groupdescription"
                id="addDescription"
                rows={3}
                placeholder="Enter  Group  Description "
                className="resize-none border-gray-300 border-2 rounded-lg  focus:ring-gray-400 focus:border focus:border-gray-400" style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(15 23 42)", color: props.mode === "white" ? "black" : "white" }}
              />
              <ErrorMessage component={TextError} name="groupdescription" />
            </div>
          </div>

          <div className="text-black drop-shadow-lg " >
            {/*here we are creating the form for adding card and taking values of card field */}
            <FieldArray name="cards">
              {(arrayHelper) => {
                const cards = values.cards; //taking values of card
                return (
                  <div className="" >
                    {cards && cards.length > 0
                      ? cards.map((cards, index) => (
                          <div
                            className="flex rounded-t-lg items-center space-x-10 bg-white px-5 lg:px-10 py-4" style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(30 41 59)" }}
                            key={index}
                          >
                            {/*give numbering to card field */}
                            <div className="w-8 h-8 px-5 py-5 flex items-center justify-center bg-red-600 text-white text-md font-semibold rounded-full opacity-95 ">
                              {index + 1}
                            </div>
                            <div className="flex flex-col space-y-3 md:space-x-10 md:flex-row">
                              <div className="relative flex flex-col justify-center space-y-3">
                                <label htmlFor="enterTerm" className="" style={{ color: props.mode === "white" ? "black" : "white" }}>
                                  Enter Term
                                </label>
                                <Field
                                  type="text"
                                  id="enterTerm"
                                  name={`cards.${index}.cardname`}
                                  innerRef={editRef}
                                  placeholder="Enter Terms "
                                  className="border-gray-300 md:w-56 border-2 rounded-lg focus:ring-gray-500 focus:border focus:border-gray-700" style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(15 23 42)", color: props.mode === "white" ? "black" : "white" }}
                                />
                                <ErrorMessage
                                  component={TextError}
                                  name={`cards.${index}.cardname`}
                                />
                              </div>
                              <div className="relative flex flex-col justify-center space-y-3" > 
                                <label htmlFor="enterDefinaton" style={{ color: props.mode === "white" ? "black" : "white" }} >
                                  Enter Defination
                                </label>
                                <Field
                                  as="textarea"
                                  id="enterDefination"
                                  name={`cards.${index}.carddescription`}
                                  placeholder="Enter Defination "
                                  className=" lg:w-72  resize-none border-gray-300 border-2 rounded-lg  focus:ring-gray-400 focus:border focus:border-gray-400" style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(15 23 42)", color: props.mode === "white" ? "black" : "white" }}
                                />
                                <ErrorMessage
                                  component={TextError}
                                  name={`cards.${index}.carddescription`}
                                />
                              </div>

                              <div className="flex items-center space-x-2">
                                {singleImg ? (
                                  <img
                                    src={singleImg}
                                    alt="singleImg"
                                    className="w-28 h-28 object-contain"
                                  />
                                ) : (
                                  <button style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(12 74 110)" , color: props.mode === "white" ? "black" : "white"}}
                                    type="button"
                                    onClick={() =>
                                      filePickerRef.current.click()
                                    }
                                    className={`md:flex items-center px-10 py-2 mt-6 bg-white border-2 border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded-md space-x-2 `}>
                                  
                                    <input
                                      type="file"
                                      ref={filePickerRef}
                                      value={singleImg}
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        const reader = new FileReader();
                                        reader.readAsDataURL(file);
                                        reader.onload = () => {
                                          setFieldValue("img", reader.result);
                                          setSelectImg(reader.result);
                                        };
                                      }}
                                      hidden
                                    />
                                    <span>+Image</span>
                                  </button>
                                )}
                                <div className="flex items-center justify-around w-full md:flex-col md:space-y-5 md:mt-5">
                                  <button
                                    type="button"
                                    onClick={() => arrayHelper.remove(index)} // will remove flashcard entry
                                  >
                                    <AiOutlineDelete className="w-7 h-7  text-black-500" style={{ color: props.mode === "white" ? "black" : "white" }}/>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => editRef.current.focus()} 
                                  >
                                    <AiOutlineEdit className="h-7 w-7 text-blue-700" style={{ color: props.mode === "white" ? "rgb(59 130 246)" : "white" }}/>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                    <div className="bg-white rounded-b-lg flex w-full  mb-10 px-5 py-2" style={{ backgroundColor: props.mode === "white" ? "white" : "rgb(30 41 59)" }}>
                      <button
                        type="button"
                        //add flashcard entry 
                        onClick={() =>
                          arrayHelper.push({
                            cardid: nanoid(),
                            cardname: "",
                            carddescription: "",
                          })
                        }
                        className="flex items-center space-x-2 text-blue-600  text-md   mb-5 mt-0 "
                      >
                        <AiOutlinePlus />
                        <span >Add More</span>
                      </button>
                    </div>

                    <div className="flex justify-center w-full pb-5">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="py-2 px-6  bg-red-600 text-white rounded-md"
                      >
                        Create
                      </button> {/* Create button which will submit the form when clicked on by the user  */}
                    </div>
                  </div>
                );
              }}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
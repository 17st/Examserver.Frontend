import React , { useEffect }from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useSearchParams } from "react-router-dom";

const QuizPage = () => {
    const { quizId } = useParams();
    const [searchParams] = useSearchParams();
    const fromDuplicateTab = searchParams.get("fromDuplicateTab");
  
    useEffect(() => {
      if (fromDuplicateTab) {
        toast.warning("Don't go back or refresh this tab during the test!", {
          position: "top-center",
          autoClose: 500000,
          closeOnClick: true,
          draggable: false,
          style: { zIndex: 1050 },
        });
      }
    }, [fromDuplicateTab]);

    

    return (
        <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
            <iframe
                src={`https://quizzory.in/id/${quizId}`}
                title="Quiz Page"
                width="100%"
                height="100%"
                style={{ border: '1px solid #ccc' }}
            />
        </div>
    );

};

export default QuizPage;

//------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useParams, useSearchParams } from "react-router-dom";

// const QuizPage = () => {
//   const { quizId } = useParams();
//   const [searchParams] = useSearchParams();
//   const fromDuplicateTab = searchParams.get("fromDuplicateTab");
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     if (fromDuplicateTab) {
//       setShowPopup(true);
//       toast.warning("Don't go back or refresh this tab during the test!", {
//         position: "top-center",
//         autoClose: 500000,
//         closeOnClick: true,
//         draggable: false,
//         style: { zIndex: 1050 },
//       });
//     }
//   }, [fromDuplicateTab]);

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div style={{ width: "100%", height: "100vh", padding: "20px" }}>
//       {showPopup && (
//         <Popup
//           message="Don't go back or refresh this tab during the test!"
//           onClose={closePopup}
//           position={{ top: "25%", left: "70%" }}
//         />
//       )}
//       <iframe
//         src={`https://quizzory.in/id/${quizId}`}
//         title="Quiz Page"
//         width="100%"
//         height="100%"
//         style={{ border: "1px solid #ccc" }}
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// const Popup = ({ message, onClose, position }) => {
//   const popupStyle = {
//     position: "absolute",
//     top: position.top,
//     left: position.left,
//     transform: "translate(-50%, -50%)",
//     backgroundColor: "white",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//     zIndex: 1050,
//     textAlign: "center",
//   };

//   const overlayStyle = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     zIndex: 1040,
//   };

//   const buttonStyle = {
//     marginTop: "10px",
//     padding: "10px 20px",
//     border: "none",
//     backgroundColor: "#007bff",
//     color: "white",
//     borderRadius: "4px",
//     cursor: "pointer",
//   };

//   return (
//     <>
//       <div style={overlayStyle} onClick={onClose}></div>
//       <div style={popupStyle}>
//         <p>{message}</p>
//         {/* <button style={buttonStyle} onClick={onClose}>
//           Close
//         </button> */}
//       </div>
//     </>
//   );
// };

// export default QuizPage;

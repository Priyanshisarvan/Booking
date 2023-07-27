
import React, { useState } from "react";
import "../../../styles/Faqsection.css"; // Import the CSS file
import Header from "../Common/Header";


const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const questions = [
    {
      title: "1. How do I make a hotel reservation?",
      answer:
        "First, the You must login to book a room. On the website, you'll typically find a number of guests. After selecting your desired room type, you will be prompted to provide your personal information, such as name, contact details, and payment information, to complete the reservation.",
    },
    {
      title: "2. What are the check-in and check-out times?",
      answer: "Generally, check-in time is in the afternoon, typically around 3:00 PM or 4:00 PM, while check-out time is in the morning, usually around 11:00 AM or 12:00 PM.",
    },
    {
      title: "3. What do I need to bring for check-in?",
      answer: "When checking in, you will typically need to present a valid form of identification, such as a passport or driver's license. This is to verify your identity and ensure the security of the reservation",
    },
    {
      title: "4. What are some nearby attractions or points of interest?",
      answer: "The nearby attractions and points of interest are museums, parks, shopping districts, restaurants, theaters, and popular tourist sites.",
    },
    {
      title: "5. Should I give a receipt?",
      answer: "Yes, after the booking process is completed, a receipt of your booking will be generated.",
    },
    {
      title: "6. Can I modify or cancel my reservation?",
      answer: "Yes, You Can Cancle your Booking.",
    },
    // Add more question objects as needed
  ];

  return (
    <>
    <Header />

{/* <div className="faq-box"> */}
      <div style={{borderTop: "1px solid lightgray", 
            paddingTop: "60px",}} >
        <h3 className="faq-title">Frequently asked questions</h3>
      </div>

      <div className="faq-container">
        {questions.map((question, index) => (
          <div className="faq-item" key={index}>
            <h3
              onClick={() => toggleAnswer(index)}
              className={`faq-question ${expandedIndex === index ? "expanded" : ""}`}
            >
              {question.title}
            </h3>
            {expandedIndex === index && (
              <div className="faq-answer">
                <p>{question.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
};

export default FAQSection;






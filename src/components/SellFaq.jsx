import React, { useState } from "react";

function SellFaq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Why is Gadi Dikhao the best place to sell my car online?",
      answer:
        "Gadi Dikhao offers the best value for your car with instant payments and a fully digital process. From valuation to car pickup, everything is handled smoothly at your doorstep. Our process is designed to be quick, transparent, and hassle-free. Plus, we provide full after-sales support and guarantee a safe RC transfer, ensuring you have zero liability post-sale.",
    },
    {
      question: "Can I sell a car with an active loan on it?",
      answer:
        "Yes, you can. Gadi Dikhao will help with the loan closure process based on your car's valuation. After clearing the pending loan amount with your finance provider, the remaining value will be directly transferred to your account.",
    },
    {
      question:
        "Is the car owner required to be present during pickup and inspection?",
      answer:
        "No, the car owner does not need to be present during the initial inspection or pickup. A trusted person with the car keys and required documents can be present. However, the registered owner will need to be available to sign the final sale documents.",
    },
    {
      question: "Do I need to visit the RTO office for RC transfer?",
      answer:
        "Gadi Dikhao handles all the paperwork, including free RC transfer. In most cases, your physical presence at the RTO is not required. However, if there's a signature mismatch or if your state requires 'Party Peshi' (seller's appearance), a Gadi Dikhao representative will accompany and assist you throughout the process.",
    },
  ];

  return (
    <div className="flat-accordion">
      {faqItems.map((item, index) => (
        <div
          className={`flat-toggle style-2 ${
            activeIndex === index ? "active" : ""
          }`}
          key={index}
        >
          <div
            className="toggle-title flex align-center"
            onClick={() => toggleAccordion(index)}
          >
            <h5 className="fw-6">{item.question}</h5>
            <div className="btn-toggle" />
          </div>
          <div
            className="toggle-content section-desc"
            style={{ display: activeIndex === index ? "block" : "none" }}
          >
            <p className="texts">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SellFaq;

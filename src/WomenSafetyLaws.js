import React, { useState } from "react";
import './WomenSafetyLaws.css';

const WomenSafetyLaws = () => {
  const [expanded, setExpanded] = useState(null);

  const laws = [
    {
      title: "Protection of Women from Domestic Violence Act, 2005",
      description:
        "This law ensures protection for women from physical, emotional, sexual, or economic abuse at home.",
    },
    {
      title: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
      description:
        "A comprehensive law to protect women from harassment at their workplace.",
    },
    {
      title: "Indian Penal Code Section 354D - Stalking",
      description:
        "Addresses stalking and harassment, ensuring punishment for such behavior.",
    },
  ];

  const helplines = [
    { name: "National Women’s Helpline", number: "181" },
    { name: "Police Emergency", number: "100" },
    { name: "Women Helpline (Domestic Abuse)", number: "1091" },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Women Safety Laws & Resources</h2>
        <p className="text-gray-700 mb-6">
          Access essential laws, resources, and helplines to ensure your safety and rights.
        </p>

        {/* Laws Section */}
        <div>
          <h3 className="text-xl font-semibold text-blue-500 mb-4">Important Laws</h3>
          {laws.map((law, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
                onClick={() => toggleExpand(index)}
              >
                <span className="font-medium">{law.title}</span>
              </button>
              {expanded === index && (
                <p className="p-3 text-gray-600 border border-t-0 rounded-b-lg">
                  {law.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Helplines Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-blue-500 mb-4">Emergency Helplines</h3>
          <ul>
            {helplines.map((helpline, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-2 hover:bg-gray-200"
              >
                <span>{helpline.name}</span>
                <span className="font-bold text-blue-600">{helpline.number}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WomenSafetyLaws;

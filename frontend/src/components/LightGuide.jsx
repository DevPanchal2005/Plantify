import { useState, useRef, useEffect } from "react";

const LightGuide = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden"; // Prevent background scrolling

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const lightTypes = [
    {
      name: "Direct Bright Light",
      description: "Direct sunlight for 6+ hours daily",
      location: "South-facing windows",
      icon: "☀️",
      color: "bg-yellow-100 border-yellow-300",
      textColor: "text-yellow-800",
      examples: ["Cacti", "Succulents", "Citrus trees"],
    },
    {
      name: "Bright Light",
      description: "Bright, indirect light for 4-6 hours",
      location: "Near east/west windows",
      icon: "🌞",
      color: "bg-orange-100 border-orange-300",
      textColor: "text-orange-800",
      examples: ["Fiddle Leaf Fig", "Rubber Plant", "Monstera"],
    },
    {
      name: "Bright Indirect",
      description: "Filtered bright light, no direct sun",
      location: "3-5 feet from bright windows",
      icon: "🌤️",
      color: "bg-green-100 border-green-300",
      textColor: "text-green-800",
      examples: ["Pothos", "Snake Plant", "Peace Lily"],
    },
    {
      name: "Medium Light",
      description: "Moderate light, some shade tolerance",
      location: "North windows or filtered areas",
      icon: "⛅",
      color: "bg-blue-100 border-blue-300",
      textColor: "text-blue-800",
      examples: ["ZZ Plant", "Chinese Evergreen", "Philodendron"],
    },
    {
      name: "Medium to Low Light",
      description: "Tolerates lower light conditions",
      location: "Away from windows, artificial light",
      icon: "🌥️",
      color: "bg-gray-100 border-gray-300",
      textColor: "text-gray-800",
      examples: ["Cast Iron Plant", "Parlor Palm"],
    },
    {
      name: "Low Light",
      description: "Thrives in minimal natural light",
      location: "Interior spaces, offices",
      icon: "🌙",
      color: "bg-purple-100 border-purple-300",
      textColor: "text-purple-800",
      examples: ["Low Light Snake Plant", "Prayer Plant"],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-green-50">
          <h3 className="text-2xl font-bold text-green-800 flex items-center">
            <span className="mr-3">💡</span>
            Plant Light Guide
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Room Illustration */}
          <div className="p-6 bg-gradient-to-b from-green-50 to-white">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-green-800 mb-2">
                Understanding Light in Your Home
              </h4>
              <p className="text-gray-700 text-sm mb-4">
                Different areas of your room receive varying amounts of light
                throughout the day. Use this guide to find the perfect spot for
                your plants.
              </p>
            </div>

            {/* Room Illustration Image */}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img
                src="..\public\assets\light-guide-room.png"
                alt="Room light guide showing different light zones - from bright direct light near windows to low light in interior spaces"
                className="w-full h-auto object-contain"
                style={{ maxHeight: "400px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Light Types Grid */}
          <div className="px-6 pb-4">
            <h4 className="text-lg font-semibold text-green-800 mb-4">
              Light Requirements Guide
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lightTypes.map((light, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${light.color} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl">{light.icon}</span>
                    <div className="flex-1">
                      <h5 className={`font-semibold ${light.textColor} mb-2`}>
                        {light.name}
                      </h5>
                      <p className="text-sm text-gray-700 mb-3">
                        {light.description}
                      </p>
                      <div className="text-xs text-gray-600 mb-2">
                        <strong>Best location:</strong> {light.location}
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>Good for:</strong> {light.examples.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips and Room Guide */}
          <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tips Section */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Quick Care Tips
              </h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Rotate plants weekly for even growth</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Watch for signs: stretching = needs more light</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Yellowing leaves may indicate too much direct sun</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Use sheer curtains to filter harsh sunlight</span>
                </li>
              </ul>
            </div>

            {/* Room Placement Guide */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">🏠</span>
                Window Direction Guide
              </h4>
              <div className="text-sm text-blue-700 space-y-2">
                <div className="flex justify-between">
                  <strong>South windows:</strong>
                  <span>Brightest, direct light</span>
                </div>
                <div className="flex justify-between">
                  <strong>East/West windows:</strong>
                  <span>Morning/evening sun</span>
                </div>
                <div className="flex justify-between">
                  <strong>North windows:</strong>
                  <span>Gentle, indirect light</span>
                </div>
                <div className="flex justify-between">
                  <strong>Interior spaces:</strong>
                  <span>Consider grow lights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightGuide;

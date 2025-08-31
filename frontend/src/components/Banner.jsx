const Banner = ({ 
  image = "/assets/banner.png", 
  title = "Get 10% Off with SAVE10", 
  subtitle = "On orders above ₹1499!",
  highlightText = "SAVE10"
}) => {
  return (
    <section className="relative w-full">
      <img 
        src={image} 
        alt="Banner" 
        className="w-full h-64 object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-green-900 bg-opacity-75 text-white p-6 rounded-lg text-center">
          <h2 className="text-4xl font-bold">
            {title.split(highlightText)[0]}
            <span className="text-yellow-400">{highlightText}</span>
            {title.split(highlightText)[1]}
          </h2>
          <p className="text-lg mt-2">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;

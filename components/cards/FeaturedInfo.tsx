export default function FeaturedInfo() {
  return (
    <div className="p-4 md:w-1/3">
      <div className="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
        <div className="flex items-center mb-3">
          <h2 className="text-white text-lg title-font font-medium">
            Expenses
          </h2>
        </div>
        <div className="flex-grow">
          <p className="leading-relaxed text-base">
            Blue bottle crucifix vinyl post-ironic four dollar toast vegan
            taxidermy. Gastropub indxgo juice poutine.
          </p>
          <a className="mt-3 text-blue-400 inline-flex items-center">
            View More
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

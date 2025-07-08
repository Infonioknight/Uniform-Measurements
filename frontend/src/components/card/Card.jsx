const Card = (Props) => {
  return (
    <>
      <div class="m-auto w-9/12 bg-[#F5F5F5] rounded p-3 shadow-lg">
        <img class="mx-auto m-7 w-[250px] h-[115px]" src={Props.Logo} />
        <div class="px-4 py-3">
          <div class="font-bold text-xl">{Props.Title}</div>
          <p class="text-gray-700 text-base">{Props.description}</p>
        </div>
        <div class="px-4 pt-2 flex justify-between items-center">
          <button className="bg-blue-500 px-7 hover:bg-blue-700 text-white font-bold py-1 rounded-full">
            Buy
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Card;

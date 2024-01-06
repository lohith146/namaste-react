const Contact = () => (
  <div>
    <h1 className="text-black font-bold text-[32px] text-center m-4">
      Contact Us
    </h1>
    <form className="text-center max-w-[400px] m-auto">
      <div className="py-2">
        <label
          for="userName"
          className="block text-start font-medium pb-1 text-[16px]"
        >
          Name
        </label>
        <input
          type="text"
          id="userName"
          className="border-[#637d6f] rounded-md border-[1px] px-[5px] py-[8px] w-full"
        />
      </div>
      <div className="py-2">
        <label
          for="email"
          className="block text-start font-medium pb-1 text-[16px]"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border-[#637d6f] rounded-md border-[1px] px-[5px] py-[8px] w-full"
        />
      </div>
      <div className="py-2">
        <label
          for="number"
          className="block text-start font-medium pb-1 text-[16px]"
        >
          Number
        </label>
        <input
          type="number"
          id="number"
          className="border-[#637d6f] rounded-md border-[1px] px-[5px] py-[8px] w-full"
        />
      </div>
      <div className="py-4">
        <button
          type="button"
          className="border-[#637d6f] rounded-md border-[1px] px-3 py-2 bg-[#637d6f] text-white font-medium text-[16px] transition-[background] duration-[400ms] uppercase hover:bg-white hover:text-[#637d6f]"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
);

export default Contact;

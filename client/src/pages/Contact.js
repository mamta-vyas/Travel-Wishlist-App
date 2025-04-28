const Contact = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-400 via-blue-300 to-purple-200 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-slate-100 px-8 py-6 rounded-2xl shadow-xl mt-8 mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-purple-700 mb-4">
          Contact Us 📬
        </h2>
        <p className="text-sky-600 font-semibold text-center mb-4 text-sm sm:text-base md:text-lg">
          Have a question, suggestion, or just want to say hello? We’d love to
          hear from you!
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-base sm:text-lg md:text-xl font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 w-full sm:w-4/5 md:w-3/4 lg:w-4/5 px-4 py-2 bg-slate-300 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-base sm:text-lg md:text-xl font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full sm:w-4/5 md:w-3/4 lg:w-4/5 px-4 py-2 bg-slate-300 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-base sm:text-lg md:text-xl font-medium text-gray-700">
              Message
            </label>
            <textarea
              placeholder="Your message..."
              rows="4"
              className="mt-1 w-full sm:w-4/5 md:w-3/4 lg:w-4/5 px-4 py-2 border border-gray-400 bg-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
          </div>

          <button
            type="submit"
            className="w-full sm:w-4/5 md:w-3/4 lg:w-4/5 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

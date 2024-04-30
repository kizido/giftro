type CreateEventModalProps = {
  onClose: () => void;
};

const CreateEventModal = ({ onClose }: CreateEventModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-40 z-40 flex justify-center items-center">
      <div
        className="relative px-8 py-4 flex flex-col items-start lg:w-[62rem] lg:h-[36rem] w-[24rem] h-full bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <h1 className="font-semibold text-3xl">Create Event</h1>
          <img
            src="https://static-cdn.drawnames.com/Content/Assets/icon-close.svg"
            width={40}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={onClose}
          />
        </header>
        <label>Event Name</label>
        <input className="bg-gray-100 w-64" />
        <label>Event Date</label>
        <input className="bg-gray-100 w-64" />
        <label>Giftees</label>
        <input className="bg-gray-100 w-64" />
        <label>Gift Ideas</label>
        <input className="bg-gray-100 w-64" />
        <label>Budget</label>
        <input className="bg-gray-100 w-64" />

        <div className="flex items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Annual?
          </label>
        </div>
        <button
          type="submit"
          className="p-2 text-secondary-foreground bg-secondary text-2xl self-end"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default CreateEventModal;

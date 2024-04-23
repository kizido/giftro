type EventDisplayModalProps = {
    onClose: () => void;
}

const EventDisplayModal = ({onClose}: EventDisplayModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-40 z-40 flex justify-center items-center">
      <div
        className="relative flex flex-col lg:flex-row lg:w-[62rem] lg:h-[36rem] w-[24rem] h-full bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="https://static-cdn.drawnames.com/Content/Assets/icon-close.svg"
          width={40}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default EventDisplayModal;

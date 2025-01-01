import PropTypes from "prop-types";

const CochabambaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex justify-center z-50 text-neutral bg-primary dark:bg-primary">
      <div className=" w-full h-[100vh] p-6 text-lg relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-1 text-2xl  hover:text-secondary"
        >
          ✖
        </button>
        <div className="text-center text-secondary">
          <span className="text-sm md:text-3xl ">
            Cochabamba corazon de Bolivia,
          </span>
          <br />
          <span className="text-xs md:text-xl">
            Bolivia corazon de Sur America!!!
          </span>
          <div className="mt-10 ">
            <iframe
              className="w-full min-h-[60vh] md:min-h-[80vh]"
              src="https://www.youtube.com/embed/LcmMSzFZqVM?si=-I6AxaqNEt45lVt0&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
CochabambaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CochabambaModal;

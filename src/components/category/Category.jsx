import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const Category = ({ category, width, icon }) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate(`/${category}`);
    }, 400);
  };

  return (
    <div>
      <motion.button
        onClick={handleClick}
        initial={{ scale: 1 }}
        animate={{ scale: clicked ? 3 : 1, opacity: clicked ? 0 : 1 }}
        whileHover={{ translateY: 5 }}
        transition={{ duration: 0.3 }}
        style={{
          cursor: "pointer",
          outline: "none",
          width: width,
          transition: "all 0.3s ease",
        }}
      >
        {icon}
      </motion.button>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Category;

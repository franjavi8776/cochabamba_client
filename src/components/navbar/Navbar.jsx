import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ nameCategory }) => {
  const token = useSelector((state) => state.token);
  const name = useSelector((state) => state.name);

  let firstName;
  if (token) {
    firstName =
      name.split(" ")[0][0].toUpperCase() + name.split(" ")[0].slice(1);
  }

  return (
    <div className="h-24 flex items-center justify-center text-primary bg-neutral dark:bg-primary dark:text-neutral">
      <h1 className="text-center text-md md:text-[50px]  font-bold dark:text-secondary">
        {nameCategory}
      </h1>
      {name && (
        <div className="absolute top-5 right-5 ">
          <small className="mr-1 text-lg ">{firstName}</small>
          <i
            className="fa fa-user text-lg  text-secondary"
            aria-hidden="true"
          ></i>
        </div>
      )}

      <Link to="/" className="absolute top-5 left-5">
        <button className=" text-lg hover:text-secondary">
          <i className="fa fa-arrow-left " aria-hidden="true"></i>{" "}
          <span>Volver</span>
        </button>
      </Link>
    </div>
  );
};

export default Navbar;

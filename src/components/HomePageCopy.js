import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "./Reusables/Button";

const HomePageCopy = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="p-2 m-2">
          <Button
            onClick={() => {
              navigate("/addStone");
            }}
            text={"Add new stone"}
          />

          <Button
            onClick={() => {
              navigate("/results");
            }}
            text={"view Stock"}
          />
        </div>
      </div>
    </>
  );
};

export default HomePageCopy;

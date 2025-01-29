import React, { useState } from "react";
import Tank from "./Tank";

const Container = () => {
  const [tanks, setTanks] = useState([0, 0, 0, 0]);
  const [portion, setPortion] = useState(0);

  const handleEquate = () => {
    setTanks((prevTanks) =>
      prevTanks.map((w, i) =>
        w !== portion ? w + handleWaterLevel(w, portion) : w
      )
    );
    function handleWaterLevel(curr, req) {
      if (curr > req) {
        if (curr - req < 25) {
          return -(curr - req);
        } else {
          return -25;
        }
      } else {
        if (req - curr < 25) {
          return req - curr;
        } else {
          return 25;
        }
      }
    }
  };
  return (
    <div className="container">
      {tanks.map((w, i) => (
        <Tank
          key={i}
          setTanks={setTanks}
          tanks={tanks}
          index={i}
          handleEquate={handleEquate}
          setPortion={setPortion}
        />
      ))}
    </div>
  );
};

export default Container;

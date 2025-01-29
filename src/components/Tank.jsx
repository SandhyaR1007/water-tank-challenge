import React, { useRef, useEffect, useState } from "react";

const Tank = ({ tanks, setTanks, index, handleEquate, setPortion }) => {
  const tanksRef = useRef(tanks);
  const btnRef = useRef(null);
  const intervalRef = useRef();
  const [canEmpty, setCanEmpty] = useState(false);
  function addWater() {
    if (tanksRef.current[index] >= 500) return;
    const updatedVal = tanksRef.current.map((w, i) =>
      i === index ? w + 100 : w
    );
    setPortion(
      (updatedVal.reduce((acc, curr) => acc + curr, 0) / 4).toFixed(2)
    );
    setTanks((prevVal) => prevVal.map((w, i) => (i === index ? w + 100 : w)));
  }
  const emptyWater = () => {
    const newVal = tanks.map((w, i) => (i === index ? 0 : w));
    setPortion((newVal.reduce((acc, curr) => acc + curr, 0) / 4).toFixed(2));
    setTanks(newVal);
    setCanEmpty(true);
  };
  useEffect(() => {
    tanksRef.current = tanks;
  }, [tanks]);
  useEffect(() => {
    if (canEmpty) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (new Set(tanksRef.current).size === 1) {
          clearInterval(intervalRef.current);
          setCanEmpty(false);
          return;
        }

        handleEquate();
      }, 1000);
    }
  }, [canEmpty, tanks]);

  useEffect(() => {
    let id;

    function handleAddWater() {
      const initialTime = Date.now();

      intervalRef.current = setInterval(() => {
        if (tanksRef.current[index] >= 500) {
          clearInterval(intervalRef.current);
          return;
        }
        const currentTime = Date.now();
        if (currentTime - initialTime >= 1000) {
          addWater();
          initialTime = currentTime; // Reset the initial time after adding water
        }
      }, 1000);
    }

    btnRef?.current?.addEventListener("mousedown", handleAddWater);
    btnRef?.current?.addEventListener("mouseup", () => {
      setCanEmpty(true);
    });
    return () => {
      btnRef?.current?.removeEventListener("mousedown", handleAddWater);
      btnRef?.current?.removeEventListener("mouseup", setCanEmpty);
    };
  }, [tanks]);

  return (
    <div>
      <h3 style={{ color: "white" }}>{tanks[index]} L</h3>
      <div className="tank">
        <div className="water" style={{ height: `${tanks[index]}px` }}></div>
      </div>
      <div>
        <button onClick={emptyWater}>Empty</button>
        <button ref={btnRef}>Add</button>
      </div>
    </div>
  );
};

export default Tank;

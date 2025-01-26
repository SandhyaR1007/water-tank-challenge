import React, { useRef, useEffect, useState } from "react";

const Tank = ({ tanks, setTanks, index, handleEquate }) => {
  const tanksRef = useRef(tanks);
  const btnRef = useRef(null);
  const intervalRef = useRef();
  function addWater() {
    if (tanksRef.current[index] >= 500) return;
    setTanks((prevVal) => prevVal.map((w, i) => (i === index ? w + 100 : w)));
  }
  function emptyWater() {
    setTanks((prevVal) => prevVal.map((w, i) => (i === index ? 0 : w)));
  }
  useEffect(() => {
    tanksRef.current = tanks;
  }, [tanks]);

  useEffect(() => {
    const initialTime = Date.now();
    function handleAddWater() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        if (tanksRef.current[index] >= 500) {
          clearInterval(intervalRef.current);
          return;
        }
        if (Date.now() - initialTime >= 1000) {
          addWater();
        }
      }, 1000);
    }

    btnRef?.current?.addEventListener("mousedown", handleAddWater);
    btnRef?.current?.addEventListener("mouseout", () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (new Set(tanksRef.current).size === 1) {
          clearInterval(intervalRef.current);
          return;
        }
        handleEquate();
      }, 1000);
    });
    return () => {
      btnRef?.current?.removeEventListener("mousedown", handleAddWater);
      btnRef?.current?.removeEventListener("mouseout", handleEquate);
    };
  }, [tanks, emptyWater]);

  return (
    <div>
      <h3 style={{ color: "white" }}>{tanks[index]} L</h3>
      <div className="tank">
        <div className="water" style={{ height: `${tanks[index]}px` }}></div>
      </div>
      <div>
        <button onClick={emptyWater}>Empty</button>
        <button ref={btnRef} onClick={addWater}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Tank;

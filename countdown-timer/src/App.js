import React, { useState } from "react";
import InputForm from "../src/components/InputForm";
import CountdownTimer from "../src/components/CountdownTImer";
import "./styles.css";
const App = () => {
  const [targetDate, setTargetDate] = useState(null);

  const handleStart = (date) => {
    setTargetDate(date);
  };

  const handleCancel = () => {
    setTargetDate(null);
  };

  return (
    <div className="app">
      <h1>Countdown Timer</h1>
      <div className="container">
        <InputForm onSubmit={handleStart} />
        {targetDate && (
          <CountdownTimer targetDate={targetDate} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
};

export default App;

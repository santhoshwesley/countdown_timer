import React, { useState } from "react";
import "../styles/InputForm.css";

const InputForm = ({ onSubmit }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && time) {
      const selectedDate = new Date(`${date}T${time}`);
      const currentDate = new Date();
      const differenceInDays = Math.ceil(
        (selectedDate - currentDate) / (1000 * 60 * 60 * 24)
      );
      if (differenceInDays > 100) {
        setErrorMsg("Selected date is more than 100 days.");
      } else {
        onSubmit(selectedDate);
        setErrorMsg("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <div className="error-message">{errorMsg}</div>}
      <label>
        Select Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          // max={new Date(Date.now() + 8640000000).toISOString().split("T")[0]} // 99 days from now
          required
        />
      </label>
      <label>
        Select Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </label>
      <button type="submit">Start Countdown</button>
    </form>
  );
};

export default InputForm;

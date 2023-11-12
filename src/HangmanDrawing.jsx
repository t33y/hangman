import React from "react";

const HangmanDrawing = ({ incorrectLetters }) => {
  const head = (
    <div
      className="border-[10px] border-black dark:border-gray-50"
      key={0}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        position: "absolute",
        top: "60px",
        right: "-30px",
        boxSizing: "content-box",
      }}
    />
  );
  const body = (
    <div
      className="bg-black dark:bg-gray-50"
      key={1}
      style={{
        width: "10px",
        height: "100px",

        position: "absolute",
        top: "130px",
        right: "0px",
      }}
    />
  );
  const left_hand = (
    <div
      className="bg-black dark:bg-gray-50"
      key={2}
      style={{
        width: "90px",
        height: "10px",

        position: "absolute",
        top: "180px",
        right: "5px",
        rotate: "30deg",
        transformOrigin: "right",
      }}
    />
  );
  const right_hand = (
    <div
      className="bg-black dark:bg-gray-50"
      key={3}
      style={{
        width: "90px",
        height: "10px",

        position: "absolute",
        top: "180px",
        right: "5px",
        rotate: "150deg",
        transformOrigin: "right",
      }}
    />
  );
  const left_leg = (
    <div
      className="bg-black dark:bg-gray-50"
      key={4}
      style={{
        width: "10px",
        height: "100px",

        position: "absolute",
        top: "230px",
        right: "0px",
        rotate: "30deg",
        transformOrigin: "top",
      }}
    />
  );
  const right_leg = (
    <div
      className="bg-black dark:bg-gray-50"
      key={5}
      style={{
        width: "10px",
        height: "100px",

        position: "absolute",
        top: "230px",
        right: "0px",
        rotate: "-30deg",
        transformOrigin: "top",
      }}
    />
  );

  const fullBody = [head, body, left_hand, right_hand, left_leg, right_leg];

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      {fullBody.slice(0, incorrectLetters.length)}
      <div
        className="bg-black dark:bg-gray-50"
        style={{
          width: "10px",
          height: "50px",

          alignSelf: "end",
          position: "absolute",
          top: "10px",
        }}
      />
      <div
        className="bg-black dark:bg-gray-50"
        style={{
          width: "220px",
          height: "10px",
          alignSelf: "end",
        }}
      />
      <div
        className="bg-black dark:bg-gray-50"
        style={{ width: "10px", height: "400px" }}
      />
      <div
        className="bg-black dark:bg-gray-50"
        style={{ width: "250px", height: "10px" }}
      />
    </div>
  );
};

export default HangmanDrawing;

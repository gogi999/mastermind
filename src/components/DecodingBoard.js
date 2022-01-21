import React, { useState } from 'react';
import Row from './Row';

const DecodingBoard = (props) => {
  const winArr = props.winArr;

  const [guessArr, setGuessArr] = useState([
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    },
    {
      pegs: ["empty", "empty", "empty", "empty"],
      hints: ["hint", "hint", "hint", "hint"]
    }
  ]);

  const buildGuess = (i, r) => {
    let buildGuessArr = guessArr.map(d => d);
    buildGuessArr[r].pegs.splice(i, 1, props.activeColor);
    setGuessArr(buildGuessArr);
  };

  let [guessNum, setGuessNum] = useState(0);

  const increaseGuessCount = () => {
    guessNum += 1;
    setGuessNum(guessNum);
  };

  const submitGuess = e => {
    increaseGuessCount();

    if (JSON.stringify(guessArr[e].pegs) === JSON.stringify(winArr)) {
      props.endGame("youWon");
    } else if (guessNum === 10) {
      props.endGame("youLost");
    } else {
      giveHint(e);
    }
  };

  const giveHint = e => {
    let winArrDuex = winArr.map(d => d);
    let thisGuessArr = guessArr[e].pegs.map(d => d);
    let buildHintArr = guessArr.map(d => d);
    let matches = 0;
    let closeMatches = 0;
    
    for (let i = 0; i < winArr.length; i += 1) {
      if (winArrDuex[i] === thisGuessArr[i]) {
        matches += 1;
        winArrDuex.splice(i, 1, "emptyWin");
        thisGuessArr.splice(i, 1, "emptyGuess"); 
      }
    }

    for (let i = 0; i < winArr.length; i += 1) {
      let splicePos = winArrDuex.indexOf(thisGuessArr[i]);
      if (winArrDuex.includes(thisGuessArr[i])) {
        closeMatches += 1;
        winArrDuex.splice(splicePos, 1, "emptyWin");
      } else {
        winArrDuex.splice(i, 1, "emptyWin");
      }
    }
    
    for (let i = 0; i < buildHintArr[e].hints.length; i += 1) {
      if (matches > 0) {
        buildHintArr[e].hints.splice(i, 1, "hint-match");
        matches -= 1;
      } else if (closeMatches > 0) {
        buildHintArr[e].hints.splice(i, 1, "hint-close");
        closeMatches -= 1;
      } else {
        buildHintArr[e].hints.splice(i, 1, "hint-nope");
      }
    }
    setGuessArr(buildHintArr);
  };

  const tenRows = guessArr.map((d, i) => {
    let rowID;
    if (i === guessNum) {
      rowID = "activeRow";
    } else {
      rowID = "fullRow";
    }

    return (
      <Row
        rowID={rowID}
        rowNum={i}
        guessNum={guessNum}
        guessArr={d}
        buildGuess={buildGuess}
        submitGuess={submitGuess}
        key={i}
      />
    );
  });

  return <div id="decodingBoard">{tenRows}</div>;
}

export default DecodingBoard;

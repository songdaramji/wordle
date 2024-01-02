//정답변수 선언
const 정답 = "APPLE";

//시도횟수,인덱스
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  //정답맞혔을 때 알림
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "정답을 맞히셨습니다.";
    div.style =
      "background-color:white; width:200px; height:100px; display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%;";
    document.body.appendChild(div);
  };

  //5번 시도해서 틀렸을 때
  const displayFail = () => {
    const div = document.createElement("div");
    div.innerText = "아쉽게도 게임이 종료되었습니다.";
    div.style =
      "background-color:white; width:400px; height:100px; display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:25%;";
    document.body.appendChild(div);
  };
  //첫줄 입력후 다음줄로 넘어가게
  const nextLine = () => {
    //6번째 시도일 때 게임오버 리턴
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  //정답을 맞혀서 게임이 끝날 때
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    //타이머 종료(intervval)
    clearInterval(timer);
  };

  //5칸입력하고 엔터키
  const handleEnterKey = () => {
    let 맞은개수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      //입력글자와 정답글자 비교
      const 입력글자 = block.innerText;
      const 정답글자 = 정답[i];
      // 입력글자가 정답글자와 위치&글자 모두 일치할 때
      if (입력글자 === 정답글자) {
        맞은개수++;
        block.style.background = "#6AAA64";
      }
      //입력글자가 정답에 포함되는 글자일 때
      else if (정답.includes(입력글자)) block.style.background = "#C9B458";
      //입력글자가 정답글자와 아예 불일치할 때
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }
    //정답글자수가 5개이면 게임끝
    if (맞은개수 === 5) gameover();
    //아니면 다음줄에 재시도
    else nextLine();

    if (attempts >= 6) {
      displayFail();
    }
  };

  //글자 지우기
  const handleBackspace = () => {
    //첫째칸부터 지우기
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const handleKeydown = (event) => {
    //대문자 변환
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  //타이머
  const startTimer = () => {
    const 시작시간 = new Date();
    function setTime() {
      const 현재시간 = new Date();
      const 진행시간 = new Date(현재시간 - 시작시간);
      const 분 = 진행시간.getMinutes().toString().padStart(2, "0");
      const 초 = 진행시간.getSeconds().toString().padStart(2, "0");
      const timerH5 = document.querySelector("#timer");
      timerH5.innerText = `${분}:${초}`;
    }
    //1초마다 주기성 부여
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();

let getyear = document.querySelector("#header-y-m h1"),
  getMonth = document.querySelector(".memo-month"),
  cardLists = document.querySelectorAll(".day-card"),
  dayEls = document.querySelectorAll(".day"),
  dataInAlert = (mainContainer = document.querySelector("#main-container"));

let year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  day = new Date().getDate();

let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];

// 메모 localStorage 저장
function saveMemo() {
  let saveDayTxt = 0;
  const sendBtns = document.querySelectorAll(".send");
  sendBtns.forEach((item) => {
    item.addEventListener("click", () => {
      saveDayTxt = item.className.slice(-2);
      let title = document.querySelector(`.tit-${saveDayTxt}`).value;
      let content = document.querySelector(`.cnt-${saveDayTxt}`).value;
      if (title && content) {
        allMemo.push({ title, content, id: saveDayTxt });
        localStorage.setItem("allMemo", JSON.stringify(allMemo));
      } else {
        const noTit = document.querySelector(`.tit-${saveDayTxt}`);
        const noCnt = document.querySelector(`.cnt-${saveDayTxt}`);
        noTit.classList.add("no-tit-cnt");
        noCnt.classList.add("no-tit-cnt");
        setTimeout(() => {
          noTit.classList.remove("no-tit-cnt");
          noCnt.classList.remove("no-tit-cnt");
        }, 1000);
      }
    });
  });
}

// localStorage에 저장된 메모 input에 띄워주기 -> 달력의 날짜 클릭시 전체 메모보여주는 것으로 개선예정
function showMemo() {
  allMemo.forEach((item) => {
    const tit = document.querySelector(`.tit-${item["id"]}`);
    const cnt = document.querySelector(`.cnt-${item["id"]}`);
    tit.value = item["title"];
    cnt.value = item["content"];
  });
  drawData();
}

function makeCard(item, day) {
  const card = document.createElement("div");
  card.setAttribute("class", `card ${day}`);
  card.innerHTML = `
      <div class="sec-title">
        <label for="tit">타이틀</label>
        <input
          type="text"
          id="tit"
          class="title tit-${day}"
          placeholder="타이틀을 입력해 주세요"
        />
      </div>
      <div class="sec-context">
        <label for="content">내용</label>
        <input
          type="text"
          id="cnt"
          class="content cnt-${day}"
          placeholder="자세한 일정을 적어주세요"
        />
      </div>
      <button type="button" class="btn send send-${day}">저장</button>
  `;
  item.appendChild(card);
}

function makeCards(day) {
  cardLists.forEach((item) => {
    makeCard(item, day);
    day++;
  });
}

function makeDay(day) {
  dayEls.forEach((item) => {
    item.textContent = day;
    item.setAttribute("class", `day day-${day}`);
    day++;
  });
}

// 미완성
function checkMonthYear(newYear, newMonth, newDay, timeLength) {
  if (newDay >= timeLength) {
    newDay == 0;
    newMonth++;
  }
}

//미완성
function upDownDay() {
  const dayUpDownBtn = document.querySelectorAll(".btn-day");
  const titleEls = document.querySelectorAll(".title");
  const contentEls = document.querySelectorAll(".content");
  const sendEls = document.querySelectorAll(".send");
  dayUpDownBtn.forEach((item) => {
    item.addEventListener("click", () => {
      let idx = 0;
      if (item.classList.contains("down")) {
        dayEls.forEach((day) => {
          day.textContent = --day.textContent;
          console.log(titleEls);
          titleEls[idx].classList.add(`tit-${day.textContent}`);
          titleEls[idx].classList.remove(`tit-${day.textContent + 1}`);
          contentEls[idx].classList.add(`tit-${day.textContent}`);
          contentEls[idx].classList.remove(`tit-${day.textContent + 1}`);
          idx++;
        });
        contentEls.forEach((cnt) => {
          cnt.classList.add(`tit-${idx}`);
          cnt.classList.remove(`tit-${idx + 1}`);
          idx++;
        });
        // showMemo();
      } else {
        dayEls.forEach((day) => {
          day.textContent = ++day.textContent;
        });
      }
    });
  });
}

function drawData() {
  allMemo.forEach((item) => {
    const haveData = document.querySelector(`.day-${item["id"]}`);
    console.log(haveData);
    haveData.style.color = "salmon";
    haveData.style.cursor = "pointer";
    haveData.addEventListener("click", () => {
      mainContainer.innerHTML = "";
      const cardListsContainer = document.createElement("ul");
      const cardList = document.createElement("li");
      cardListsContainer.setAttribute("class", "saved-card-list");
      cardList.setAttribute("class", "saved-day-card");

      for (const item of allMemo) {
        const saveTitle = document.createElement("h2");
        saveTitle.style.fontSize = "32px";
        const saveContent = document.createElement("p");
        const saveId = document.createElement("p");
        const deleteMemoBtn = document.createElement("button");
        deleteMemoBtn.classList.add("btn");

        saveTitle.textContent = "타이틀" + item.title;
        saveContent.textContent = "일정" + item.content;
        saveId.textContent = item.id + "일";
        deleteMemoBtn.textContent = "삭제";
        deleteMemoBtn.setAttribute("id", item.id);
        deleteMemoBtn.setAttribute("onclick", "remove()");

        cardList.appendChild(saveId);
        cardList.appendChild(saveTitle);
        cardList.appendChild(saveContent);
        cardList.appendChild(deleteMemoBtn);

        cardListsContainer.appendChild(cardList);
        mainContainer.appendChild(cardListsContainer);
      }
    });
  });
}

function main(newYear, newMonth, newDay) {
  // const timeLength = new Date(newYear, newMonth, 0).getDate();

  getyear.textContent = newYear;
  getMonth.textContent = newMonth;
  makeCards(newDay);
  makeDay(newDay);
  upDownDay();
  saveMemo();
  showMemo();
  drawData();
}

//비완성

// const titleInputs = document.querySelectorAll('.title')
// const contentInputs = document.querySelectorAll('.content')
// titleInputs.forEach(item=>{
//   item.addEventListener('click',()=>{
//     const divEl = document.createElement('div');
//     divEl.classList.add('data-in')

//   })
// })

// 달력UI ===============================================================

function init() {
  main(year, month, day);
  console.log(allMemo);
}
init();

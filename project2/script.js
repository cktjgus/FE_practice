if (window.location.href.includes("index.html")) {
  const modal = document.querySelector('.modal');
  const modal_open = document.querySelectorAll('.time');
  const bookBtn = document.querySelector('#bookBtn');
  const modal_close = document.querySelector('#closeBtn');
  const selectTime = document.querySelector('#selectTime');

  modal_open.forEach(button => {
    button.addEventListener('click', (e) => {
      const selectedTime = e.target.innerText;
      selectTime.innerText = `${selectedTime}`;
      modal.style.display = 'block';
    });
  });
  
  bookBtn.addEventListener('click', () => {
    window.location.href = "book.html"
  });

  modal_close.addEventListener('click', () => {
    modal.style.display = 'none';
  });
} else {
  const container = document.querySelector('.book-container');
  const seats = document.querySelectorAll('.row .seat:not(.occupied)');
  const count = document.querySelector('#count');
  const total = document.querySelector('#total');
  const clearBtn = document.querySelector('.clear');
  const bookBtn = document.querySelector('.book');

  let ticketPrice = 8000;

  //UI 초기화. 저장된 좌석 상태를 불러옴
  const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats')) || [];
    
    //선택된 좌석을 UI 표시
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, idx) => {
        if (selectedSeats.indexOf(idx) > -1) {
          seat.classList.add('selected'); //선택된 좌석에 'selected' 클래스 추가
        }
      });
    } else {
      seats.forEach(seat => {
          seat.classList.remove('selected'); //선택된 좌석이 없으면 'selected' 제거
      })
    }
    //예약된 좌석 UI에 표시
    if (occupiedSeats !== null && occupiedSeats.length > 0) {
      seats.forEach((seat, idx) => {
        if (occupiedSeats.indexOf(idx) > -1) {
          seat.classList.add('occupied');
        }
      }) 
    }
  }

  //선택된 좌석 수와 총 가격 업데이트
  const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); //선택된 좌석
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //선택된 좌석 인덱스
    const selectedSeatsCnt = selectedSeats.length; 

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); //선택된 좌석을 로컬스토리지에 저장
    
    count.innerText = selectedSeatsCnt + '석';
    total.innerText = selectedSeatsCnt * ticketPrice + '원';
  }

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');
      updateSelectedCount();
    }
  });

  bookBtn.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    if (selectedSeats.length === 0) {
      alert("좌석을 선택해주세요.");
      return;
    }

    const seatsIndex = [...selectedSeats].map(seat => {
      return [...seats].indexOf(seat);
    });
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats')) || [];
    const newOccupiedSeats = [...new Set([...occupiedSeats, ...seatsIndex])];
    localStorage.setItem('occupiedSeats', JSON.stringify(newOccupiedSeats));
    
    selectedSeats.forEach(seat => {
      seat.classList.add('occupied');
      seat.classList.remove('selected');
    });

    localStorage.removeItem('selectedSeats');
    alert(`예매 완료!\n${total.innerText}`);
    updateSelectedCount();
    total.innerText = 0 + '원';
    count.innerText = 0 + '석';
  });

  clearBtn.addEventListener('click', () => {
    localStorage.clear();
    populateUI();
    updateSelectedCount();
  });
  populateUI();
  updateSelectedCount();
}
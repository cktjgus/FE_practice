const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
  const formControl = input.parentElement; //input의 부모 요소 찾아
  formControl.className = 'form-control error'; //에러 표시용 클래스 추가
  const small = formControl.querySelector('small'); //오류 메시지 보여주는 요소 찾기
  //querySelector은 html 구조에서 태그 찾아줌
  small.innerText = message; //오류 메시지를 해당 요소에 설정
}

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

const isValidemail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)){
    showSuccess(email);
  } else {
    showError(email, 'Email is not valid');
  }
}

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const checkRequired = (inputArray) => {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  })
}

const checkLength = (input, min, max, fieldname) => {
  if (input.value.length < min) {
    showError(input, `${fieldname} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${fieldname} must be at less ${max} characters`);
  }
}

const checkPassword = (input1, input2) => {
  if (input1.value !== input2.value){
    showError(input2, 'Passwords do not match');
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 6, 15, 'Username');
  checkLength(password, 8, 20, 'Password');
  checkLength(password2, 8, 20, 'Password');
  isValidemail(email);
  checkPassword(password, password2);
});
let arr = [], multHeight, buff, i = 0, ch = 0, size, maxSize, pos = 0, choise = 0, direction = true, nextEl;
let mult, winWidth = 1050, winHeight = 480;


do {
  maxSize = size = +prompt("Кол-во сортируемых элементов (10 <= кол-во <= 1000):", 30);
} while (size < 10 || size > 1000);

choise = +prompt("Выберите способ сортировки:\n1) - Пузырьковая сортировка\n2) - Гномовая сортировка\n3) - Шейкерная сортировка", 1);

mult = winHeight / size;


function rand(min, max) {
  let randNum = min + Math.random() * (max + 1 - min);
  return Math.floor(randNum);
}

function finish() {
  clearTimeout(timer);

  i = 0;
  let endTimer = setInterval(function() {
      
    divs[i].style.backgroundColor = "green";
    i++;
      
    if (i == arr.length) clearInterval(endTimer);

  }, interval);

  return;
}


function run1() {

  ch = bubbleSort(i, ch);

  i++;

  if (i == size) {

    size--;

    if (ch == 0) {

      finish();
      return;
    } 
    else {
      i = 0, ch = 0;
      divs[i].style.backgroundColor = "red";
    }
  }
  timer = setTimeout(run1, interval);
}

function bubbleSort(iter, change) {

  if (arr[iter] > arr[iter + 1]) {
    buff = arr[iter];
    arr[iter] = arr[iter + 1];
    arr[iter + 1] = buff;
    
    divs[iter].style.height = `${mult * arr[iter]}px`;
    divs[iter + 1].style.height = `${mult * arr[iter + 1]}px`;
    
    change++;
  }
 
  divs[iter].style.backgroundColor = "white";
  
  if (iter != size - 1) divs[iter + 1].style.backgroundColor = "red";


  return change;
}


function run2() {

  ch = 0;

  ch = gnomeSort(i, ch);
    
  if (ch) i--;
  else if (!ch) {

    if (pos == maxSize - 1) divs[i - 1].style.backgroundColor = "white";

    i = ++pos;
  }
  

  if (i == maxSize) {
    finish();
    return;
  }
  timer = setTimeout(run2, interval);
}

function gnomeSort(iter, change) {

  if (arr[iter] < arr[iter - 1]) {
    buff = arr[iter];
    arr[iter] = arr[iter - 1];
    arr[iter - 1] = buff;

    divs[iter].style.height = `${mult * arr[iter]}px`;
    divs[iter - 1].style.height = `${mult * arr[iter - 1]}px`;

    divs[iter - 1].style.backgroundColor = "red";

    change++;
  }
  else if (pos < size - 1) divs[pos + 1].style.backgroundColor = "red";
  

  divs[iter].style.backgroundColor = "white";

  return change;
}


function run3() {

  ch = shakerSort(i, ch);

  if (direction) i++;
  else i--;


  if (i == size && direction) {
    direction = false;

    if (ch == 0) {
      divs[i - 1].style.backgroundColor = "white";

      finish();
      return;
    } 
    else {
      i = size - 2, ch = 0;
      divs[i].style.backgroundColor = "red";
    }
  }

  else if (i == maxSize - size && !direction) {
    size--, direction = true;

    if (ch == 0) {
      divs[i].style.backgroundColor = "white";

      finish();
      return;
    } 
    else {
      i = maxSize - size, ch = 0;
      divs[i].style.backgroundColor = "red";
      divs[i - 1].style.backgroundColor = "white";
    }
  }


  timer = setTimeout(run3, interval);
}

function shakerSort(iter, change) {

  if (direction) nextEl = iter + 1;
  else nextEl = iter - 1;

    
  if (arr[iter] > arr[nextEl] && direction || arr[iter] < arr[nextEl] && !direction) {
    buff = arr[iter];
    arr[iter] = arr[nextEl];
    arr[nextEl] = buff;
    
    divs[iter].style.height = `${mult * arr[iter]}px`;
    divs[nextEl].style.height = `${mult * arr[nextEl]}px`;
    
    change++;
  }
 
  divs[iter].style.backgroundColor = "white";
  
  if (iter != size - 1 && direction || iter != maxSize - size && !direction) divs[nextEl].style.backgroundColor = "red";


  return change;
}




for (let s = 0; s < size; s++) document.body.firstElementChild.insertAdjacentHTML("afterbegin", "<div></div>");

for (let s = 0; s < size; s++) {
  
  multHeight = rand(1, size);

  for (let j = 0; j < s; j++) {

    if (multHeight == arr[j]) {
      multHeight = rand(1, size);
      j = -1;
    }
  }

  arr[s] = multHeight;
}


let divs = document.body.firstElementChild.getElementsByTagName('div');

for (let s = 0; s < size; s++) {
  divs[s].style.width = `${winWidth / size}px`;
  divs[s].style.height = `${mult * arr[s]}px`;
  divs[s].style.opacity = "100%";
}


i = 0;
divs[i].style.backgroundColor = "red";

let interval = +prompt("Введите интервал:", 4);
let timer;

switch (choise) {
  case 1:
    timer = setTimeout(run1, interval);
    break;

  case 2:
    timer = setTimeout(run2, interval);
    break;

  case 3:
    timer = setTimeout(run3, interval);
    break;
}
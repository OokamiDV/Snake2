toString

// контейнер игрового поля
let gameField = document.createElement('div')
gameField.className = 'gameField'
gameField.style.height = '900px'
gameField.style.width = '800px'
gameField.style.margin = 'auto'

let divForField = document.createElement('div')
divForField.style.width = '100vw'
divForField.style.height = '100vw'
divForField.style.position = 'fixed'
divForField.style.top = '0'
divForField.style.left = '0'
divForField.style.zIndex = '999'

// картинка головы 
let arrow = document.createElement('img')
arrow.style.backgroundImage = 'url(./gameDev/scroll/texture/arrow.png)'
arrow.style.height = '20px'
arrow.style.width = '20px'
arrow.style.position = 'absolute'
arrow.style.zIndex = 3

let arrow3 = document.createElement('img')
arrow3.hidden = true
arrow3.style.backgroundImage = 'url(./gameDev/scroll/texture/arrow3.png)'
arrow3.style.height = '20px'
arrow3.style.width = '20px'
arrow3.style.position = 'absolute'
arrow3.style.zIndex = 3

// картинка тела 
let arrow2 = document.createElement('img')
arrow2.style.backgroundImage = 'url(./gameDev/scroll/texture/arrow2.png)'
arrow2.style.height = '20px'
arrow2.style.width = '20px'
arrow2.style.position = 'absolute'
arrow2.style.zIndex = 1

// звук съедания
let eatSong = new Audio()
eatSong.src = './gameDev/scroll/sound/eat.mp3'
eatSong.preload = 'auto'
eatSong.volume = 0.3

// музыка
let mainTheme = new Audio()
mainTheme.src = './gameDev/scroll/sound/them.mp3'
mainTheme.preload = 'auto'
mainTheme.volume = 0.7

// звук при пройгрыше
let bea = new Audio()
bea.src = './gameDev/scroll/sound/ba.mp3'
bea.preload = 'auto'
bea.volume = 0.8

// создание изображений для тела
function creatBodyImg() {
    snakeBodyImgArr[dataArr.length - 1] = document.createElement('img')
    snakeBodyImgArr[dataArr.length - 1].style.backgroundImage = 'url(./gameDev/scroll/texture/arrow2.png)'
    snakeBodyImgArr[dataArr.length - 1].style.height = '20px'
    snakeBodyImgArr[dataArr.length - 1].style.width = '20px'
    snakeBodyImgArr[dataArr.length - 1].style.position = 'absolute'
    snakeBodyImgArr[dataArr.length - 1].style.zIndex = 2
    gameField.append(snakeBodyImgArr[dataArr.length - 1])
}

// картинка еды
let apple = document.createElement('img')
apple.style.backgroundImage = 'url(./gameDev/scroll/texture/apple.png)'
apple.style.height = '20px'
apple.style.width = '20px'
apple.style.position = 'absolute'
apple.hidden = true
apple.style.zIndex = 2

gameField.append(arrow)
gameField.append(apple)
gameField.append(arrow3)

// контейнер для кнопок
let buttonDiv = document.createElement('div')
buttonDiv.style.display = 'flex'
buttonDiv.style.justifyContent = 'space-between'
buttonDiv.style.alignContent = 'space-between'
buttonDiv.style.flexWrap = 'wrap'

// фоновая картинка
let backgroundField = document.createElement('div')
backgroundField.className = 'backgroundField'
backgroundField.style.width = '800px'
backgroundField.style.height = '800px'
backgroundField.style.background = 'url(./gameDev/scroll/texture/background.jpg)'
backgroundField.style.margin = 'auto'
backgroundField.style.zIndex = -1
backgroundField.style.position = 'relative'

// кнопи управления
let butRight = document.createElement('button')
butRight.style.height = '40px'
butRight.textContent = 'D'

let butLeft = document.createElement('button')
butLeft.style.height = '40px'
butLeft.textContent = 'A'

let butUp = document.createElement('button')
butUp.style.height = '40px'
butUp.textContent = 'W'

let butDawn = document.createElement('button')
butDawn.style.height = '40px'
butDawn.textContent = 'S'

// управление кнопками
butRight.onmousedown = function() {
    moveSnakeRigh()
}

butLeft.onmousedown = function() {
    moveSnakeLeft()
}

butUp.onmousedown = function() {
    moveSnakeUp()
}

butDawn.onmousedown = function() {
    moveSnakeDawn()
}

// создание игровой сетки поля
let tableDiv = document.createElement('div')
tableDiv.className = 'tableDiv'

let tableField = document.createElement('table')
tableField.position = 'absolute'
tableField.style.margin = 'auto'

let counterDiv = document.createElement('div')
gameField.prepend(counterDiv)
let countEat = 0
counterDiv.append(countEat)
    // 35 //44
let tRow = 38
let tData = 38

document.body.append(divForField)
divForField.append(gameField)
gameField.append(backgroundField)
backgroundField.append(tableDiv)
tableDiv.append(tableField)
gameField.append(buttonDiv)

buttonDiv.append(butLeft)
buttonDiv.append(butRight)
buttonDiv.append(butUp)
buttonDiv.append(butDawn)

// уменьшение игрового поля 
function fieldDecr() {
    tRow -= 1
    for (let i = -1; i < tData; i++) {
        tableField[tRow][i].remove()
        tableField[tRow - 1][i].style.background = 'black'
    }
    tData -= 1
    for (let i = -1; i < tRow; i++) {
        tableField[i][tData].remove()
        tableField[i][tData - 1].style.background = 'black'
    }

}

// создание игрового поля
for (let i = -1; i < tRow; i++) {
    tableField[i] = document.createElement('tr')
    tableField[i].ggHere = false
    tableField.append(tableField[i])

    for (let g = -1; g < tData; g++) {
        tableField[i][g] = document.createElement('td')
        tableField[i].append(tableField[i][g])
        tableField[i][g].ggHere = false
        tableField[i][g].numX = i
        tableField[i][g].numY = g
        if (i > -1 && g > -1 && g < tData - 1 && i < tRow - 1) {
            tableField[i][g].style.width = '10px'
            tableField[i][g].style.height = '10px'
                // tableField[i][g].style.border = 'solid'
            tableField[i][g].style.margin = '0px'
            tableField[i][g].style.padding = '0px'
        } else {
            tableField[i][g].style.background = 'black'
            tableField[i][g].style.width = '10px'
            tableField[i][g].style.height = '10px'
            tableField[i][g].style.border = 'solid'
            tableField[i][g].style.margin = '0px'
            tableField[i][g].style.padding = '0px'
        }
    }

}


// стартовое положение змейки
let SnakeHeadX = 15
let SnakeHeadY = 15

// массив с координатами текущего положения змейки
let dataArr = [
    [SnakeHeadX, SnakeHeadY]
]

// конец игры
function gameOver() {
    if (tableField[SnakeHeadX][SnakeHeadY].ggHere === true && dataArr[dataArr.length - 1][1] !== dataArr[dataArr.length - 3][1] && dataArr[dataArr.length - 1][0] !== dataArr[dataArr.length - 3][0]) {
        bea.play()
        alert('Game Over')
        location.reload()
    } else if (SnakeHeadX < 0 || SnakeHeadY < 0 || SnakeHeadX === tRow - 1 || SnakeHeadY === tData - 1) {
        bea.play()
        alert('Game Over')
        location.reload()
    }

}

// повород змейки на 180
function chengeHead() {
    if (snakeLength > 2 && dataArr[dataArr.length - 1][1] === dataArr[dataArr.length - 3][1] && dataArr[dataArr.length - 1][0] === dataArr[dataArr.length - 3][0]) {
        dataArr = dataArr.reverse()
        SnakeHeadX = dataArr[dataArr.length - 1][0]
        SnakeHeadY = dataArr[dataArr.length - 1][1]
    }
}

// запоминание координат змейки и тела
function memData() {
    if (dataArr.length < snakeLength) {
        dataArr.push([SnakeHeadX, SnakeHeadY])
    } else {
        // tableField[dataArr[0][0]][dataArr[0][1]].style.background = 'none'
        tableField[dataArr[0][0]][dataArr[0][1]].ggHere = false
        dataArr.splice(0, 1)
        dataArr.push([SnakeHeadX, SnakeHeadY])
        chengeHead()
        gameOver()


    }

}

// присваивание координат кеток 
function markCell() {
    for (let i = 0; i < dataArr.length; i++) {
        snake[i] = tableField[dataArr[i][0]][dataArr[i][1]]
            // snake[i].style.background = 'yellow'
        tableField[dataArr[i][0]][dataArr[i][1]].ggHere = true
    }
    moveImgHead()
    moveBodyImg()
    if (!mainTheme.play()) {
        mainTheme.play()
    }
}

// передвижение змейки в стороны
function moveBlockRight() {
    if (!snakeEat()) {
        SnakeHeadY++
    } else {
        SnakeHeadY
    }

    memData()
    chengeHead()
    markCell()


}

function moveBlockLeft() {
    if (!snakeEat()) {
        SnakeHeadY--
    } else {
        SnakeHeadY
    }

    memData()
    chengeHead()
    markCell()

}

function moveBlockUp() {
    if (!snakeEat()) {
        SnakeHeadX--
    } else {
        SnakeHeadX
    }

    memData()
    chengeHead()
    markCell()

}

function moveBlockDawn() {
    if (!snakeEat()) {
        SnakeHeadX++
    } else {
        SnakeHeadX
    }

    memData()
    chengeHead()
    markCell()

}

// назначения кнопк управления
document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyD') {
        cursNow = 'right'
        curs()
        moveBlockRight(snake)
        moveSnakeRigh()
        ggHereNow()
    }
})

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyA') {
        cursNow = 'left'
        curs()
        moveBlockLeft(snake)
        ggHereNow()
        moveSnakeLeft()
    }
})

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyW') {
        cursNow = 'up'
        curs()
        moveBlockUp(snake)
        ggHereNow()
        moveSnakeUp()
    }
})

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyS') {
        cursNow = 'dawn'
        curs()
        moveBlockDawn(snake)
        ggHereNow()
        moveSnakeDawn()
    }
})

// отслеживание змейки
function ggHereNow() {
    snake.ggHere = true
    console.log(arrCurs)
}

let snakeLength = 1
let interval = undefined

// присвоение головы
let snake = []
snake[0] = tableField[SnakeHeadX][SnakeHeadY]
    // snake[0].style.background = 'green'

let imgSnakeHead = snake[0].getBoundingClientRect()
let xAndYforImg = [imgSnakeHead.x, imgSnakeHead.y]

arrow.style.left = `${xAndYforImg[0]}px`
arrow.style.top = `${xAndYforImg[1]}px`
arrow3.style.left = `${xAndYforImg[0]}px`
arrow3.style.top = `${xAndYforImg[1]}px`

let snakeBodyImgArr = []

// передвижение картинок тела
function moveBodyImg() {
    for (let i = 0; i < snakeBodyImgArr.length; i++) {
        let info = snake[i].getBoundingClientRect()
        let xAndY = [info.x, info.y]
        snakeBodyImgArr[i].style.left = `${xAndY[0]}px`
        snakeBodyImgArr[i].style.top = `${xAndY[1]}px`
    }
}

// передвижени изображения головы
function moveImgHead() {
    imgSnakeHead = tableField[SnakeHeadX][SnakeHeadY].getBoundingClientRect()
    xAndYforImg = [imgSnakeHead.x, imgSnakeHead.y]
    arrow.style.left = `${xAndYforImg[0]}px`
    arrow.style.top = `${xAndYforImg[1]}px`
    arrow3.style.left = `${xAndYforImg[0]}px`
    arrow3.style.top = `${xAndYforImg[1]}px`
    if (
        tableField[SnakeHeadX][SnakeHeadY + 2].eatHere === true ||
        tableField[SnakeHeadX][SnakeHeadY + 1].eatHere === true ||
        tableField[SnakeHeadX][SnakeHeadY - 2].eatHere === true ||
        tableField[SnakeHeadX][SnakeHeadY - 1].eatHere === true ||
        tableField[SnakeHeadX + 1][SnakeHeadY].eatHere === true ||
        tableField[SnakeHeadX + 2][SnakeHeadY].eatHere === true ||
        tableField[SnakeHeadX - 1][SnakeHeadY].eatHere === true ||
        tableField[SnakeHeadX - 2][SnakeHeadY].eatHere === true
    ) {
        arrow.hidden = true
        arrow3.hidden = false
    } else {
        arrow3.hidden = true
        arrow.hidden = false

    }


}

// передвижение изображения еды
function moveImgApple() {
    let appleinfo = tableField[eatX][eatY].getBoundingClientRect()
    eatXandY = [appleinfo.x, appleinfo.y]
    apple.style.left = `${eatXandY[0]}px`
    apple.style.top = `${eatXandY[1]}px`
    apple.hidden = false
}

let eat = 0
let eatX = 0
let eatY = 0
let eatXandY = undefined

// начальная скорость предвижения змейки
let tempSnake = 700

// съедание фруктов
function snakeEat() {
    if (tableField[SnakeHeadX][SnakeHeadY].eatHere === true) {
        apple.hidden = true
        snakeLength++
        tableField[SnakeHeadX][SnakeHeadY].eatHere = false
        eat = 0
        fieldDecr()
        spawnHavchik()
        countEat++
        counterDiv.innerHTML = countEat
        tempSnake -= 20
        moveImgHead()
        creatBodyImg()
        eatSong.play()
        return snakeLength
    }
}

// появление еды
function spawnHavchik() {
    if (eat == 0) {
        eat = 1
        eatX = randomX()
        eatY = randomY()
        if (eatX > -1 && eatY > -1 && eatX < tRow && eatY < tData) {
            // tableField[eatX][eatY].style.background = 'black'
            moveImgApple()
            tableField[eatX][eatY].eatHere = true
        } else {
            eat = 0
            spawnHavchik()
        }
    }
}

// случайное число Х оси для еды
function randomX() {
    let random = Math.random() * tRow - 3
    random = Math.floor(random)
    return random
}

// случайное число У оси для еды
function randomY() {
    let random = Math.random() * tData - 3
    random = Math.floor(random)
    return random
}

// передвижение блоков в стороны
function moveSnakeRigh() {
    clearInterval(interval)
    interval = setInterval(() => moveBlockRight(snake), tempSnake)
}

function moveSnakeLeft() {
    clearInterval(interval)
    interval = setInterval(() => moveBlockLeft(snake), tempSnake)
}

function moveSnakeUp() {
    clearInterval(interval)
    interval = setInterval(() => moveBlockUp(snake), tempSnake)
}

function moveSnakeDawn() {
    clearInterval(interval)
    interval = setInterval(() => moveBlockDawn(snake), tempSnake)
}

let cursNow = undefined
let arrCurs = ['right', 'left', 'up', 'dawn']

// отслеживание направления змейки
function curs() {
    if (!arrCurs.includes(cursNow)) {
        arrCurs.push(cursNow)
    } else {
        for (let i = 0; i < arrCurs.length; i++) {
            if (arrCurs[i] == cursNow) {
                arrCurs.splice(i, 1)
                arrCurs.push(cursNow)
            }
        }
    }
}

spawnHavchik()

// Список для реализации

//  Игровое поле +
//  Голова змейки (навигация и перемещение) +
//  Тело змейки +
//  Хвост, который проходит по тем же точкам, что и Голова +
//  Возможность изгибаться (без косяков с оторванными кусками) +
//  Рост змейки +
//  Запрет на касание конца игрового поля +
//  Запрет на касание тела змейки +
//  Сделать внешние кнопки управления для телефонов
//  Реализовать разворот, чтоб жопа становилась головой +-

// последняя идея реализовать через поиск координат
// запоминать координаты головы в массив +

// нужно реализовать конец игры после касания змейки 
// своего тела или конца поля +

// Координаты головы змейки пушаться в конец массива 
// dataArr
// хвост змейки идем в начале массива  +

// Условие для активации функции изменение головы
// звучит как "если следующий блок равен предыдущему" +

// Нужно попробовать менять координаты гловы на координаты хвоста
// или можно ппробовать перевернуть массив и присвоить к переменной +

// Реализовать уменьшения поля после поедания +

// Сделать звуки

// Прикрепить картинку к голове змейки,
// рабочий метод getBoundingClientRect() +

// Сделать тело из картинок по аналогии с головой,
// создается новый элемент и привызявается к соответсвующей части +

// сделать картинки яблок , вместо черних квадратов +

// сделать аниамцию глаз и рта в зависимости от удаленности
// от яблока
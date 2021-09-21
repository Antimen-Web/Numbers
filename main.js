// Основные спрайты

window.addEventListener("orientationchange", function() {
    location.reload();
}, false);

let width = document.documentElement.clientWidth,
	height = document.documentElement.clientHeight;

const game = new PIXI.Application({ 
	width: width,
	height: height,
	backgroundColor: 0x4ccbd9,
});

document.body.appendChild( game.view );

const container = new PIXI.Container();
game.stage.addChild( container );

const backTexture = PIXI.Texture.from('images/background.jpg');

const back = new PIXI.Sprite( backTexture );

back.scale.set( width / 1920);

back.anchor.set(0.5);

container.addChild( back );

container.x = game.screen.width / 2;
container.y = game.screen.height / 2;

const wizardTexture = PIXI.Texture.from('images/wizard.png');

const wizard = new PIXI.Sprite( wizardTexture );
container.addChild( wizard );

wizard.scale.set( width * 0.4 / 1920);
wizard.anchor.set(-0.4, 0.5);


// Числа

let buttonContainer = document.querySelector('.button_container'),
 	buttons = buttonContainer.children,
	frag = document.createDocumentFragment();

buttonContainer.style.height = (width * 9 / 16)*0.8;
while (buttons.length) {
    frag.appendChild(buttons[Math.floor(Math.random() * buttons.length)]);
}
buttonContainer.appendChild(frag);

// Основные функции

const intro = document.querySelector('.introduction'),
	  ah = document.querySelector('.ah'),
	  oh = document.querySelector('.oh');

let numsSounds = document.querySelectorAll('.num');
let start = document.querySelector('.start');

start.addEventListener('click', () => {
	start.classList.toggle('disactive');
	buttonContainer.classList.toggle('active');
	intro.play();
	intro.onended = () => {
		play1();
	};
})

let buttons_list = document.querySelectorAll('.button');
let arrayNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

shuffle(arrayNum);

function numberContains(arr, elem) {
   	return arr.indexOf(elem) != -1;
}

let correct = 0; // Интервал (Подсказка после 30с)
let j = arrayNum.splice(0, 1); // Первое число
let numOfClicks = 0; // Счетчик ошибок
let counterBar = document.querySelector('.value');
let counterBarWidth = 0;
let farewell = document.querySelector('.farewell');

const listenerClick = (evt) => {
	if (numsSounds[j].classList.contains(evt.target.textContent) ) {
		j = arrayNum.splice(0, 1);
		if (j.length !== 0) {
			clearInterval(correct);
			counterBarWidth += 100/9;
			counterBarWidth = counterBarWidth;
			counterBar.style.width = counterBarWidth + '%';
			evt.target.animate([
				{ webkitBoxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' },
			  	{ webkitBoxShadow: '0 15px 20px rgba(46, 229, 157, .4)', backgroundColor: '#2EE59D' },
			  	{ webkitBoxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' }
			], {
			  	duration: 1000,
			  	iterations: 1
			});
			play1();
		} 
		else {
			clearInterval(correct);
			counterBarWidth += 100/9;
			counterBarWidth = counterBarWidth;
			counterBar.style.width = counterBarWidth + '%';
			evt.target.animate([
				{ webkitBoxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' },
			  	{ webkitBoxShadow: '0 15px 20px rgba(46, 229, 157, .4)', backgroundColor: '#2EE59D' },
			  	{ webkitBoxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' }
			], {
			  	duration: 1000,
			  	iterations: 1
			});
			farewell.classList.toggle('active');
			farewell.animate([
				{ opacity: '0' },
			  	{ opacity: '1' }
			], {
			  	duration: 1000,
			  	iterations: 1
			});
		}
	}
	else {
		if (numOfClicks % 2 == 0) {
			oh.play();
			evt.target.animate([
				{ webkitBoxShadow: '0 0 16px rgba(242, 5, 44, 0.5)', borderColor: 'rgba(242, 5, 44,0.5)' },
			  	{ webkitBoxShadow: '0 0 16px rgba(242, 5, 44, 1.0), 0 0 36px rgba(242, 5, 44, 1.0)', borderColor: 'rgba(242, 5, 44,1.0)', backgroundColor: 'rgba(242, 5, 44)' },
			  	{ webkitBoxShadow: '0 0 16px rgba(242, 5, 44, 0.5)', borderColor: 'rgba(242, 5, 44,0.5)' }
			], {
			  	duration: 1000,
			  	iterations: 1
			});
			numOfClicks++;
		}
		else {
			ah.play();
			ah.onended = () => {
				numsSounds[j].play();
			};
			evt.target.animate([
				{ webkitBoxShadow: '0 0 16px rgba(242, 5, 44, 0.5)', borderColor: 'rgba(242, 5, 44,0.5)' },
			  	{ webkitBoxShadow: '0 0 16px rgba(242, 5, 44, 1.0), 0 0 36px rgba(242, 5, 44, 1.0)', borderColor: 'rgba(242, 5, 44,1.0)', backgroundColor: 'rgba(242, 5, 44)' },
			  	{ webkitBoxShadow: '0 0 16px rgba(242, 5, 44, 0.5)', borderColor: 'rgba(242, 5, 44,0.5)' }
			], {
			  	duration: 1000,
			  	iterations: 1,
			});
			setTimeout(function() {
				right();
			}, 500);
			numOfClicks--;
		}
	}
}

const play1 = function() {
	numOfClicks = 0;
	numsSounds[j].play();
	for (let i = 0; i < numsSounds.length; i++) {
		buttons_list[i].removeEventListener('click', listenerClick);
		buttons_list[i].addEventListener('click', listenerClick);
		if (numsSounds[j].classList.contains(buttons_list[i].textContent) ) {
			correct = setInterval( right = function() {
				buttons_list[i].animate([
				  { webkitBoxShadow: '0 0 16px rgba(66, 140, 240, 0.5)', borderColor: 'rgba(0,0,255,0.5)' },
				  { webkitBoxShadow: '0 0 16px rgba(66, 140, 240, 1.0), 0 0 36px rgba(0, 140, 255, 1.0)', borderColor: 'rgba(0,0,255,1.0)', backgroundColor: 'rgba(66, 140, 240)' },
				  { webkitBoxShadow: '0 0 16px rgba(66, 140, 240, 0.5)', borderColor: 'rgba(0,0,255,0.5)' }
				], {
				  duration: 2000,
				  iterations: 1
				});
			}, 30000);
		}
	}
}
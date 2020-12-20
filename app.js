var $body = document.body;
var candidate;
var nummArray;

function pickNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    nummArray = [];
    for (var i = 0; i < 4; i += 1) {
        var pickedNum = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        nummArray.push(pickedNum);
    }
}

pickNumber();

var result = document.createElement('h1');
$body.append(result);
var $elementForm = document.createElement('form');
document.body.append($elementForm);
var $elementInput = document.createElement('input');
$elementForm.append($elementInput);
$elementInput.type = 'text';
$elementInput.maxLength = 4;
var $elementButton = document.createElement('button');
$elementButton.textContent = '입력!';
$elementForm.append($elementButton);

var wrongTimes = 0;
$elementForm.addEventListener('submit', function asycFunc(event) {
    event.preventDefault();
    var answer = $elementInput.value;
    if (answer === nummArray.join('')) {
        result.textContent = '홈런';
        $elementInput.value = '';
        $elementInput.focus();
        pickNumber();
        wrongTimes = 0;
    } else { // answer이 틀리면
        var answerArray = answer.split('');
        var strike = 0;
        var ball = 0;
        wrongTimes += 1;
        if (wrongTimes > 10) {
            result.textContent = '10번 넘게 틀려서 실패! answer은' + nummArray.join(',') + '였습니다!';
            $elementInput.value = '';
            $elementInput.focus();
            pickNumber();
            wrongTimes = 0;
        } else { // 10번 미만으로 틀린 경우
            console.log('answer이 틀리면', answerArray);
            for (var i = 0; i <= 3; i += 1) {
                if (Number(answerArray[i]) === nummArray[i]) {
                    console.log('같은 자리?');
                    strike += 1;
                } else if (nummArray.indexOf(Number(answerArray[i])) > -1) {
                    console.log('겹치는 숫자?');
                    ball += 1;
                }
            }
            result.textContent = strike + 'strike ' + ball + 'ball입니다.';
            $elementInput.value = '';
            $elementInput.focus();
        }
    }
});
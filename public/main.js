'use strict'

var ary1 = [];
var input_number = '';
var output_symbol = '';
var str = '';


var body = document.getElementById('body');
var introduction = document.getElementById('introduction');
var searchmove = document.getElementById('searchmove');
var searchtext = document.getElementById('searchtext');
var searchbtn = document.getElementById('searchbtn');
var searchwrap = document.getElementById('searchwrap');
var returntext = document.getElementById('returntext');
var erase = document.getElementById('erase');
var symbol = document.getElementById('symbol');
var symbolbox = document.getElementById('symbolbox');
var word = document.getElementById('word');
var wordbox = document.getElementById('wordbox');
var text = document.getElementById('text');
var pushbtn = document.getElementById('pushbtn');
var resetbtn = document.getElementById('resetbtn');
var tablebox = document.getElementById('tablebox');
var move = document.getElementById('move');
var back = document.getElementById('back');


introduction.addEventListener('mousedown', function () {
    introduction.style.opacity = '0';
    introduction.style.pointerEvents = 'none';
})

move.addEventListener('mousedown', function () {
    tablebox.style.display = 'block'
})

back.addEventListener('mousedown', function () {
    tablebox.style.display = 'none'
})

window.addEventListener("load", function () {
    setInterval(() => {
        wordbox.classList.toggle('center_light')
        symbolbox.classList.toggle('center_light')
    }, 2000);
})

resetbtn.addEventListener("mousedown", function () {
    str = ''
    text.textContent = str
    symbol.textContent = '';
    word.textContent = '';
    resetbtn.classList.add('resetbtn_light')
})
resetbtn.addEventListener("mouseup", function () {
    resetbtn.classList.remove('resetbtn_light')
})


var obj = [
    { name: "ア", number: "11011" },
    { name: "イ", number: "01" },
    { name: "ウ", number: "001" },
    { name: "エ", number: "10111" },
    { name: "オ", number: "01000" },
    { name: "カ", number: "0100" },
    { name: "キ", number: "10100" },
    { name: "ク", number: "0001" },
    { name: "ケ", number: "1011" },
    { name: "コ", number: "1111" },
    { name: "サ", number: "10101" },
    { name: "シ", number: "11010" },
    { name: "ス", number: "11101" },
    { name: "セ", number: "01110" },
    { name: "ソ", number: "1110" },
    { name: "タ", number: "10" },
    { name: "チ", number: "0010" },
    { name: "ツ", number: "0110" },
    { name: "テ", number: "01011" },
    { name: "ト", number: "00100" },
    { name: "ナ", number: "010" },
    { name: "ニ", number: "1010" },
    { name: "ヌ", number: "0000" },
    { name: "ネ", number: "1101" },
    { name: "ノ", number: "0011" },
    { name: "ハ", number: "1000" },
    { name: "ヒ", number: "11001" },
    { name: "フ", number: "1100" },
    { name: "ヘ", number: "0" },
    { name: "ホ", number: "100" },
    { name: "マ", number: "1001" },
    { name: "ミ", number: "00101" },
    { name: "ム", number: "1" },
    { name: "メ", number: "10001" },
    { name: "モ", number: "10010" },
    { name: "ヤ", number: "011" },
    { name: "ユ", number: "10011" },
    { name: "ヨ", number: "11" },
    { name: "ラ", number: "000" },
    { name: "リ", number: "110" },
    { name: "ル", number: "10110" },
    { name: "レ", number: "111" },
    { name: "ロ", number: "0101" },
    { name: "ワ", number: "101" },
    { name: "ヲ", number: "0111" },
    { name: "ン", number: "01010" },
    { name: '"', number: "00" },
    { name: "。", number: "00110" },
];


pushbtn.addEventListener("mousedown", function () {
    var d = new Date();
    var down = d.getTime();
    ary1.push(down);
    word.textContent = '';
    pushbtn.classList.add('pushbtn_light')
})


pushbtn.addEventListener("mouseup", function () {
    var d = new Date();
    var up = d.getTime();
    ary1.push(up);
    var inteval = ary1[1] - ary1[0];
    ary1 = [];
    check(inteval);

    var time = setTimeout(function () {
        match(obj, input_number);
        input_number = '';
    }, 800);

    pushbtn.addEventListener('mousedown', function () {
        clearTimeout(time);
    });

    pushbtn.classList.remove('pushbtn_light')
})


/*------------------------関数定義-------------------------*/

function check(interval) {
    if (interval < 200) {
        input_number += 0;
        output_symbol += '・'
    } else if (interval >= 200) {
        input_number += 1;
        output_symbol += 'ー'
    }
    symbol.textContent = output_symbol;
}


function match(obj, input_number) {
    if (str.length == 128) {
        str = ''
        text.textContent = str
    }

    for (var i = 0, len = obj.length; i < len; i++) {
        var object = obj[i];
        if (object.number == input_number) {
            word.textContent = object.name
            str = str + object.name + '　';
            text.textContent = str;
            output_symbol = '';
            return
        }
    }
    if (input_number.length >= 5) {
        str = str + 'X' + '　';
        text.textContent = str
        word.textContent = '認識できません';
        output_symbol = '';
    }

}


/*------------------------モールス信号検索-------------------------*/

searchmove.addEventListener('click', function () {
    searchwrap.style.display = 'block'
})

erase.addEventListener('click', function () {
    searchwrap.style.display = 'none'
})

searchbtn.addEventListener('click', function () {
    searchText(obj);
})

function searchText(obj) {
    const inputstr = searchtext.value
    const inputstr_test = /^[\u30A0-\u30FF]+$/
    if (inputstr.length > 1) {
        returntext.textContent = '一文字までしか検索できません'
        return
    }  else if (inputstr == '1' || inputstr == '１') {
        returntext.textContent = '・・　( トン トン )'
        return
    } else if (inputstr == '2' || inputstr == '２') {
        returntext.textContent = '・・ーー・　( トン トン ツー ツー トン )'
        return
    }else if (inputstr.length == 0 || !inputstr_test.test(inputstr)) {
        returntext.textContent = 'カタカナを入力してください'
        return
    } else if (inputstr_test.test(inputstr)) {
        for (var i = 0, len = obj.length; i < len; i++) {
            var object = obj[i];
            if (object.name == inputstr) {
                const middle1 = String(object.number).replace(/(0)/g, '・');
                const return_symbol = middle1.replace(/(1)/g, 'ー');
                const middle2 = String(object.number).replace(/(0)/g, ' トン ');
                const return_read = middle2.replace(/(1)/g, ' ツー ');
                returntext.textContent = return_symbol + '　(' + return_read + ')'
                return
            }
        }
    }
}


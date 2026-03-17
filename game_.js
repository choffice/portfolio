for(ele of document.body.children){
  ele.id = ele.tagName.toLowerCase();
};

//타이핑 함수(텍스트, 입력창, 스피드)
let typing;
function typ(txt, prompter = document.body, speed = 50){
clearInterval(typing);
let phrase = txt;
let letter_num = 1;
typing = setInterval(function() {
prompter.innerHTML = phrase.substr(0, letter_num);
letter_num++;
if (letter_num > phrase.length) {
clearInterval(typing);
}}, speed);
}

//모음(), 명령(), 과거(), 수동(), 수형()

let j = 44032;let j_arr = [j];for(y of Array(18)){j_arr.push(j+=588);}
//[모음(ㅇ),초성+ㅏ의 기준 코드,+중성*28용 코드,+종성 코드] 배열 반환
function 모음(말){
//중성변화
//let i = 44032;let i_arr = [i];for(x of Array(20)){i_arr.push(i+=28);}
//초성변화

let 초성 = j_arr[parseInt((말.charCodeAt()-44032)/588)];
let 중성 = parseInt((말.charCodeAt()-초성)/28);
let 종성 = (말.charCodeAt()-초성)%28;

return [String.fromCharCode('아'.charCodeAt()+중성*28), 초성, 중성, 종성];
}

//원형의 초성을 두고 활용형의 중성과 종성을 적용해 반환
function 활용(원형, 활용형, 원 = 모음(원형), 활 = 모음(활용형)){
return String.fromCharCode(원[1]+활[2]*28+활[3]);
}

//위 중종성 변환 공식에 근거, 종성 인덱스를 구하는 공식은 '(받침자.charCodeAt()-무받침.charCodeAt())%28'

//'~해체' 명령을 반환 - 형용사는 ,1을 붙여줘야 아,애,어,이에서 구분
function 명령(동사, 형용사 = 0, 어근 = 동사.substring(0, 동사.length-1), 꼬리 = 어근[어근.length-1], 일반화 = 모음(꼬리), 결과 = ''){

//어근 = 막/어근 달리 예외는 따로 다루어야 한다
if(꼬리 == '하') 결과 = 어근.replace(꼬리, '해');
else if(꼬리 == '되') 결과 = 어근.replace(꼬리, '돼');
else{
switch(일반화[0]){
case '아': case '애': case '에': if(일반화[3] > 0){결과 = 어근+'아'; if(일반화[3] == 17 && 형용사 == 1) 결과 = 어근.replace(꼬리,String.fromCharCode(일반화[1]+일반화[2]*28))+'워';} else 결과 = 어근; break;
case '어': case '외': if(일반화[3] > 0){ 결과 = 어근+'어'; if(일반화[3] == 17 && 형용사 == 1) 결과 = 어근.replace(꼬리,String.fromCharCode(일반화[1]+일반화[2]*28))+'워';} else 결과 = 어근; break;
case '여': 결과 = 어근.replace(꼬리,String.fromCharCode(일반화[1]+일반화[2]*28))+'워'; break;
case '이': 어근==꼬리? 결과 = 어근+'어' : 결과 = 어근.replace(꼬리,활용(꼬리,'여')); if(일반화[3] == 17 && 형용사 == 1) 결과 = 어근.replace(꼬리,String.fromCharCode(일반화[1]+일반화[2]*28))+'워'; break;
case '오' : 일반화[3] > 0? (일반화[3] == 17? 결과 = 어근.replace(꼬리,활용(꼬리,'오'))+'와' : 결과 = 어근+'아') : 결과 = 어근.replace(꼬리, 활용(꼬리,'와')); break;
case '우' : 일반화[3] > 0? (일반화[3] == 17? 결과 = 어근.replace(꼬리,활용(꼬리,'우'))+'워' : 결과 = 어근+'어') : 결과 = 어근.replace(꼬리,활용(꼬리,'워')); break;
case '위' : 결과 = 어근.replace(꼬리,활용(꼬리,'여')); break;
case '으': let 세글자 = 어근[어근.length-2]; if(세글자 == undefined) 어근.replace(꼬리, 활용(
꼬리, '어')); else{let 새글자 = 모음(세글자); if(꼬리 == '르') 세글자 = String.fromCharCode(새글자[1]+새글자[2]*28+8); ['아','오'].indexOf(새글자[0]) > -1? 결과 = (어근.substr(0,어근.length-2)+세글자) + 활용(꼬리,'아') : 결과 = (어근.substr(0,어근.length-2)+세글자) + 활용(꼬리, '어');}break;
}

let 예외 = {'지다':'져','짓다':'지어','듣다':'들어','긋다':'그어','쩐다':'쩔어','푸르다':'푸르러','꼽다':'꼽아','좁다':'좁아','비좁다':'비좁아'}
if(예외[동사]!=undefined) 결과 = 예외[동사];
}
return 결과;
}

//명령문을 근거로 과거형의 어근을 반환 (+ 어미)만 해주면 됨
//형용사는 보통 과거형, 그러나 일부는 현재형, 형용사 분리할까 생각 중...
function 과거(동사, 해체 = 명령(동사), 초중 = 모음(해체[해체.length-1])){
return 해체.replace(해체[해체.length-1], String.fromCharCode(초중[1]+초중[2]*28+20));
}

//동사 - 완료(0)/진행(1)/예상(2)
function 수동(동사, 시제 = 0, 어근 = 동사.substr(0,동사.length-1), 꼬 = 어근[어근.length-1], 꼬리 = 모음(꼬), 종성 = 4, 어미 = '은', 결과 = ''){
if(시제==1) {어미 = '는'; 꼬리[3] == 8 ? 결과 = 어근.replace(꼬,String.fromCharCode(꼬리[1]+꼬리[2]*28))+어미 : 결과 = 어근+어미;}
else{if(시제 == 2) {종성 = 8; 어미 = '을';}
if(꼬리[3] == 8 || 꼬리[3] == 0) 결과 = 어근.replace(꼬,String.fromCharCode(꼬리[1]+꼬리[2]*28+종성)); else 결과 = 어근+어미;

let 예외 = {'짓':'지','듣':'들','긋':'그','잇':'이','걷':'걸'}
if(예외[꼬] != undefined) 결과 = 어근.replace(꼬,예외[꼬])+어미;
}
return 결과;
}

//형용사 수식형 던/운/울
function 수형(형용사, 시제 = 0, 어근 = 형용사.substr(0, 형용사.length-1), 꼬 = 어근[어근.length-1], 꼬리 = 모음(꼬), 어미 = '던', 종성 = 4, 결과 = ''){
결과 = 어근+어미;
if(시제 != 0){시제 == 1? 어미 = '은' : (어미 = '을', 종성 = 8);
switch(꼬리[3]){
case 17: 시제 == 1? 어미 = '운' : 어미 = '울';
결과 = 어근.replace(꼬, String.fromCharCode(꼬리[1]+꼬리[2]*28)) + 어미;break;
case 4: case 8: case 0:
결과 = 어근.replace(꼬, String.fromCharCode(꼬리[1]+꼬리[2]*28+종성));break;
case 20: if(시제 == 1) 어미 = '는';

default: 결과 = 어근+어미;
}
}

return 결과;
}

//랜덤함수
function rand(max, min = 0, gap = 1, rs = 0){
let tmpmax = [];
if(typeof(max) == 'object'){
if(max.length == undefined){for(mkey in max){tmpmax.push(mkey);}}
else tmpmax = max.slice(0,max.length);}
typeof(max) == 'object' ? rs = tmpmax[Math.floor(Math.random()*tmpmax.length)] : rs = Math.floor(Math.random()*((parseInt(max-min)/gap)+1))*gap+min;
return rs;
}

//조사 함수
function ko_tail(lst,ex){
let pos = ['을/를','이/가','이다/다','으로/로','과/와','이랑/랑','이나/나','이라면/라면','으로서/로서','으로써/로써','여서/이어서','이라/라','이란/란','이라는/라는','은/는','으려/려','으러/러','이니/니','이지/지','아!/야!','아,/야,','아~/야~'];
let rs = '';
for(tail of pos){
if(tail.split('/').indexOf(ex) > -1){
pos = tail.split('/');break;}
}
(lst[lst.length-1].charCodeAt()-44032)%28 == 0?rs = pos[1]:rs = pos[0];

//구분이 필요한 조사가 아닐 때
if(rs.indexOf('/')>-1) rs=ex;

return lst+rs;
}

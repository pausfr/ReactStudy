export function getRandomInteger(from, to){
    return Math.floor(Math.random() * to + from);
    //from이 1이라면 문제 없지만 2이상일 때 의도대로 작동될 지 의문..
}
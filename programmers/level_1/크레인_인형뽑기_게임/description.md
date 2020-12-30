# 크레인 인형뽑기 게임

[문제 원본 프로그래머스에서 보기](https://programmers.co.kr/learn/courses/30/lessons/64061)

<img alt="이상해씨" src="../../../images/programmers/level_1/인형뽑기.jpg" width="400px" height="500px"/>

> 사진 출처: [오버워치 인벤](http://www.inven.co.kr/board/overwatch/4538/3289258)

## 🚀 문제 개요

2019 카카오 겨울 인턴쉽 코딩테스트에 나온 문제라 공식 풀이가 따로 존재 합니다.

> 해설 보러가기: [Kakao Tech](https://tech.kakao.com/2020/04/01/2019-internship-test/)

### 주요 개념

- Stack

### 제한 사항

- board 배열은 2차원 배열로, 크기는 5x5 이상 30x30 이하입니다.
- board의 각 칸에는 0 이상 100 이하인 정수가 담겨져 있습니다.
- 0은 빈 칸을 나타냅니다.
- 1 ~ 100의 각 숫자는 각기 다른 인형의 모양을 의미하며, 같은 숫자는 같은 모양의 인형을 나타냅니다.
- moves 배열의 크기는 1 이상 1,000 이하입니다.
- moves 배열 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수 입니다.

## 문제 풀이

> 나의 풀이: [보러가기](https://github.com/Minsoo-web/js_algorithm/blob/master/programmers/level_1/%ED%81%AC%EB%A0%88%EC%9D%B8_%EC%9D%B8%ED%98%95%EB%BD%91%EA%B8%B0_%EA%B2%8C%EC%9E%84/my_solution.js)

### ⚠️ 주의

문제를 풀기 전, 하나 짚고 넘어가야 하는 것이 있습니다.  
바로 board 배열의 구성입니다.

문제에 2차원 배열이 어떤 식으로 놓이는지 설명이 부족해서 유추를 해야 하는 점이 조금 아쉬웠습니다.

`[[0,0,0],[0,1,1],[1,1,1]]`

이런 3x3 형태의 board 배열이 주어진다면

```txt

  * *
* * *
```

이렇게 쌓이는 구조입니다.

```txt
    *
  * *
  * *
```

이게 아닙니다...! ~~저만 헷갈렸을 수도~~

### 접근

1\.  
처음에 제 접근 방법은 무식하게도(?) board를 새로 구현해야 한다는 생각이었습니다.  
왜 이런 생각을 하게 되었냐면 board 위에서도 똑같은 인형이 쌓이면 터진다는 제 착각 때문에  
터지고 난 다음의 board를 구현한 뒤 문제 풀이를 해야 하는 거라고 생각했습니다.

![이마 탁](https://media.vlpt.us/images/gomjellie/post/ed949d50-2b32-4599-8f7f-d2dcfd44f50c/omg.gif)

> 🤦 문제를 똑바로 읽자

이걸로 삽질을 수어번 하고 난 뒤, 입력 값으로 주어진 board 배열을 그냥 활용하면 된다는 것을 알게 되었습니다. 😇

2\.  
제가 작성한 의사 코드는 다음과 같습니다.

1. moves 배열이 끝날때까지 반복
2. moves 배열의 각 요소에 맞는 board 배열의 인형을 찾습니다. 이 때 요소는 0이 아닌 요소여야 합니다.
3. 인형을 바구니에 담습니다.  
   3-1. 바구니에 인형이 하나라도 있다면 -> 3-2번  
   3-3. 바구니의 가장 위에 위치한 인형과 비교하여 같으면 터뜨리고 result의 갯수를 2만큼 증가 시킵니다.  
   3-2. 1번으로 이동

> 🙇‍♂️ 의사 코드 작성이 많이 어색해서 죄송합니다.

### 코드 구현

1\.  
먼저 1번 라인은 `for ... of` 문을 사용했습니다.

```JavaScript
for (let x of moves) {
    // x는 인형뽑기 column number
    x = x -1;
}
```

여기서 주의해야 할 점은 배열의 index를 활용해 위치를 찾는다면 -1을 해주어야 한다는 점입니다.

> 문제에서 column 숫자는 1 부터 시작합니다.

2\.  
column number의 가장 상위 요소 인형을 찾습니다.  
각 컬럼의 최상단부터 0이 아닌 요소를 찾기 위해 반복문을 사용했습니다.

```JavaScript
for (let x of moves) {
    x = x - 1;
    for (let i = 0; i < board.length; i++) {
      if (board[i][x] !== 0) {
        stack.push(board[i][x]);
        board[i][x] = 0;
        break;
      }
    }
}
```

`break` 문을 사용하기 위해 `forEach`나 `for...of` 문을 사용하지 않았습니다.

3\.  
바구니에 인형 담기  
풀 때는 몰랐는데 `while` 문은 사용하지 않아도 됩니다. (stack 구조라 연쇄적으로 인형이 터지는 일은 없기 때문)
`slice` 를 사용한 이유는 마지막 요소를 뽑기 위해 사용했으며  
`stack[stack.length -1]` 이라고 해도 무방합니다.

최종 코드

```JavaScript
function solution(board, moves) {
  let answer = 0;
  let stack = [];

  for (let x of moves) {
    x = x - 1;
    for (let i = 0; i < board.length; i++) {
      if (board[i][x] !== 0) {
        stack.push(board[i][x]);
        board[i][x] = 0;
        break;
      }
    }

    while (stack.length > 1) {
      let temp = stack.pop();
      if (temp === stack.slice(-1)[0]) {
        stack.pop();
        answer += 2;
      } else {
        stack.push(temp);
        break;
      }
    }
  }
  return answer;
}

```

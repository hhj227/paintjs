# 그림판 사이트

## 기능
1. 다양한 색으로 그림 그리기
2. 그린 그림 저장

### 결과
![result](https://github.com/hhj227/Paint-JS/blob/master/image/result.gif)


### 개발 계기
웹 개발에 대해 학습하고 JavaScript를 배우기 위해 개발

#### 학습 방법
Nomad Coders 유튜브에서 강의를 들으며 공부
- 출처: https://academy.nomadcoders.co

#### 준비물
 - Visual Studio Code
 - Chrome
 - Github

#### Open Source
- CSS Tools: Reset CSS https://meyerweb.com/eric/tools/css/reset/

### 개발 순서
1. index.html, style.css, app.js 생성
2. reset.js(https://meyerweb.com/eric/tools/css/reset/) 인터넷에서 가져와서 style.css에서 import 시키기
3. 기본 화면 만들기
   1. Background Color 입히기
   2. Canvas 생성
   3. 팔레트 생성
   4. 붓사이즈 변경을 위한 range 생성(https://www.w3schools.com/tags/att_input_type_range.asp)
   5. 채우기, 저장 버튼 생성
   6. 그림자, 모서리 처리 등 스타일링
4. 그림 그리기
   1. Canvas 위에 마우스를 위치했을 때 x, y 좌표 얻기
   2. 캔버스를 마우스로 클릭하는 순간과 떼는 순간을 감지하여 painting이 true 상태일때 x,y좌표의 픽셀에 색 입히기
   3. 색 버튼 클릭하면 RGB color 바꿔조기
   4. range 값에 따라 픽셀 사이즈 조절하여 붓 크기 조절하기
   5. 배경화면 색 채우기
      1. paint, fill 버튼 토글시키기
      2. 버튼이 fill 상태일 때 색 버튼 클릭하면 선택한 색으로 배경화면 채우기
5. 그림 저장하기
   1. image를 dataURL로 바꾸어 저장한다.



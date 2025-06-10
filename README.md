# Beatopia - Beat + Utopia

Beatopia는 Beat + Utopia의 합성어로, 자신이 즐기는 음악을 추천받고 자유롭게 공유할 수 있다는 의미를 담았습니다.



# 프로젝트 참여자

서수현, 조원종, 조지훈



# 프로젝트 구성 / 기술 스택

FrontEnd = Phaser3 + React JS + bootstrap <br />
BackEnd = nodeJS + express / MySQL <br />

**최종 branch**: master <br />


![image](https://github.com/user-attachments/assets/c558a283-fcc2-44a5-a230-00445b254b90)


**커뮤니티 기능**은 클라이언트-서버 아키텍처를 기반으로, **React**, **Node.js**, **MySQL**을 사용하여 구현하였습니다. 배포는 **Railway**와 **Netlify**를 활용하여 수행했습니다. <br />

**게임 기능**은 **JavaScript**와 **Phaser.js** 라이브러리를 사용하여 클라이언트 측에서 구현하였으며, 서버와의 원활한 연동을 통해 실시간 상호작용을 구현했습니다. <br />

**음악 추천 알고리즘**은 **Spotify API**와 **JavaScript**를 활용하여 개발되었으며, 추후에는 해당 알고리즘에 머신러닝 모델을 적용하여 추천 정확도를 높일 예정입니다. 이를 위해 데이터를 기반으로 모델을 학습시킬 계획입니다. <br />



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 최종 배포 사이트

https://sweng.site/ 

# 프로젝트 구조

<img width="792" alt="image" src="https://github.com/user-attachments/assets/b77c270d-35f8-4ff7-b4d3-2c3bde3296ad" />



# 주요 기능

## 1. Game Page

- Play beats! 버튼을 통해 게임을 진행할 수 있습니다.
  <img width="832" alt="image" src="https://github.com/user-attachments/assets/30229d1f-7217-49da-b29c-8e6568c76060" />

- 게임은 총 3개의 스테이지로 이루어져 있으며, 음표 아이템을 먹을때마다 스코어가 +100점, 각 스테이지의 엔딩 (music box 터치)에 다다를때마다 +1000점을 얻습니다.
- 각 스테이지의 엔딩에는 사용자를 위한 설문이 랜덤으로 등장하며, 이 질문은 사용자의 음악 취향을 알기 위해 준비된 질문입니다.
- 각 질문은 spotify api에 정의되어 있는 요소들과 연결하기 위한 질문입니다. 
  <img width="964" alt="image" src="https://github.com/user-attachments/assets/af5f1407-fc72-4cde-be3e-c660ccd2344c" />
(이미지 출처 kaggle, 각 필드에 대한 설명 및 출처: https://developer.spotify.com/documentation/web-api/reference/get-audio-features)
- 기본으로 1곡이 추천되며, 스코어에 따라 0-1000점 = 1곡, 1000-2000점 = 2곡 과 같은 형식으로 1000점 단위로 추천 곡 수가 달라집니다.
- 목숨은 최대 3개이며, 장애물에 닿으면 1초간 무적이됩니다. 목숨이 모두 소진될 경우 game over가 선언되며, 그 순간의 스코어로 추천 플레이리스트를 구성합니다.
- 게임이 끝나면 팝업 형태로 추천 플레이리스트를 띄워줍니다. 이때 팝업 하단을 통해 내 플레이리스트로 이동할 수 있습니다. 

+) 추후 스테이지가 추가될 예정이며, 사용자의 걸음 방향, 점프 횟수, 빠르게 달리기 등을 통해 머신러닝으로 데이터를 추가 수집 및 추천장르를 정의할 예정입니다.

## 2. Home Page
![홈](https://github.com/user-attachments/assets/80c89b22-4902-48ca-ac2a-5908bfc7572e)
- 웹의 홈페이지입니다. 유저 친화적인 인터페이스로, 헤더와 사이드바, 배너, 랭킹 컴포넌트 등등을 관리합니다.
  
## 3. Playlist Page
![내음악](https://github.com/user-attachments/assets/3800cb58-51fa-4e9c-b312-94aae58e0515)
- 게임을 통해서 생성한 사용자 맞춤 플레이 리스트를 관리하는 페이지입니다.
- 각 플레이리스트들을 클릭하면 디테일 모달이 열리며, 해당 섹션에서 트랙 선택 및 SPOTIFY에서 듣기, 리뷰 작성이 가능합니다.
  
## 4. Review Page
![감상평](https://github.com/user-attachments/assets/cab38a70-0005-46ce-8f1a-2993886024dd)
- 플레이 리스트 페이지에서 생성된 감상평들을 감상하고, 댓글 및 답글 좋아요 링크 등과 같은 기능을 사용 할 수 있는 페이지입니다.
- 감상평에 댓글 버튼을 누르면, 댓글 모달이 열리며 거기서 댓글쓰기, 답글쓰기 같은 이벤트 처리가 가능합니다.

## 5. Login/Register Page
![로그인_회원가입](https://github.com/user-attachments/assets/bbb4a576-bdab-4b9d-8df8-5f889a164104)
- 회원의 기본 정보를 관리할 수 있게 서버 데이터베이스와 연동하여 회원관리를 하는 페이지입니다.
- 회원가입은 총 3단계로 진행하며, password인증 이메일 형식 인증 등이 적용됩니다.

## 6. Myinfo Page
![내정보](https://github.com/user-attachments/assets/78b715b9-e75d-4181-993d-39464cdc9a0f)
- 사용자에 프로필을 등록할 수 있고, 사용자 정보를 간략하게 확인할 수 있는 페이지입니다.

## 프로젝트 실행 방법

1. npm install

2. `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



## 시연 영상

시연 영상의 크기가 너무 커 직접 등록이 불가능해 구글 드라이브의 링크로 첨부합니다.

https://drive.google.com/file/d/1p9JjIHDY9mvltfq0VpMXUSWOusg6vk0B/view?usp=sharing

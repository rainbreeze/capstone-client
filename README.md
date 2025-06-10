# Beatopia - Beat + Utopia

Beatopia는 Beat + Utopia의 합성어로, 자신이 즐기는 음악을 추천받고 자유롭게 공유할 수 있다는 의미를 담았습니다.



# 프로젝트 참여자

서수현, 조원종, 조지훈




# 프로젝트 구성

FrontEnd = Phaser3 + React JS + bootstrap <br />
BackEnd = nodeJS + express / MySQL



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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





## 프로젝트 실행 방법

1. npm install

2. `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# 그 외 npm 명령어 (참고용)

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

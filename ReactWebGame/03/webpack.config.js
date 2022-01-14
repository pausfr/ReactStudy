// 강의의 코드 오류로 강사 깃허브에서 복붙. 또한 같이 복붙한 package.json에 기록된 패키지 다운

const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "word-relay-dev", // 웹팩에서 관리할 이름
  mode: "development", // 실서비스에서는 production으로 바꿈.
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx"], // 이렇게 하면 엔트리 배열에서 확장자도 쓸 필요가 없다.
  },
  // 아래 entry는 입력을 의미, output은 출력을 의미
  entry: {
    app: "./client",
  }, // 입력 , 다른 파일이 불러오는 파일은 여기서 추가로 기입할 필요 없다. 여기선 "./WordRelay.jsx"
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 정규표현식 따로 공부 . . .
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["> 1% in KR"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"], // 최신 문법을 리로딩할 때 할 리로딩 기능도 해줌
        }, // 바벨의 옵션을 여기 넣어줌
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.s?[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"), // 노드js 에서 경로를 쉽게 조작하도록 path를 사용할 수 있음.
    publicPath: "/dist", // path.join을 하면 경로를 자동으로 합쳐줌. __dirname은 현재 폴더 안을 말함.
    filename: "[name].js",
  }, // 출력
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) }, // 스태틱은 실제로 존재하는 정적 파일의 경로 기입
    hot: true,
  }, // 웹팩 데브 서버의 역할: 실행한 결과를 dist패스에 저장해줌, 핫 리로딩 기능: 변경점을 자동으로 인식
}; // 또한 로컬호스트 8080에 코드가 뜨게 됨. 실시간으로 수정 가능.

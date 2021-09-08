# domain-redirector
서브도메인을 추출해 특정 디렉토리의 static file을 render 해주는 간단한 웹 서버

## 무슨 스크립트인가요?
웹 서버 도메인이 preview.minjun.kaaang.dev라고 가정하면, asdf.preview.minjun.kaaang.dev로 접속하면 commits/asdf 안에 있는 static file를 serve합니다.
Reverse Proxy를 셋팅하면 스크립트 없이도 사용 가능하겠지만, 간단한 구현을 위해 작성한 스크립트입니다.

## 왜 사용하나요?
static webpage를 퍼블리싱하거나, React 등 프로젝트를 진행할 때 기획자/디자이너에게 feature를 공유하는 것이 어려웠습니다.
CRA의 live-server를 사용하면 코드를 수정할 때마다 변경되어 feature를 보여주기 쉽지 않았고, 매번 빌드하여 로컬에서 웹 서버를 실행하여 링크를 공유해주자니 너무 복잡했습니다.
게다가 같은 네트워크가 아니라면 ngrok 등의 tunnel 툴을 사용하거나 포트포워딩 등을 사용해야 했었기 때문에 보안 문제나 번거로운 문제도 있었습니다.

이때, 이 스크립트를 빌드 서버에 설치하면 각 commit별로 서브도메인에서 빌드 결과물을 볼 수 있기 때문에, 디자이너/기획자에게 feature 개발 결과물을 보여주기가 쉽습니다.

Github Actions를 통해 SSH로 빌드 서버에 접속해 script를 실행하여 commits/ 디렉토리 안에 빌드 결과물을 자동으로 저장하면 쉽게 사용할 수 있습니다.
React 프로젝트에 사용한 샘플 Script를 [여기](https://github.com/runasy-koonta/domain-redirector/blob/main/REACT_TEST_SCRIPT.sh)에서 확인하실 수 있습니다.
이 스크립트는 실행 시 Repo의 모든 commit을 불러와 build 되지 않은 commit을 build하고 자동으로 commits/[commit hash]에 저장해줍니다.

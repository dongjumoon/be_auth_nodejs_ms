# 커피공장 마이크로 서비스 

### 로컬 개발환경
- mongodb 설치 https://www.mongodb.com/try/download/community
- clone 이후 프로젝트 최상단에 .env 파일 생성 후 "PORT=3000" 과 같이 포트설정 후

```
# 몽고디비 환경설정에 등록
export MONGO_HOST=[트렐로참고]
# 인스톨
yarn 
# 개발환경 실행
yarn dev 
# 운영환경 실행
yarn start
```

### 회원가입

- POST 요청 : localhost:3000/api/user
- param : user_id=[이메일]

### 도커빌드
docker build --tag be_auth_nodejs_ms_prod:0.1 .
docker build -f Dockerfile-Dev --tag be_auth_nodejs_ms_dev:0.1 .
### 도커운영 실행 
docker run --name be-auth-nodejs-ms-prod -e MONGO_HOST=$MONGO_HOST -d -p 4000:8888 be_auth_node_ms_prod:0.1
### 도커데브 실행 
sudo docker run --name be-auth-nodejs-ms-dev -e MONGO_HOST=$MONGO_HOST -d -p 3000:8888 be_auth_nodejs_ms_dev:0.1
### 도커확인
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS                    NAMES
f453061f667c        be_auth_nodejs_ms_dev:0.1   "docker-entrypoint.s…"   3 seconds ago       Up 2 seconds        0.0.0.0:8888->8888/tcp   be-auth-nodejs-ms-dev
### 접속
curl localhost:8888
### 인그레스 연결 : /etc/hosts
localhost 아이피주소
### 도커컴포즈 실행
docker-compose up --build -d
### 도커컴포즈 중지
docker-compose down 


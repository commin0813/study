#  **SPRING Study Diary**

## 2019.12.27

> 초기 SPRING 개발을 위한 환경 셋팅

##### 1.choco 설치
<관리자모드 CMD 창에서>
- @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

##### 2.maven 설치
- choco install maven
- refreshenv
- mvn --version

##### 3.Itellij 설치
- Lombok 설치
  - Intellij Idea 에서 Preference -> Plugins -> Browse Repositories 에 들어가 ‘Lombok Plugin’ 을 추가한다.
  - Prepference -> Build, Execution, Deployment -> Compiler -> Annotation Processors :  ‘Enable Annotation Processors’ 체크
  - MAVEN : [https://search.maven.org/artifact/org.projectlombok/lombok/1.18.10/jar]()
- javax:servlet 설치
  - MAVEN : [https://search.maven.org/artifact/javax.servlet/javax.servlet-api/4.0.1/jar]()
- maven war 설치
  - MAVEN : [https://maven.apache.org/plugins/maven-war-plugin/usage.html]()
- Apache Tomcat 설치
  - Apache Tomcat version 8.5 implements the Servlet 3.1
  - Apache Tomcat version 9.0 implements the Servlet 4.0
  - tomcat 에 webapps 폴더에 war 파일을 넣으면 자동으로 압축을 푼다.
  - web.xml 에서 설정한 경로를 입력하면 Servlet이 동작한다.
  

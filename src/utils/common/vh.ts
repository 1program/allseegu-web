/**
 * iOS Safari의 'vh'는 툴바를 포함한다는 문제점이 있다.
 * 모바일앱 형태의 웹어플리케이션을 구현하려 하면 사용성에 문제가 따른다.
 * window.innerHeight는 툴바를 제외한 실제 vh를 리턴한다.
 * 실제 vh를 제공한다.
 *
 * https://dmstjq92.medium.com/%EB%AA%A8%EB%B0%94%EC%9D%BC-ios-safari-chrome-%EC%97%90%EC%84%9C-100vh-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%83%9D%EA%B8%B0%EB%8A%94-%EB%AC%B8%EC%A0%9C-%EC%A2%85%EA%B2%B0-682c5e9d068d
 */
export function realVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

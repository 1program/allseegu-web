# allseegu-web

## 개발환경

| 항목    | 버젼     |
| ------- | -------- |
| Node.js | v15.14.0 |

## 프로젝트 설치

```
npm install
```

### 개발

```
npm run serve
```

### 빌드

```
npm run build
```

### 린트

```
npm run lint
```

## 코드 컨벤션 및 규칙

프로젝트를 개발한 담당자가 끝까지 이를 유지보수 할 확률은 낮다.<br />
통일된 컨벤션을 따르고 준수함 및 적극적인 문서화는 협업 및 프로젝트 성공에 크게 기여하며,<br />
추후의 유지보수에 큰 편리를 가져다 준다.

### 파일 구성 규칙

- 컴포넌트 파일명은 `PascalCase` (ex. `[ComponentName].vue`)로 구성한다.
  사용시에는 HTML5 custom element casing 규칙을 준수하여 사용한다. (`<component-name />`)

- route 파일명은 `param-case` (ex. `/account/find-password.vue`)로 구성한다.
  path 구조에 따라 중첩 폴더로 구성한다.
  (ex. `/account/find-password/done` => `/account/find-password/done.vue`)

### Vue 3 Composition API + Typescript 사용

해당 프로젝트는 Vue Options API 사용을 지양하고 Vue Composition API를 적극 사용한다.
관련 데이터/computed 속성/메서드를 묶어 관리 하여 유지보수를 용이하게 하기 위함이고
타입스크립트 지원으로 유지보수 및 인수인계를 용이하게 하기 위함이다.

### 전역 컴포넌트 등록 지양

Typescript를 활용시 에디터에서 바로 component의 타입을 확인할 수 있어, 개발이 빠르다.
전역 컴포넌트 등록시 타입 지원이 사라지기 때문에, 이를 지양한다.

### SCSS 사이징

작은 화면의 모바일을 대비하기 위해 rem을 적극 활용한다. (1rem -> 16px)

PSD 디자인에는 수치가 2배수로 표현되어 있다.

이를 바로 참조/수정하기 위하여 `(원본수치(px) / 2배수 / 16) * 1rem;` 으로 계산하여 수치를 기입한다.

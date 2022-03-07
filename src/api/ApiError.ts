/**
 * API Client library를 변경해도 작동하도록 Custom Error class를 만든다.
 * 앱 전체 API 통신에서 발생하는 에러를 표현한다.
 * 세부사항이 더 필요할 경우 필드를 추가하도록 한다.
 */
export default class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);

    // Extending Error class in typescript
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
    };
  }
}

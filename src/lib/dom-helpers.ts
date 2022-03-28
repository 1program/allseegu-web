import { Observable } from "rxjs";

export type Size = {
  width: number;
  height: number;
};

export type Position = {
  left: number;
  top: number;
};

export function getScrollPosition(el: HTMLElement) {
  return {
    left: el.scrollLeft,
    top: el.scrollTop,
  };
}

export function getScrollSize(el: HTMLElement) {
  return {
    width: el.scrollWidth,
    height: el.scrollHeight,
  };
}

export function getClientSize(el: HTMLElement) {
  return {
    width: el.clientWidth,
    height: el.clientHeight,
  };
}

export function hasScroll(clientSize: Size, scrollSize: Size) {
  return {
    x: scrollSize.width > clientSize.width,
    y: scrollSize.height > clientSize.height,
  };
}

export function isScrollReached(scrollSize: Size, clientSize: Size, scrollPosition: Position) {
  return {
    left: scrollPosition.left <= 0,
    right: scrollPosition.left + clientSize.width >= scrollSize.width,
    top: scrollPosition.top <= 0,
    bottom: scrollPosition.top + clientSize.height >= scrollSize.height,
  };
}

export function getResize$(elem: HTMLElement) {
  return new Observable<ResizeObserverEntry[]>((subscriber) => {
    const ro = new ResizeObserver((entries) => {
      subscriber.next(entries);
    });

    ro.observe(elem);

    return function unsubscribe() {
      ro.unobserve(elem);
    };
  });
}

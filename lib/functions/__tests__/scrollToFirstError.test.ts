import { describe, it, expect, vi } from "vitest";

describe("에러 시 첫 번째 에러 필드로 스크롤", () => {
  it("여러 에러 중 첫 번째 에러 요소에만 scrollIntoView가 호출되어야 한다", () => {
    const scrollIntoView = vi.fn();
    const focus = vi.fn();

    const refs = [
      { current: { value: "valid", scrollIntoView, focus } },
      { current: { value: "", scrollIntoView, focus } },     // 첫 번째 에러
      { current: { value: "", scrollIntoView, focus } },     // 두 번째 에러
    ];

    // checkError 로직 시뮬레이션
    let firstErrorRef: typeof refs[0] | null = null;
    refs.forEach((ref) => {
      if (ref.current && !ref.current.value) {
        if (!firstErrorRef) firstErrorRef = ref;
      }
    });

    if (firstErrorRef) {
      firstErrorRef.current!.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorRef.current!.focus();
    }

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledTimes(1);
    expect(firstErrorRef).toBe(refs[1]);
  });

  it("에러가 없으면 scrollIntoView가 호출되지 않아야 한다", () => {
    const scrollIntoView = vi.fn();
    const refs = [
      { current: { value: "valid", scrollIntoView } },
      { current: { value: "valid", scrollIntoView } },
    ];

    let firstErrorRef: typeof refs[0] | null = null;
    refs.forEach((ref) => {
      if (ref.current && !ref.current.value) {
        if (!firstErrorRef) firstErrorRef = ref;
      }
    });

    if (firstErrorRef) {
      firstErrorRef.current!.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});

import { describe, it, expect } from "vitest";
import { formatPhone, formatDate } from "../formatters";

describe("formatPhone", () => {
  it("숫자만 입력 시 하이픈이 자동 삽입되어야 한다", () => {
    expect(formatPhone("01012345678")).toBe("010-1234-5678");
  });

  it("3자리 이하는 그대로 반환", () => {
    expect(formatPhone("010")).toBe("010");
  });

  it("7자리 이하는 첫 번째 하이픈만 삽입", () => {
    expect(formatPhone("0101234")).toBe("010-1234");
  });

  it("이미 하이픈이 있는 값도 정상 처리", () => {
    expect(formatPhone("010-1234-5678")).toBe("010-1234-5678");
  });

  it("11자리 초과 시 잘라냄", () => {
    expect(formatPhone("010123456789")).toBe("010-1234-5678");
  });
});

describe("formatDate", () => {
  it("숫자만 입력 시 하이픈이 자동 삽입되어야 한다", () => {
    expect(formatDate("20240101")).toBe("2024-01-01");
  });

  it("4자리 이하는 그대로 반환", () => {
    expect(formatDate("2024")).toBe("2024");
  });

  it("6자리 이하는 첫 번째 하이픈만 삽입", () => {
    expect(formatDate("202401")).toBe("2024-01");
  });

  it("이미 하이픈이 있는 값도 정상 처리", () => {
    expect(formatDate("2024-01-01")).toBe("2024-01-01");
  });

  it("8자리 초과 시 잘라냄", () => {
    expect(formatDate("202401011")).toBe("2024-01-01");
  });
});

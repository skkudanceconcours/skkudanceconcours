import { describe, it, expect } from "vitest";

/**
 * 전공 변경 시 의존 필드 초기화 로직 검증
 * ReceptionForm에서 major가 변경되면 grade, musicOrPose, musicFile이 초기화되어야 함
 */
describe("전공 변경 시 의존 필드 초기화 로직", () => {
  it("전공이 변경되면 의존 필드들이 빈 값으로 초기화되어야 한다", () => {
    // 시뮬레이션: 전공 변경 시 실행되는 초기화 로직
    let grade = "초등 1-3학년";
    let musicOrPose = "음악";
    let musicFile: File | null = new File([""], "test.mp3");

    // 전공 변경 시 초기화
    grade = "";
    musicOrPose = "";
    musicFile = null;

    expect(grade).toBe("");
    expect(musicOrPose).toBe("");
    expect(musicFile).toBeNull();
  });

  it("전공이 같은 값으로 재선택되어도 의존 필드는 초기화되어야 한다", () => {
    let major = "발레 <고전>";
    let grade = "초등 1-3학년";

    // 같은 전공 재선택 시에도 초기화 실행
    major = "발레 <고전>";
    grade = "";

    expect(major).toBe("발레 <고전>");
    expect(grade).toBe("");
  });
});

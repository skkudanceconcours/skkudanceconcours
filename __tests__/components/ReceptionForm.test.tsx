import React, { forwardRef } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockSubmitReception, mockUploadMP3File, mockReplace } from "../mocks/firebase";

// font mock
vi.mock("@/public/fonts/font", () => ({
  quicksand: { className: "mock-font" },
}));

// PrivacyPolicy mock
vi.mock("@/app/components/PrivacyPolicy", () => ({
  default: ({ setPrivacyConfirm }: { setPrivacyConfirm: (v: boolean) => void }) => (
    <label>
      <input
        type="checkbox"
        data-testid="privacy-checkbox"
        onChange={(e) => setPrivacyConfirm(e.target.checked)}
      />
      개인정보 동의
    </label>
  ),
}));

// Selection mock with forwardRef
vi.mock("@/app/components/UI/nextUI/Selection", () => ({
  default: forwardRef(
    (
      {
        label,
        options,
        onChange,
        error,
        value,
        disabled,
      }: {
        label: string;
        options: string[];
        onChange: (v: string) => void;
        error: boolean;
        value: string;
        disabled?: boolean;
        [key: string]: any;
      },
      ref: any,
    ) => (
      <div>
        <label>{label}</label>
        <select
          data-testid={`select-${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error}
          disabled={disabled}
          ref={ref}
        >
          <option value="">선택</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    ),
  ),
}));

// TextInput mock with forwardRef
vi.mock("@/app/components/UI/nextUI/TextInput", () => ({
  default: forwardRef(
    (
      {
        label,
        error,
        onChange,
        description,
        disabled,
      }: {
        label: string;
        error?: boolean;
        onChange?: () => void;
        description?: string;
        disabled?: boolean;
        [key: string]: any;
      },
      ref: any,
    ) => (
      <div>
        <label>{label}</label>
        <input
          data-testid={`input-${label}`}
          ref={ref}
          onChange={onChange}
          aria-invalid={error}
          disabled={disabled}
        />
        {description && <span>{description}</span>}
      </div>
    ),
  ),
}));

// MusicInput mock with forwardRef
vi.mock("@/app/components/MusicInput", () => ({
  default: forwardRef(
    (
      {
        onChange,
        fileName,
        error,
      }: { onChange: (file: File) => void; fileName: string | null; error: boolean },
      ref: any,
    ) => (
      <div ref={ref} data-testid="music-input">
        <input
          type="file"
          data-testid="music-file-input"
          onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
        />
        {fileName && <span>{fileName}</span>}
        {error && <span>음원 에러</span>}
      </div>
    ),
  ),
}));

// NextUI Button mock (to avoid complex internal timers)
vi.mock("@nextui-org/react", () => ({
  Button: ({
    children,
    onClick,
    isLoading,
    color,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    isLoading?: boolean;
    color?: string;
    className?: string;
  }) => (
    <button onClick={onClick} disabled={isLoading} data-color={color} className={className}>
      {children}
    </button>
  ),
}));

import ReceptionForm from "@/app/components/ReceptionForm";

// 헬퍼: 모든 필수 필드 채우기 (컨템포러리댄스 - 가장 심플한 케이스)
async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByTestId("input-참가자 이름"), "홍길동");
  await user.selectOptions(screen.getByTestId("select-성별"), "남자");
  await user.type(screen.getByTestId("input-생년월일"), "2010-01-01");
  await user.type(screen.getByTestId("input-참가자 연락처"), "010-1234-5678");
  await user.type(screen.getByTestId("input-이메일"), "test@test.com");
  await user.type(screen.getByTestId("input-학교명"), "성균관대학교");
  await user.type(screen.getByTestId("input-학원명"), "없음");
  await user.type(screen.getByTestId("input-지도자 성함"), "김선생");
  await user.type(screen.getByTestId("input-지도자 연락처"), "010-5678-1234");
  await user.selectOptions(screen.getByTestId("select-전공 선택"), "컨템포러리댄스 <규정>");
  await user.selectOptions(screen.getByTestId("select-학년 선택"), "중등부 저학년(1학년)");
}

describe("ReceptionForm", () => {
  let user: ReturnType<typeof userEvent.setup>;
  const originalDate = globalThis.Date;

  function mockDate(dateString: string) {
    const fixedDate = new originalDate(dateString);
    const MockDate = class extends originalDate {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super(fixedDate.getTime());
        } else {
          // @ts-ignore
          super(...args);
        }
      }
    } as DateConstructor;
    MockDate.now = () => fixedDate.getTime();
    globalThis.Date = MockDate;
  }

  beforeEach(() => {
    user = userEvent.setup();
    // 접수 기간 내로 시간 설정 (2026-04-15)
    mockDate("2026-04-15T12:00:00+09:00");
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalThis.Date = originalDate;
    cleanup();
  });

  // --- 4-1. 유효성 검증 테스트 ---

  it("모든 필드 비어있는 상태에서 제출하면 submitReception이 호출되지 않는다", async () => {
    render(<ReceptionForm />);
    await user.click(screen.getByText("접수하기"));
    expect(mockSubmitReception).not.toHaveBeenCalled();
  });

  it("필수 필드 중 이름만 누락하면 제출되지 않는다", async () => {
    render(<ReceptionForm />);
    await user.selectOptions(screen.getByTestId("select-성별"), "남자");
    await user.type(screen.getByTestId("input-생년월일"), "2010-01-01");
    await user.type(screen.getByTestId("input-참가자 연락처"), "010-1234-5678");
    await user.type(screen.getByTestId("input-이메일"), "test@test.com");
    await user.type(screen.getByTestId("input-학교명"), "성균관대학교");
    await user.type(screen.getByTestId("input-학원명"), "없음");
    await user.type(screen.getByTestId("input-지도자 성함"), "김선생");
    await user.type(screen.getByTestId("input-지도자 연락처"), "010-5678-1234");
    await user.selectOptions(screen.getByTestId("select-전공 선택"), "컨템포러리댄스 <규정>");
    await user.selectOptions(screen.getByTestId("select-학년 선택"), "중등부 저학년(1학년)");
    await user.click(screen.getByTestId("privacy-checkbox"));
    await user.click(screen.getByText("접수하기"));
    expect(mockSubmitReception).not.toHaveBeenCalled();
  });

  it("모든 필수 필드 입력 후 개인정보 미동의 시 에러 메시지 표시", async () => {
    render(<ReceptionForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByText("접수하기"));
    expect(screen.getByText("*개인정보 수집 및 이용 동의가 필요합니다")).toBeInTheDocument();
    expect(mockSubmitReception).not.toHaveBeenCalled();
  });

  it("모든 필수 필드 입력 + 개인정보 동의 시 정상 제출된다", async () => {
    render(<ReceptionForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByTestId("privacy-checkbox"));
    await user.click(screen.getByText("접수하기"));

    await waitFor(() => {
      expect(mockSubmitReception).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/reception/submit");
    });
  });

  // --- 4-2. 조건부 필드 테스트 ---

  it("한국무용 <전통> 선택 시 작품 제목, 음악/포즈 선택, 음원 업로드 필드가 노출된다", async () => {
    render(<ReceptionForm />);
    await user.selectOptions(screen.getByTestId("select-전공 선택"), "한국무용 <전통>");
    expect(screen.getByTestId("input-작품 제목")).toBeInTheDocument();
    expect(screen.getByTestId("select-음악/포즈 선택")).toBeInTheDocument();
    expect(screen.getByTestId("music-input")).toBeInTheDocument();
  });

  it("발레 <고전> 선택 시 작품 제목, 음악/포즈 선택, 음원 업로드 필드가 노출된다", async () => {
    render(<ReceptionForm />);
    await user.selectOptions(screen.getByTestId("select-전공 선택"), "발레 <고전>");
    expect(screen.getByTestId("input-작품 제목")).toBeInTheDocument();
    expect(screen.getByTestId("select-음악/포즈 선택")).toBeInTheDocument();
    expect(screen.getByTestId("music-input")).toBeInTheDocument();
  });

  it("컨템포러리댄스 <규정> 선택 시 작품 제목, 음악/포즈, 음원 필드가 노출되지 않는다", async () => {
    render(<ReceptionForm />);
    await user.selectOptions(screen.getByTestId("select-전공 선택"), "컨템포러리댄스 <규정>");
    expect(screen.queryByTestId("input-작품 제목")).not.toBeInTheDocument();
    expect(screen.queryByTestId("select-음악/포즈 선택")).not.toBeInTheDocument();
    expect(screen.queryByTestId("music-input")).not.toBeInTheDocument();
  });

  // --- 4-3. 접수 기간 테스트 ---

  it("접수 기간 내에는 '접수하기' 버튼이 표시된다", () => {
    render(<ReceptionForm />);
    expect(screen.getByText("접수하기")).toBeInTheDocument();
  });

  it("접수 기간 외에는 '접수기간이 아닙니다' 버튼이 표시되고 제출 불가하다", async () => {
    mockDate("2026-06-01T12:00:00+09:00");
    render(<ReceptionForm />);
    expect(screen.getByText("접수기간이 아닙니다")).toBeInTheDocument();

    await fillRequiredFields(user);
    await user.click(screen.getByTestId("privacy-checkbox"));
    await user.click(screen.getByText("접수기간이 아닙니다"));
    expect(mockSubmitReception).not.toHaveBeenCalled();
  });

  // --- 4-4. 제출 플로우 테스트 ---

  it("한국무용 전공 + 음원 파일 포함 전체 제출", async () => {
    render(<ReceptionForm />);

    await user.type(screen.getByTestId("input-참가자 이름"), "홍길동");
    await user.selectOptions(screen.getByTestId("select-성별"), "여자");
    await user.type(screen.getByTestId("input-생년월일"), "2010-05-15");
    await user.type(screen.getByTestId("input-참가자 연락처"), "010-1111-2222");
    await user.type(screen.getByTestId("input-이메일"), "dance@test.com");
    await user.type(screen.getByTestId("input-학교명"), "서울중학교");
    await user.type(screen.getByTestId("input-학원명"), "예술학원");
    await user.type(screen.getByTestId("input-지도자 성함"), "박선생");
    await user.type(screen.getByTestId("input-지도자 연락처"), "010-3333-4444");
    await user.selectOptions(screen.getByTestId("select-전공 선택"), "한국무용 <전통>");
    await user.selectOptions(screen.getByTestId("select-학년 선택"), "중등부 저학년(1학년)");
    await user.type(screen.getByTestId("input-작품 제목"), "춘앵전");
    await user.selectOptions(screen.getByTestId("select-음악/포즈 선택"), "음악 먼저");

    // 음원 파일 업로드
    const file = new File(["audio"], "test.mp3", { type: "audio/mp3" });
    await user.upload(screen.getByTestId("music-file-input"), file);

    await user.click(screen.getByTestId("privacy-checkbox"));
    await user.click(screen.getByText("접수하기"));

    await waitFor(() => {
      expect(mockUploadMP3File).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockSubmitReception).toHaveBeenCalledTimes(1);
      const reception = mockSubmitReception.mock.calls[0][0];
      expect(reception.name).toBe("홍길동");
      expect(reception.major).toBe("한국무용 <전통>");
      expect(reception.artTitle).toBe("춘앵전");
      expect(reception.musicOrPose).toBe("음악 먼저");
    });
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/reception/submit");
    });
  });

  it("컨템포러리댄스 전공 제출 시 음원 없이 제출된다", async () => {
    render(<ReceptionForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByTestId("privacy-checkbox"));
    await user.click(screen.getByText("접수하기"));

    await waitFor(() => {
      expect(mockSubmitReception).toHaveBeenCalledTimes(1);
      const reception = mockSubmitReception.mock.calls[0][0];
      expect(reception.major).toBe("컨템포러리댄스 <규정>");
      expect(reception.artTitle).toBeNull();
      expect(reception.musicFileURL).toBeNull();
      expect(reception.musicOrPose).toBeNull();
    });
  });

  it("submitReception이 null 반환 시 라우터 이동하지 않는다", async () => {
    mockSubmitReception.mockResolvedValueOnce(null);
    render(<ReceptionForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByTestId("privacy-checkbox"));
    await user.click(screen.getByText("접수하기"));

    await waitFor(() => {
      expect(mockSubmitReception).toHaveBeenCalledTimes(1);
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });
});

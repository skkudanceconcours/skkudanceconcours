import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Selection from "../Selection";

describe("Selection 클릭 영역 확대", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    label: "테스트 선택",
    placeholder: "선택하세요",
    options: ["옵션1", "옵션2", "옵션3"],
    error: false,
  };

  it("래퍼 영역 클릭 시 드롭다운이 열려야 한다", () => {
    const { container } = render(<Selection {...defaultProps} />);
    const wrapper = container.querySelector("div[class*='w-52']");
    expect(wrapper).not.toBeNull();
    fireEvent.click(wrapper!);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("disabled 상태에서는 클릭해도 드롭다운이 열리지 않아야 한다", () => {
    const { container } = render(<Selection {...defaultProps} disabled={true} />);
    const wrapper = container.querySelector("div[class*='w-52']");
    fireEvent.click(wrapper!);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

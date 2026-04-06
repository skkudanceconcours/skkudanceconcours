import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import MusicInput from "../MusicInput";

describe("MusicInput 드래그 & 드롭", () => {
  const defaultProps = {
    onChange: vi.fn(),
    fileName: null,
    error: false,
  };

  it("mp3 파일 드롭 시 onChange가 호출되어야 한다", () => {
    const onChange = vi.fn();
    const { container } = render(<MusicInput {...defaultProps} onChange={onChange} />);
    const wrapper = container.firstElementChild!;

    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    fireEvent.drop(wrapper, {
      dataTransfer: { files: [file] },
    });

    expect(onChange).toHaveBeenCalledWith(file);
  });

  it("mp3가 아닌 파일 드롭 시 onChange가 호출되지 않아야 한다", () => {
    const onChange = vi.fn();
    const { container } = render(<MusicInput {...defaultProps} onChange={onChange} />);
    const wrapper = container.firstElementChild!;

    const file = new File(["text"], "test.txt", { type: "text/plain" });
    fireEvent.drop(wrapper, {
      dataTransfer: { files: [file] },
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("드래그 오버 시 시각적 피드백이 있어야 한다", () => {
    const { container } = render(<MusicInput {...defaultProps} />);
    const wrapper = container.firstElementChild as HTMLElement;

    fireEvent.dragOver(wrapper);
    expect(wrapper.style.outline).toContain("dashed");

    fireEvent.dragLeave(wrapper);
    expect(wrapper.style.outline).toContain("none");
  });
});

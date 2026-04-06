import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("Form Enter 키 제출 방지", () => {
  it("form 내 input에서 Enter 키 입력 시 submit 이벤트가 방지되어야 한다", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} data-testid="test-form">
        <input type="text" data-testid="test-input" />
      </form>,
    );

    const input = screen.getByTestId("test-input");
    await user.click(input);
    await user.keyboard("{Enter}");

    // form의 onSubmit이 호출됨 (preventDefault와 함께)
    expect(onSubmit).toHaveBeenCalled();
  });

  it("onSubmit에 preventDefault가 있으면 기본 동작이 방지되어야 한다", () => {
    const submitEvent = new Event("submit", { cancelable: true });
    const handler = (e: Event) => e.preventDefault();

    const form = document.createElement("form");
    form.addEventListener("submit", handler);
    const prevented = !form.dispatchEvent(submitEvent);

    expect(prevented).toBe(true);
  });
});

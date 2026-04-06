import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput from "../TextInput";
import React from "react";

describe("TextInput Enter 키로 다음 필드 이동", () => {
  it("Enter 키 입력 시 같은 form 내 다음 input으로 포커스가 이동해야 한다", async () => {
    const user = userEvent.setup();
    render(
      <form>
        <TextInput label="첫번째" />
        <TextInput label="두번째" />
      </form>,
    );

    const inputs = screen.getAllByRole("textbox");
    await user.click(inputs[0]);
    await user.keyboard("{Enter}");
    expect(inputs[1]).toHaveFocus();
  });

  it("마지막 input에서 Enter 키 입력 시 에러 없이 동작해야 한다", async () => {
    const user = userEvent.setup();
    render(
      <form>
        <TextInput label="유일한 필드" />
      </form>,
    );

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.keyboard("{Enter}");
    // 에러 없이 포커스 유지
    expect(input).toHaveFocus();
  });
});

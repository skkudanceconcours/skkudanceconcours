import { vi } from "vitest";

export const mockSubmitReception = vi.fn().mockResolvedValue("mock-doc-id");
export const mockUploadMP3File = vi.fn().mockResolvedValue("https://mock-url.com/file.mp3");

vi.mock("@/lib/firebase/firebaseCRUD", () => ({
  submitReception: mockSubmitReception,
  uploadMP3File: mockUploadMP3File,
  submitTest: vi.fn(),
}));

export const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

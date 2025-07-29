import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge classes correctly", () => {
    expect(cn("px-2 py-1", "px-3")).toBe("py-1 px-3");
  });

  it("should handle conditional classes", () => {
    expect(cn("px-2", true && "py-1", false && "hidden")).toBe("px-2 py-1");
  });

  it("should handle undefined and null values", () => {
    expect(cn("px-2", undefined, null, "py-1")).toBe("px-2 py-1");
  });

  it("should handle empty input", () => {
    expect(cn()).toBe("");
  });

  it("should merge conflicting Tailwind classes", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });
});

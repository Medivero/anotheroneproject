import { beforeEach, describe, expect, it, vi } from "vitest";
import { postData } from "../postData";
import { ApiURL } from "../../store/api";

describe("postData", () => {
    const form = {id: "1", title: "Test", }
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it("post data", async () => {
        const mockres = {
            ok:true,
            status:200
        };
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockres as Response));
        await expect(postData(form)).resolves.toBeUndefined();
        expect(fetch).toHaveBeenCalledWith(ApiURL+"posts",{
            method: "POST",
            body: JSON.stringify(form)
        })
    })
    it("failed request", async () => {
    const mockres = {
      ok: false,
      status: 500,
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockres as Response));

    await expect(postData(form)).rejects.toThrow(`Ошибка 500`);
  });
})
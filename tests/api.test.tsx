import { GET } from "@/app/api/search/route"; // Adjust the import path as needed
import { ErrorStatusCodes, SuccessStatusCodes } from "@lib/types";
import { server } from "../jest.setup";
import { rest } from "msw";
import sample_200_response from "@lib/mocks/sample-search-response.json";
import sample_404_response from "@lib/mocks/sample-error-response.json";

describe("API Route: /api/search", () => {
  it("should return a 200 status code", async () => {
    server.use(
      rest.get(`http://www.omdbapi.com`, (req, res, ctx) => {
        return res(
          ctx.status(SuccessStatusCodes.OK),
          ctx.json(sample_200_response)
        );
      })
    );
    const req = {
      url: `${window.location.origin}/api/search?search=batman`,
    } as Request;
    // Call API route handler directly
    const response = await GET(req);
    const body = await response.json();

    // Assertions
    expect(response.status).toBe(SuccessStatusCodes.OK);
    expect(body.data).toHaveProperty("Search");
  });
  it("should return a 400 status code for failed validation", async () => {
    const req = {
      url: `${window.location.origin}/api/search`,
    } as Request;
    // Call API route handler directly
    const response = await GET(req);
    const body = await response.json();

    // Assertions
    expect(response.status).toBe(ErrorStatusCodes.BAD_REQUEST);
    expect(body).toHaveProperty("error");
  });
  it("should return a 404 status code for query does not exist", async () => {
    server.use(
      rest.get(`http://www.omdbapi.com`, (req, res, ctx) => {
        return res(
          ctx.status(ErrorStatusCodes.NOT_FOUND),
          ctx.json(sample_404_response)
        );
      })
    );
    const req = {
      url:
        `${window.location.origin}/api/search?search=` +
        encodeURIComponent(`###FAKE_REQUEST###`),
    } as Request;
    // Call API route handler directly
    const response = await GET(req);
    const body = await response.json();

    // Assertions
    expect(response.status).toBe(ErrorStatusCodes.NOT_FOUND);
    expect(body).toHaveProperty("error");
  });
});

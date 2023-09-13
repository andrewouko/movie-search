import { GET } from "@/app/api/search/route";
import { createMocks } from "node-mocks-http";
describe("/api/search", () => {
    test("should return a 200 response", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
  
      req.query = { search: `batman` };
  
      await GET(req);
      expect(res._getStatusCode()).toBe(200);
    });
    test("should return a 404 response", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
  
      req.query = { search: `batman&&&&&!!!` };
  
      await GET(req);
      expect(res._getStatusCode()).toBe(200);
    });
  });
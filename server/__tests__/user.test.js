const request = require("supertest");
const app = require("../app");

describe("UserController", () => {
  describe("POST /google-login", () => {
    it("should return an access token", async () => {
      const response = await request(app)
        .post("/google-login")
        .set("google_token", "valid_google_token");

      expect(response.statusCode).toBe(200);
      expect(response.body.access_token).toBeDefined();
    });

    it("should handle invalid tokens", async () => {
      const response = await request(app)
        .post("/google-login")
        .set("google_token", "invalid_google_token");

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Invalid token");
    });
  });

  describe("GET /user-profile/:id", () => {
    it("should return user profile", async () => {
      const response = await request(app).get("/user-profile/1");

      expect(response.statusCode).toBe(200);
      expect(response.body.username).toBeDefined();
    });

    it("should handle missing user ID", async () => {
      const response = await request(app).get("/user-profile/");

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("User ID is required");
    });
  });

  describe("PUT /user-profile/:id", () => {
    it("should update user profile", async () => {
      const response = await request(app)
        .put("/user-profile/1")
        .send({ username: "UpdatedUser" });

      expect(response.statusCode).toBe(200);
      expect(response.body.username).toBe("UpdatedUser");
    });

    it("should handle user not found", async () => {
      const response = await request(app)
        .put("/user-profile/999")
        .send({ username: "UpdatedUser" });

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("User not found");
    });
  });

  describe("DELETE /user-profile/:id", () => {
    it("should delete user profile", async () => {
      const response = await request(app).delete("/user-profile/1");

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User profile deleted successfully");
    });

    it("should handle user not found", async () => {
      const response = await request(app).delete("/user-profile/999");

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("User not found");
    });
  });
});

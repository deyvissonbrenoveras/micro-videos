import Category from "./category";

describe("Category Unit tests", () => {
  test("constructor of category", () => {
    const created_at = new Date();

    const category: Category = new Category({
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: created_at,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: created_at,
    });
  });
});

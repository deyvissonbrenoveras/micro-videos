import ValidationError from "../../../@seedwork/errors/validation-error"
import Category from "./category"

describe('Category Integration Tests', () => {
    describe("create method", () => {
        it('should be an invalid category using name property', () => {
            expect(() => new Category({ name: null }))
                .toThrow(new ValidationError('The name is required'))

            expect(() => new Category({ name: '' }))
                .toThrow(new ValidationError('The name is required'))

            expect(() => new Category({ name: 5 as any }))
                .toThrow(new ValidationError('The name must be a string'))

            expect(() => new Category({ name: 't'.repeat(256) }))
                .toThrow(new ValidationError('The name must be less or equal than 255 characters'))
        })
        it('should be an invalid category using description property', () => {
            expect(() => new Category({ name: "Movie", description: 5 as any }))
                .toThrow(new ValidationError('The description must be a string'))
        })
        it('should be an invalid category using is_active property', () => {
            expect(() => new Category({ name: "Movie", is_active: '' as any }))
                .toThrow(new ValidationError('The is_active must be a boolean'))
        })
        it("should be a valid category", () => {
            expect.assertions(0)
            new Category({ name: "Movie" });
            new Category({ name: "Movie", description: "some description" });
            new Category({ name: "Movie", description: null });
            new Category({
                name: "Movie",
                description: null,
                is_active: false,
            });
            new Category({
                name: "Movie",
                description: null,
                is_active: true,
            });
        })
    })
    describe("update method", () => {
        it('should be an invalid category using name property', () => {
            const category = new Category({ name: "Movie" })

            expect(() => category.update(null, null))
                .toThrow(new ValidationError('The name is required'))

            expect(() => category.update("", null))
                .toThrow(new ValidationError('The name is required'))

            expect(() => category.update(5 as any, null))
                .toThrow(new ValidationError('The name must be a string'))

            expect(() => category.update('t'.repeat(256), null))
                .toThrow(new ValidationError('The name must be less or equal than 255 characters'))
        })
        it('should be an invalid category using description property', () => {
            const category = new Category({ name: "Movie" })
            expect(() => category.update("Movie", 5 as any))
                .toThrow(new ValidationError('The description must be a string'))
        })

        it("should be a valid category", () => {
            expect.assertions(0)
            const category = new Category({ name: "Movie" });
            category.update("name changed", null)
            category.update("name changed", "some description")
        })
    })
})
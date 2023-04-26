import ValidationError from "../../errors/validation-error"
import ValidatorRules from "../validator-rules"

type Values = {
    value: any;
    property: string;
}

type ExpectedRule = {
    value: any;
    property: string;
    rule: keyof ValidatorRules;
    error: ValidationError;
    params?: any[]
}

function assertIsInvalid(expected: ExpectedRule) {
    expect(() => {
        runRule(expected)
    }).toThrow((expected.error))
}

function assertIsValid(expected: ExpectedRule) {
    expect(() => {
        runRule(expected)
    }).not.toThrow((expected.error))
}

function runRule({ value, property, rule, params = [] }: Omit<ExpectedRule, "error">) {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params)
}

describe("ValidatorRules Unit Tests", () => {
    test("values method", () => {
        const validator = ValidatorRules.values("some value", "field")
        expect(validator).toBeInstanceOf(ValidatorRules)
        expect(validator["value"]).toBe("some value")
        expect(validator["property"]).toBe("field")
    })
    test("required validation rule", () => {
        const error = new ValidationError("The field is required")
        // invalid cases

        let arrange: Values[] = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "", property: "field" }
        ]

        arrange.forEach((item) => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "required", error })
        })

        // valid cases

        arrange = [
            { value: "test", property: "field", },
            { value: 5, property: "field", },
            { value: 0, property: "field", },
            { value: false, property: "field", }
        ]

        arrange.forEach((item) => {
            assertIsValid({ value: item.value, property: item.property, rule: "required", error })
        })
    })
    test("string validation rule", () => {
        const error = new ValidationError("The field must be a string")
        let arrange: Values[] = [
            { value: 5, property: "field" },
            { value: {}, property: "field" },
            { value: false, property: "field" }
        ]

        arrange.forEach((item) => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "string", error })
        })

        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "teste", property: "field" }
        ]

        arrange.forEach((item) => {
            assertIsValid({ value: item.value, property: item.property, rule: "string", error })
        })
    })

    test("maxLength validation rule", () => {
        const error = new ValidationError("The field must be less or equal than 5 characters")
        let arrange: Values[] = [
            { value: "aaaaaa", property: "field" },
        ]

        arrange.forEach((item) => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "maxLength", error, params: [5] })
        })

        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: "aaaaa", property: "field" },
        ]

        arrange.forEach((item) => {
            assertIsValid({ value: item.value, property: item.property, rule: "maxLength", error, params: [6] })
        })
    })

    test("boolean validation rule", () => {

        let arrange: Values[] = [
            { value: 5, property: "field" },
            { value: "true", property: "field" },
            { value: "false", property: "field" },
        ]

        const error = new ValidationError("The field must be a boolean")

        arrange.forEach((item) => {
            assertIsInvalid({ value: item.value, property: item.property, rule: "boolean", error })
        })

        arrange = [
            { value: null, property: "field" },
            { value: undefined, property: "field" },
            { value: false, property: "field" },
            { value: true, property: "field" },
        ]

        arrange.forEach((item) => {
            assertIsValid({ value: item.value, property: item.property, rule: "boolean", error })
        })
    })

    it("should throw a validation error when combine two or more validation rules", () => {
        let validator = ValidatorRules.values(null, 'field')
        expect(() => {
            validator.required().string().maxLength(5)
        }).toThrow(new ValidationError("The field is required"))

        validator = ValidatorRules.values(5, "field")
        expect(() => {
            validator.required().string().maxLength(5)
        }).toThrow(new ValidationError("The field must be a string"))

        validator = ValidatorRules.values("aaaaaa", "field")
        expect(() => {
            validator.required().string().maxLength(5)
        }).toThrow(new ValidationError("The field must be less or equal than 5 characters"))

        validator = ValidatorRules.values(null, "field")
        expect(() => {
            validator.required().boolean()
        }).toThrow(new ValidationError("The field is required"))

        validator = ValidatorRules.values(5, "field")
        expect(() => {
            validator.required().boolean()
        }).toThrow(new ValidationError("The field must be a boolean"))
    })

    it("should valid when combine two or more validation rules", () => {
        expect.assertions(0)
        ValidatorRules.values("test", "field").required().string()
        ValidatorRules.values("aaaaa", "field").required().string().maxLength(5)

        ValidatorRules.values(true, "field").required().boolean()
        ValidatorRules.values(false, "field").required().boolean()
    })
})
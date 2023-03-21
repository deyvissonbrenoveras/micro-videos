import { validate as uuidValidate } from "uuid";
import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";

// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any, "validate");
// }

describe("UniqueEntityId Unit Tests", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  // beforeEach(() => {
  //   validateSpy.mockClear();
  // });
  it("should throw error when uuid is invalid", () => {
    // const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid passed in constructor", () => {
    // const validateSpy = spyValidateMethod();
    const uuid = "176baae6-4264-4c37-8f09-ac5c28d27737";
    const vo = new UniqueEntityId("176baae6-4264-4c37-8f09-ac5c28d27737");
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate an valid uuid when no value is passed in constructor", () => {
    // const validateSpy = spyValidateMethod();
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});

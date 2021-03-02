import { isValidDate } from "../src/client/js/isValidDate";

const validDate = "2022-12-31";
const pastDate = "1999-12-31";
const invalidDate = "测试";
const emptyDate = "";

test("normal date should be valid", () => {
  let result = isValidDate(validDate);
  console.log(result);
  expect(result.valid).toBeTruthy();
});

test("invalid date should fail", () => {
  let result = isValidDate(invalidDate);
  console.log(result);
  expect(result.valid).toBeFalsy();
});

test("empty date should fail", () => {
  let result = isValidDate(emptyDate);
  console.log(result);
  expect(result.valid).toBeFalsy();
});

test("date in the past should fail", () => {
  let result = isValidDate(pastDate);
  console.log(result);
  expect(result.valid).toBeFalsy();
});

import Validator, { ErrorMessages, Rules, TypeCheckingRule } from "validatorjs";

export const validator = async (body: TypeCheckingRule, rules: Rules, customMsg: ErrorMessages, callback: any) => {
  const validation = new Validator(body, rules, customMsg);

  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
}
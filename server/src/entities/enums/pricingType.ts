import { registerEnumType } from "type-graphql";

export enum PricingType {
  Anual = 1,
  Bianual = 2,
  Monthly = 3,
}

registerEnumType(PricingType, {
  name: "PricingType",
  description: "Types of pricing",
});

import ts from "typescript";
import createColor3Expression from "../expressions/createColor3Expression";
import createUDim2Expression from "../expressions/createUDim2Expression";
import createEnumExpression from "../expressions/createEnumExpression";
import RGBColor from "../../types/RGBColor";
import SizeValue from "../../types/SizeValue";

/**
 * Create property value expression based on key and value
 * @param factory - TypeScript node factory
 * @param key - Property key name
 * @param value - Property value
 * @returns TypeScript expression for the property value
 */
export default function createPropertyValue(factory: ts.NodeFactory, key: string, value: unknown): ts.Expression {
	switch (key) {
		case "BackgroundColor3":
		case "TextColor3":
			return createColor3Expression(factory, value as RGBColor);
		case "Size":
			return createUDim2Expression(factory, value as SizeValue)!;
		case "TextXAlignment":
			return createEnumExpression(factory, "TextXAlignment", value as string);
		case "Font":
			return createEnumExpression(factory, "Font", value as string);
		default:
			if (typeof value === "string") {
				return factory.createStringLiteral(value);
			} else if (typeof value === "number") {
				return factory.createNumericLiteral(value);
			} else if (value != null) {
				return factory.createStringLiteral(String(value));
			} else {
				return factory.createStringLiteral("");
			}
	}
}

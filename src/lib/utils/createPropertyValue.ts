import type { Expression, NodeFactory, Program } from "typescript";

import type _Color3 from "../../types/internal/_Color3";
import type _UDim2 from "../../types/internal/_UDim2";
import createColor3Expression from "../expressions/createColor3Expression";
import createEnumExpression from "../expressions/createEnumExpression";
import createUDim2Expression from "../expressions/createUDim2Expression";

/**
 * Helper function to create boolean expressions
 */
function createBooleanExpression(factory: NodeFactory, value: unknown): Expression {
	return typeof value === "boolean" ? (value ? factory.createTrue() : factory.createFalse()) : factory.createFalse();
}

/**
 * Create TypeScript expression for property value
 * @param program - TypeScript program instance
 * @param factory - TypeScript node factory
 * @param key - Property key
 * @param value - Property value
 * @returns TypeScript expression for the property value
 */
export default function createPropertyValue(
	program: Program,
	factory: NodeFactory,
	key: string,
	value: unknown,
): Expression {
	switch (key) {
		// Color3 properties
		case "BackgroundColor3":
			return createColor3Expression(program, factory, value as _Color3);
		case "TextColor3":
			return createColor3Expression(program, factory, value as _Color3);
		case "ImageColor3":
			return createColor3Expression(program, factory, value as _Color3);
		case "PlaceholderColor3":
			return createColor3Expression(program, factory, value as _Color3);
		case "BorderColor3":
			return createColor3Expression(program, factory, value as _Color3);
		case "TextStrokeColor3":
			return createColor3Expression(program, factory, value as _Color3);
		case "SelectionImageColor3":
			return createColor3Expression(program, factory, value as _Color3);

		// UDim2 properties
		case "Size":
			return createUDim2Expression(factory, value as _UDim2)!;
		case "Position":
			return createUDim2Expression(factory, value as _UDim2)!;

		// Text alignment enums
		case "TextXAlignment":
			return createEnumExpression(factory, "TextXAlignment", value as string);
		case "TextYAlignment":
			return createEnumExpression(factory, "TextYAlignment", value as string);

		// Font properties
		case "Font":
			return createEnumExpression(factory, "Font", value as string);
		case "FontWeight":
			return createEnumExpression(factory, "FontWeight", value as string);
		case "FontFamily":
			return factory.createStringLiteral(value as string);
		case "FontStyle":
			return createEnumExpression(factory, "FontStyle", value as string);

		// Size constraint enums
		case "SizeConstraint":
			return createEnumExpression(factory, "SizeConstraint", value as string);

		// Automatic size enums
		case "AutomaticSize":
			return createEnumExpression(factory, "AutomaticSize", value as string);

		// Layout enums
		case "FillDirection":
			return createEnumExpression(factory, "FillDirection", value as string);
		case "HorizontalAlignment":
			return createEnumExpression(factory, "HorizontalAlignment", value as string);
		case "VerticalAlignment":
			return createEnumExpression(factory, "VerticalAlignment", value as string);
		case "SortOrder":
			return createEnumExpression(factory, "SortOrder", value as string);

		// Scrolling properties
		case "ScrollBarThickness":
			return factory.createNumericLiteral(value as number);
		case "CanvasSize":
			return createUDim2Expression(factory, value as _UDim2)!;
		case "ScrollingDirection":
			return createEnumExpression(factory, "ScrollingDirection", value as string);
		case "ElasticBehavior":
			return createEnumExpression(factory, "ElasticBehavior", value as string);
		case "ScrollBarImageColor3":
			return createColor3Expression(program, factory, value as _Color3);

		// Image properties
		case "ScaleType":
			return createEnumExpression(factory, "ScaleType", value as string);
		case "ResampleMode":
			return createEnumExpression(factory, "ResampleMode", value as string);
		case "ImageRectOffset":
			return createUDim2Expression(factory, value as _UDim2)!;
		case "ImageRectSize":
			return createUDim2Expression(factory, value as _UDim2)!;

		// Text properties
		case "TextTruncate":
			return createEnumExpression(factory, "TextTruncate", value as string);
		case "RichText":
			return createBooleanExpression(factory, value);
		case "TextScaled":
			return createBooleanExpression(factory, value);
		case "TextWrapped":
			return createBooleanExpression(factory, value);
		case "ClipsDescendants":
			return createBooleanExpression(factory, value);
		case "Visible":
			return createBooleanExpression(factory, value);
		case "Active":
			return createBooleanExpression(factory, value);
		case "Selectable":
			return createBooleanExpression(factory, value);

		// Numeric properties with special handling
		case "TextSize":
			return factory.createNumericLiteral(value as number);
		case "TextStrokeTransparency":
			return factory.createNumericLiteral(value as number);
		case "BackgroundTransparency":
			return factory.createNumericLiteral(value as number);
		case "ImageTransparency":
			return factory.createNumericLiteral(value as number);
		case "Transparency":
			return factory.createNumericLiteral(value as number);
		case "BorderSizePixel":
			return factory.createNumericLiteral(value as number);
		case "ZIndex":
			return factory.createNumericLiteral(value as number);
		case "LayoutOrder":
			return factory.createNumericLiteral(value as number);

		// Default case for primitive values
		default:
			if (typeof value === "string") {
				return factory.createStringLiteral(value);
			} else if (typeof value === "number") {
				return factory.createNumericLiteral(value);
			} else if (typeof value === "boolean") {
				return value ? factory.createTrue() : factory.createFalse();
			} else if (value != null) {
				return factory.createStringLiteral(String(value));
			} else {
				return factory.createStringLiteral("");
			}
	}
}

/**
 * TypeScript expression utilities for rbxts-transformer-tailwind
 */

import type * as ts from "typescript";

/**
 * Create Enum property access expression
 * @param factory - TypeScript node factory
 * @param enumType - Name of the enum type
 * @param enumValue - Name of the enum value
 * @returns TypeScript expression for enum property access
 */
export default function createEnumExpression(
	factory: ts.NodeFactory,
	enumType: string,
	enumValue: string,
): ts.Expression {
	if (!enumValue) {
		// Provide default values for missing enum values
		if (enumType === "FillDirection") enumValue = "Horizontal";
		else if (enumType === "HorizontalAlignment") enumValue = "Center";
		else if (enumType === "VerticalAlignment") enumValue = "Center";
		else enumValue = "Default";
	}

	return factory.createPropertyAccessExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier("Enum"), factory.createIdentifier(enumType)),
		factory.createIdentifier(enumValue),
	);
}

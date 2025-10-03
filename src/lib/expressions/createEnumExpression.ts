/**
 * TypeScript expression utilities for rbxts-transformer-tailwind
 */

import type { Expression, NodeFactory } from "typescript";

/**
 * Create Enum property access expression
 * @param factory - TypeScript node factory
 * @param enumType - Name of the enum type
 * @param enumValue - Name of the enum value
 * @returns TypeScript expression for enum property access
 */
export default function createEnumExpression(factory: NodeFactory, _enumType: string, enumValue: string): Expression {
	if (!enumValue) {
		// Provide default values for missing enum values
		if (_enumType === "FillDirection") enumValue = "Horizontal";
		else if (_enumType === "HorizontalAlignment") enumValue = "Center";
		else if (_enumType === "VerticalAlignment") enumValue = "Center";
		else enumValue = "Default";
	}

	return factory.createStringLiteral(enumValue);
}

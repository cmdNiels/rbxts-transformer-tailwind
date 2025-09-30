/**
 * TypeScript expression utilities for rbxts-transformer-tailwind
 */

import type * as ts from "typescript";

import type RGBColor from "../../types/RGBColor";

/**
 * Create Color3.fromRGB expression
 * @param factory - TypeScript node factory
 * @param color - RGB color object
 * @returns TypeScript expression for Color3.fromRGB call
 */
export default function createColor3Expression(factory: ts.NodeFactory, color: RGBColor): ts.Expression {
	if (!color || typeof color.r !== "number" || typeof color.g !== "number" || typeof color.b !== "number") {
		// Fallback to white color if color is undefined or invalid
		return factory.createCallExpression(
			factory.createPropertyAccessExpression(
				factory.createIdentifier("Color3"),
				factory.createIdentifier("fromRGB"),
			),
			undefined,
			[factory.createNumericLiteral(255), factory.createNumericLiteral(255), factory.createNumericLiteral(255)],
		);
	}

	return factory.createCallExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier("Color3"), factory.createIdentifier("fromRGB")),
		undefined,
		[
			factory.createNumericLiteral(Math.round(color.r * 255)),
			factory.createNumericLiteral(Math.round(color.g * 255)),
			factory.createNumericLiteral(Math.round(color.b * 255)),
		],
	);
}

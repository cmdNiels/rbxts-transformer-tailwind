/**
 * TypeScript expression utilities for rbxts-transformer-tailwind
 */

import type _Color3 from "types/internal/_Color3";
import type * as ts from "typescript";

/**
 * Create Color3.fromRGB expression
 * @param factory - TypeScript node factory
 * @param color - RGB color object
 * @returns TypeScript expression for Color3.fromRGB call
 */
export default function createColor3Expression(factory: ts.NodeFactory, color: _Color3): ts.Expression {
	if (!color || typeof color.R !== "number" || typeof color.G !== "number" || typeof color.B !== "number") {
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
			factory.createNumericLiteral(Math.round(color.R * 255)),
			factory.createNumericLiteral(Math.round(color.G * 255)),
			factory.createNumericLiteral(Math.round(color.B * 255)),
		],
	);
}

/**
 * TypeScript expression utilities for rbxts-transformer-tailwind
 */

import type * as ts from "typescript";

import type SizeValue from "../../types/SizeValue";

/**
 * Create UDim2 constructor expression
 * @param factory - TypeScript node factory
 * @param size - Size value object
 * @returns TypeScript expression for UDim2 constructor or undefined if incomplete
 */
export default function createUDim2Expression(factory: ts.NodeFactory, size: SizeValue): ts.Expression | undefined {
	if (size.x && size.y) {
		return factory.createNewExpression(factory.createIdentifier("UDim2"), undefined, [
			factory.createNumericLiteral(size.x.scale),
			factory.createNumericLiteral(size.x.offset),
			factory.createNumericLiteral(size.y.scale),
			factory.createNumericLiteral(size.y.offset),
		]);
	}
	return undefined;
}

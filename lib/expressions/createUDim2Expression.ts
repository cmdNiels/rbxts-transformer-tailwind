/**
 * TypeScript expression utilities for rbxts-transformer-tailwind
 */

import type _UDim2 from "types/internal/_UDim2";
import type * as ts from "typescript";

/**
 * Create UDim2 constructor expression
 * @param factory - TypeScript node factory
 * @param size - Size value object
 * @returns TypeScript expression for UDim2 constructor or undefined if incomplete
 */
export default function createUDim2Expression(factory: ts.NodeFactory, size: _UDim2): ts.Expression | undefined {
	if (size.X && size.Y) {
		return factory.createNewExpression(factory.createIdentifier("UDim2"), undefined, [
			factory.createNumericLiteral(size.X.Scale ?? 0),
			factory.createNumericLiteral(size.X.Offset ?? 0),
			factory.createNumericLiteral(size.Y.Scale ?? 0),
			factory.createNumericLiteral(size.Y.Offset ?? 0),
		]);
	}
	return undefined;
}

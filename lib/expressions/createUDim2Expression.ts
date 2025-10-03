import type { Expression, NodeFactory } from "typescript";

import type _UDim2 from "../../types/internal/_UDim2";

/**
 * Create UDim2 constructor expression
 * @param program - TypeScript program instance
 * @param factory - TypeScript node factory
 * @param size - Direct UDim2 value
 * @returns TypeScript expression for UDim2 constructor or undefined if incomplete
 */
export default function createUDim2Expression(factory: NodeFactory, size: _UDim2): Expression | undefined {
	if (size && size.X && size.Y) {
		return factory.createNewExpression(factory.createIdentifier("UDim2"), undefined, [
			factory.createNumericLiteral(size.X.Scale ?? 0),
			factory.createNumericLiteral(size.X.Offset ?? 0),
			factory.createNumericLiteral(size.Y.Scale ?? 0),
			factory.createNumericLiteral(size.Y.Offset ?? 0),
		]);
	}
	return undefined;
}

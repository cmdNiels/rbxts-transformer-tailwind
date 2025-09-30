/**
 * rbxts-transformer-tailwind
 * A TypeScript transformer that converts Tailwind CSS classes to Roblox UI properties
 */

import * as ts from "typescript";

import wrapTextWithDecoration from "./wrapTextWithDecoration";

/**
 * Processes JSX children to apply text decoration wrapping
 * @param children - JSX children array
 * @param textDecoration - Text decoration type
 * @param factory - TypeScript factory
 * @returns Modified children array
 */
export default function processChildrenWithTextDecoration(
	children: ts.JsxChild[],
	textDecoration: string,
	factory: ts.NodeFactory,
): ts.JsxChild[] {
	if (!textDecoration || textDecoration === "none") {
		return children;
	}

	return children.map((child) => {
		if (ts.isJsxText(child)) {
			const wrappedText = wrapTextWithDecoration(child.text, textDecoration);
			return factory.createJsxText(wrappedText);
		} else if (ts.isJsxExpression(child) && child.expression && ts.isStringLiteral(child.expression)) {
			const wrappedText = wrapTextWithDecoration(child.expression.text, textDecoration);
			return factory.createJsxExpression(undefined, factory.createStringLiteral(wrappedText));
		}
		return child;
	});
}

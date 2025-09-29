/**
 * Create JSX element for UI components
 */

import type * as ts from "typescript";

import createColor3Expression from "@/lib/expressions/createColor3Expression";
import createEnumExpression from "@/lib/expressions/createEnumExpression";
import type RGBColor from "@/types/RGBColor";
import type UIElement from "@/types/UIElement";

/**
 * Create JSX element for UI components
 * @param factory - TypeScript node factory
 * @param element - UI element configuration
 * @returns JSX element or undefined if element type not supported
 */
export default function createUIElement(factory: ts.NodeFactory, element: UIElement): ts.JsxElement | undefined {
	switch (element.type) {
		case "padding": {
			const paddingTop = (element.top as number) || (element.vertical as number) || (element.all as number) || 0;
			const paddingBottom =
				(element.bottom as number) || (element.vertical as number) || (element.all as number) || 0;
			const paddingLeft =
				(element.left as number) || (element.horizontal as number) || (element.all as number) || 0;
			const paddingRight =
				(element.right as number) || (element.horizontal as number) || (element.all as number) || 0;

			return factory.createJsxElement(
				factory.createJsxOpeningElement(
					factory.createIdentifier("uipadding"),
					undefined,
					factory.createJsxAttributes([
						factory.createJsxAttribute(
							factory.createIdentifier("PaddingTop"),
							factory.createJsxExpression(
								undefined,
								factory.createNewExpression(factory.createIdentifier("UDim"), undefined, [
									factory.createNumericLiteral(0),
									factory.createNumericLiteral(paddingTop),
								]),
							),
						),
						factory.createJsxAttribute(
							factory.createIdentifier("PaddingBottom"),
							factory.createJsxExpression(
								undefined,
								factory.createNewExpression(factory.createIdentifier("UDim"), undefined, [
									factory.createNumericLiteral(0),
									factory.createNumericLiteral(paddingBottom),
								]),
							),
						),
						factory.createJsxAttribute(
							factory.createIdentifier("PaddingLeft"),
							factory.createJsxExpression(
								undefined,
								factory.createNewExpression(factory.createIdentifier("UDim"), undefined, [
									factory.createNumericLiteral(0),
									factory.createNumericLiteral(paddingLeft),
								]),
							),
						),
						factory.createJsxAttribute(
							factory.createIdentifier("PaddingRight"),
							factory.createJsxExpression(
								undefined,
								factory.createNewExpression(factory.createIdentifier("UDim"), undefined, [
									factory.createNumericLiteral(0),
									factory.createNumericLiteral(paddingRight),
								]),
							),
						),
					]),
				),
				[],
				factory.createJsxClosingElement(factory.createIdentifier("uipadding")),
			);
		}

		case "corner": {
			return factory.createJsxElement(
				factory.createJsxOpeningElement(
					factory.createIdentifier("uicorner"),
					undefined,
					factory.createJsxAttributes([
						factory.createJsxAttribute(
							factory.createIdentifier("CornerRadius"),
							factory.createJsxExpression(
								undefined,
								factory.createNewExpression(factory.createIdentifier("UDim"), undefined, [
									factory.createNumericLiteral(0),
									factory.createNumericLiteral(element.radius as number),
								]),
							),
						),
					]),
				),
				[],
				factory.createJsxClosingElement(factory.createIdentifier("uicorner")),
			);
		}

		case "listLayout": {
			const attributes = [
				factory.createJsxAttribute(
					factory.createIdentifier("SortOrder"),
					factory.createJsxExpression(undefined, createEnumExpression(factory, "SortOrder", "LayoutOrder")),
				),
				factory.createJsxAttribute(
					factory.createIdentifier("FillDirection"),
					factory.createJsxExpression(
						undefined,
						createEnumExpression(factory, "FillDirection", element.direction as string),
					),
				),
			];

			if (element.spacing) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("Padding"),
						factory.createJsxExpression(
							undefined,
							factory.createNewExpression(factory.createIdentifier("UDim"), undefined, [
								factory.createNumericLiteral(0),
								factory.createNumericLiteral(element.spacing as number),
							]),
						),
					),
				);
			}

			if (element.horizontalAlignment) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("HorizontalAlignment"),
						factory.createJsxExpression(
							undefined,
							createEnumExpression(factory, "HorizontalAlignment", element.horizontalAlignment),
						),
					),
				);
			}

			if (element.verticalAlignment) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("VerticalAlignment"),
						factory.createJsxExpression(
							undefined,
							createEnumExpression(factory, "VerticalAlignment", element.verticalAlignment),
						),
					),
				);
			}

			return factory.createJsxElement(
				factory.createJsxOpeningElement(
					factory.createIdentifier("uilistlayout"),
					undefined,
					factory.createJsxAttributes(attributes),
				),
				[],
				factory.createJsxClosingElement(factory.createIdentifier("uilistlayout")),
			);
		}

		case "stroke": {
			return factory.createJsxElement(
				factory.createJsxOpeningElement(
					factory.createIdentifier("uistroke"),
					undefined,
					factory.createJsxAttributes([
						factory.createJsxAttribute(
							factory.createIdentifier("Thickness"),
							factory.createJsxExpression(
								undefined,
								factory.createNumericLiteral(element.thickness as number),
							),
						),
						factory.createJsxAttribute(
							factory.createIdentifier("Color"),
							factory.createJsxExpression(
								undefined,
								createColor3Expression(factory, element.color as RGBColor),
							),
						),
						...(element.transparency
							? [
									factory.createJsxAttribute(
										factory.createIdentifier("Transparency"),
										factory.createJsxExpression(
											undefined,
											factory.createNumericLiteral(element.transparency as number),
										),
									),
								]
							: []),
					]),
				),
				[],
				factory.createJsxClosingElement(factory.createIdentifier("uistroke")),
			);
		}
	}

	return undefined;
}

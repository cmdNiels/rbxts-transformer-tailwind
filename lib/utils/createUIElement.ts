/**
 * Create JSX element for UI components
 */

import type * as ts from "typescript";

import type RGBColor from "../../types/RGBColor";
import type UIElement from "../../types/UIElement";
import createColor3Expression from "../expressions/createColor3Expression";
import createEnumExpression from "../expressions/createEnumExpression";

/**
 * Create JSX element for UI components
 * @param factory - TypeScript node factory
 * @param element - UI element configuration
 * @returns JSX element or undefined if element type not supported
 */
export default function createUIElement(factory: ts.NodeFactory, element: UIElement): ts.JsxElement | undefined {
	switch (element.type) {
		case "UIPadding": {
			const paddingTop = (element.top as number) || 0;
			const paddingBottom = (element.bottom as number) || 0;
			const paddingLeft = (element.left as number) || 0;
			const paddingRight = (element.right as number) || 0;

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

		case "UICorner": {
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

		case "UIListLayout": {
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

			if (element.flexAlignment) {
				const isHorizontal = element.direction === "Horizontal";
				const flexProperty = isHorizontal ? "HorizontalFlex" : "VerticalFlex";

				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier(flexProperty),
						factory.createJsxExpression(
							undefined,
							createEnumExpression(factory, "UIFlexAlignment", element.flexAlignment),
						),
					),
				);
			}

			if (element.wraps !== undefined) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("Wraps"),
						factory.createJsxExpression(
							undefined,
							element.wraps ? factory.createTrue() : factory.createFalse(),
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

		case "UIFlexItem": {
			const attributes = [];

			if (element.flexMode) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("FlexMode"),
						factory.createJsxExpression(
							undefined,
							createEnumExpression(factory, "UIFlexMode", element.flexMode),
						),
					),
				);
			}

			if (element.growRatio !== undefined) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("GrowRatio"),
						factory.createJsxExpression(undefined, factory.createNumericLiteral(element.growRatio)),
					),
				);
			}

			if (element.shrinkRatio !== undefined) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("ShrinkRatio"),
						factory.createJsxExpression(undefined, factory.createNumericLiteral(element.shrinkRatio)),
					),
				);
			}

			return factory.createJsxElement(
				factory.createJsxOpeningElement(
					factory.createIdentifier("uiflexitem"),
					undefined,
					factory.createJsxAttributes(attributes),
				),
				[],
				factory.createJsxClosingElement(factory.createIdentifier("uiflexitem")),
			);
		}

		case "UIStroke": {
			return factory.createJsxElement(
				factory.createJsxOpeningElement(
					factory.createIdentifier("uistroke"),
					undefined,
					factory.createJsxAttributes([
						factory.createJsxAttribute(
							factory.createIdentifier("Thickness"),
							factory.createJsxExpression(
								undefined,
								factory.createNumericLiteral((element.thickness as number) || 1),
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

		case "UIScale": {
			return factory.createJsxElement(
				factory.createJsxOpeningElement(
					factory.createIdentifier("uiscale"),
					undefined,
					factory.createJsxAttributes([
						factory.createJsxAttribute(
							factory.createIdentifier("Scale"),
							factory.createJsxExpression(
								undefined,
								factory.createNumericLiteral(element.scale as number),
							),
						),
					]),
				),
				[],
				factory.createJsxClosingElement(factory.createIdentifier("uiscale")),
			);
		}
	}

	return undefined;
}

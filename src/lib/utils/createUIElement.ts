/**
 * Create JSX element for UI components
 */

import type { JsxElement, NodeFactory, Program } from "typescript";

import type UIElement from "../../types/elements/_UIElement";
import type _Color3 from "../../types/internal/_Color3";
import type _UDim from "../../types/internal/_UDim";
import createColor3Expression from "../expressions/createColor3Expression";
import createEnumExpression from "../expressions/createEnumExpression";

/**
 * Create JSX element for UI components
 * @param program - TypeScript program instance
 * @param factory - TypeScript node factory
 * @param element - UI element configuration
 * @returns JSX element or undefined if element type not supported
 */
export default function createUIElement(
	program: Program,
	factory: NodeFactory,
	element: UIElement,
): JsxElement | undefined {
	switch (element.type) {
		case "UIPadding": {
			const paddingTop = element.PaddingTop?.Offset || 0;
			const paddingBottom = element.PaddingBottom?.Offset || 0;
			const paddingLeft = element.PaddingLeft?.Offset || 0;
			const paddingRight = element.PaddingRight?.Offset || 0;

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
									factory.createNumericLiteral((element.CornerRadius as _UDim)?.Offset || 0),
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
						createEnumExpression(factory, "FillDirection", element.Direction as string),
					),
				),
			];

			if (element.Spacing) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("Padding"),
						factory.createJsxExpression(
							undefined,
							factory.createNewExpression(factory.createIdentifier("UDim"), undefined, [
								factory.createNumericLiteral(0),
								factory.createNumericLiteral(element.Spacing),
							]),
						),
					),
				);
			}

			if (element.HorizontalAlignment) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("HorizontalAlignment"),
						factory.createJsxExpression(
							undefined,
							createEnumExpression(factory, "HorizontalAlignment", element.HorizontalAlignment),
						),
					),
				);
			}

			if (element.VerticalAlignment) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("VerticalAlignment"),
						factory.createJsxExpression(
							undefined,
							createEnumExpression(factory, "VerticalAlignment", element.VerticalAlignment),
						),
					),
				);
			}

			if (element.FlexAlignment) {
				const isHorizontal = element.Direction === "Horizontal";
				const flexProperty = isHorizontal ? "HorizontalFlex" : "VerticalFlex";

				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier(flexProperty),
						factory.createJsxExpression(
							undefined,
							createEnumExpression(factory, "UIFlexAlignment", element.FlexAlignment),
						),
					),
				);
			}

			if (element.Wraps !== undefined) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("Wraps"),
						factory.createJsxExpression(
							undefined,
							element.Wraps ? factory.createTrue() : factory.createFalse(),
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

			if (element.FlexMode) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("FlexMode"),
						factory.createJsxExpression(
							undefined,
							createEnumExpression(factory, "UIFlexMode", element.FlexMode),
						),
					),
				);
			}

			if (element.GrowRatio !== undefined) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("GrowRatio"),
						factory.createJsxExpression(undefined, factory.createNumericLiteral(element.GrowRatio)),
					),
				);
			}

			if (element.ShrinkRatio !== undefined) {
				attributes.push(
					factory.createJsxAttribute(
						factory.createIdentifier("ShrinkRatio"),
						factory.createJsxExpression(undefined, factory.createNumericLiteral(element.ShrinkRatio)),
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
								factory.createNumericLiteral((element.Thickness as number) || 1),
							),
						),
						factory.createJsxAttribute(
							factory.createIdentifier("Color"),
							factory.createJsxExpression(
								undefined,
								createColor3Expression(program, factory, element.Color as _Color3),
							),
						),
						...(element.Transparency
							? [
									factory.createJsxAttribute(
										factory.createIdentifier("Transparency"),
										factory.createJsxExpression(
											undefined,
											factory.createNumericLiteral(element.Transparency),
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
								factory.createNumericLiteral(element.Scale as number),
							),
						),
					]),
				),
				[],
				factory.createJsxClosingElement(factory.createIdentifier("uiscale")),
			);
		}
	}
}

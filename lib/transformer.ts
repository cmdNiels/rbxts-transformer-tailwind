/**
 * rbxts-transformer-tailwind
 * A TypeScript transformer that converts Tailwind CSS classes to Roblox UI properties
 */

import type UIElement from "types/elements/_UIElement";
import * as ts from "typescript";

import type TailwindTransformerConfig from "../types/TailwindTransformerConfig";
import createClassMap from "./utils/createClassMap";
import createPropertyValue from "./utils/createPropertyValue";
import createUIElement from "./utils/createUIElement";
import loadTailwindConfig from "./utils/loadTailwindConfig";
import parseClasses from "./utils/parseClasses";
import processText from "./utils/processText";

/**
 * Creates a Tailwind CSS transformer for roblox-ts
 * @param config - Transformer configuration options
 * @returns TypeScript transformer factory
 */
export default function tailwindTransformer(config?: TailwindTransformerConfig): ts.TransformerFactory<ts.SourceFile> {
	console.log("🚀 Running Tailwind transformer");

	return (context: ts.TransformationContext) => {
		const { factory } = context;

		// Load Tailwind config and create class map
		const projectRoot = process.cwd();
		console.log("📁 Project root:", projectRoot);

		const tailwindConfig = loadTailwindConfig(projectRoot, config?.tailwindConfigPath);
		if (tailwindConfig?.theme) {
			console.log("⚙️  Tailwind config loaded successfully");
		}

		const dynamicClassMap = createClassMap(tailwindConfig);
		console.log("🎨 Class map created with", Object.keys(dynamicClassMap).length, "classes");

		return (sourceFile: ts.SourceFile): ts.SourceFile => {
			// Only process .tsx and .jsx files
			if (!sourceFile.fileName.endsWith(".tsx") && !sourceFile.fileName.endsWith(".jsx")) {
				return sourceFile;
			}

			function visitor(node: ts.Node): ts.Node {
				if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
					const attributes = ts.isJsxElement(node) ? node.openingElement.attributes : node.attributes;

					let classNameAttr: ts.JsxAttribute | undefined;
					let textAttr: ts.JsxAttribute | undefined;
					const otherAttributes: ts.JsxAttributeLike[] = [];

					for (const attr of attributes.properties) {
						if (ts.isJsxAttribute(attr) && ts.isIdentifier(attr.name)) {
							if (attr.name.text === "className") {
								classNameAttr = attr;
							} else if (attr.name.text === "Text") {
								textAttr = attr;
							} else {
								otherAttributes.push(attr);
							}
						} else {
							otherAttributes.push(attr);
						}
					}

					if (classNameAttr && classNameAttr.initializer) {
						let classNames: string = "";

						if (ts.isStringLiteral(classNameAttr.initializer)) {
							classNames = classNameAttr.initializer.text;
						} else if (
							ts.isJsxExpression(classNameAttr.initializer) &&
							classNameAttr.initializer.expression &&
							ts.isStringLiteral(classNameAttr.initializer.expression)
						) {
							classNames = classNameAttr.initializer.expression.text;
						}

						const { properties, uiElements } = parseClasses(
							classNames,
							dynamicClassMap,
							config?.warnUnknownClasses,
						);

						const newAttributes: ts.JsxAttributeLike[] = [...otherAttributes];

						// Handle font properties separately to combine FontWeight and FontFamily into FontFace
						const props = properties as Record<string, unknown>;
						const textDecoration = props._textDecoration as string;
						const textTransform = props._textTransform as string;
						const fontWeight = props.FontWeight as string;
						const fontFamily = props.FontFamily as string;
						const fontStyle = props.FontStyle as string;

						// If we have font properties, create a FontFace
						if (fontWeight || fontFamily) {
							const defaultFamily = "rbxasset://fonts/families/GothamSSm.json";
							const defaultWeight = "Regular";
							const defaultStyle = "Normal";

							const finalFamily = fontFamily || defaultFamily;
							const finalWeight = fontWeight || defaultWeight;
							const finalStyle = fontStyle || defaultStyle;

							const fontFaceExpression = factory.createNewExpression(
								factory.createIdentifier("Font"),
								undefined,
								[
									factory.createStringLiteral(finalFamily),
									factory.createPropertyAccessExpression(
										factory.createPropertyAccessExpression(
											factory.createIdentifier("Enum"),
											factory.createIdentifier("FontWeight"),
										),
										factory.createIdentifier(finalWeight),
									),
									factory.createPropertyAccessExpression(
										factory.createPropertyAccessExpression(
											factory.createIdentifier("Enum"),
											factory.createIdentifier("FontStyle"),
										),
										factory.createIdentifier(finalStyle),
									),
								],
							);

							newAttributes.push(
								factory.createJsxAttribute(
									factory.createIdentifier("FontFace"),
									factory.createJsxExpression(undefined, fontFaceExpression),
								),
							);
						}

						// Process other properties (excluding font properties, text decoration, and text transform that are handled specially)
						for (const key of Object.keys(props)) {
							if (
								Object.prototype.hasOwnProperty.call(props, key) &&
								![
									"FontWeight",
									"FontFamily",
									"FontStyle",
									"_textDecoration",
									"_textTransform",
								].includes(key)
							) {
								const value = props[key];
								newAttributes.push(
									factory.createJsxAttribute(
										factory.createIdentifier(key),
										factory.createJsxExpression(
											undefined,
											createPropertyValue(factory, key, value),
										),
									),
								);
							}
						}

						// Set default BorderSizePixel to 0 if not already set
						if (!(props as Record<string, unknown>).BorderSizePixel) {
							newAttributes.push(
								factory.createJsxAttribute(
									factory.createIdentifier("BorderSizePixel"),
									factory.createJsxExpression(undefined, factory.createNumericLiteral(0)),
								),
							);
						}

						// Handle Text prop with text decoration and/or text transform
						if (textAttr && (textDecoration || textTransform) && textAttr.initializer) {
							let textValue: string = "";

							if (ts.isStringLiteral(textAttr.initializer)) {
								textValue = textAttr.initializer.text;
							} else if (
								ts.isJsxExpression(textAttr.initializer) &&
								textAttr.initializer.expression &&
								ts.isStringLiteral(textAttr.initializer.expression)
							) {
								textValue = textAttr.initializer.expression.text;
							}

							if (textValue) {
								const processedText = processText(textValue, textTransform, textDecoration);

								newAttributes.push(
									factory.createJsxAttribute(
										factory.createIdentifier("Text"),
										factory.createJsxExpression(
											undefined,
											factory.createStringLiteral(processedText),
										),
									),
								);
							} else {
								// If we can't extract the text value, keep the original Text attr
								newAttributes.push(textAttr);
							}
						} else if (textAttr) {
							// No text decoration or transform, keep original Text attr
							newAttributes.push(textAttr);
						}

						const uiElementChildren: ts.JsxElement[] = [];
						for (const element of uiElements) {
							const uiElement = createUIElement(factory, element as UIElement);
							if (uiElement) {
								uiElementChildren.push(uiElement);
							}
						}

						if (ts.isJsxSelfClosingElement(node)) {
							if (uiElementChildren.length > 0) {
								return ts.visitEachChild(
									factory.createJsxElement(
										factory.createJsxOpeningElement(
											node.tagName,
											node.typeArguments,
											factory.createJsxAttributes(newAttributes),
										),
										uiElementChildren,
										factory.createJsxClosingElement(node.tagName),
									),
									visitor,
									context,
								);
							} else {
								return ts.visitEachChild(
									factory.updateJsxSelfClosingElement(
										node,
										node.tagName,
										node.typeArguments,
										factory.createJsxAttributes(newAttributes),
									),
									visitor,
									context,
								);
							}
						} else {
							const visitedChildren = node.children.map(
								(child) => ts.visitNode(child, visitor) as ts.JsxChild,
							);

							// Apply text transformations if present
							const processedChildren =
								textDecoration || textTransform
									? visitedChildren.map((child) => {
											if (ts.isJsxText(child)) {
												const processedText = processText(
													child.text,
													textTransform,
													textDecoration,
												);
												return factory.createJsxText(processedText);
											} else if (
												ts.isJsxExpression(child) &&
												child.expression &&
												ts.isStringLiteral(child.expression)
											) {
												const processedText = processText(
													child.expression.text,
													textTransform,
													textDecoration,
												);
												return factory.createJsxExpression(
													undefined,
													factory.createStringLiteral(processedText),
												);
											}
											return child;
										})
									: visitedChildren;

							const newChildren: ts.JsxChild[] = [...uiElementChildren, ...processedChildren];

							return factory.createJsxElement(
								factory.createJsxOpeningElement(
									node.openingElement.tagName,
									node.openingElement.typeArguments,
									factory.createJsxAttributes(newAttributes),
								),
								newChildren,
								node.closingElement,
							);
						}
					}
				}

				return ts.visitEachChild(node, visitor, context);
			}

			return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
		};
	};
}

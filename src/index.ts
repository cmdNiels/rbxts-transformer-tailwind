/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * rbxts-transformer-tailwind
 * A TypeScript transformer that converts Tailwind CSS classes to Roblox UI properties
 */

import type { Program, SourceFile, TransformationContext } from "typescript";
import {
	isEnumDeclaration,
	isEnumMember,
	isIdentifier,
	isInterfaceDeclaration,
	isJsxAttribute,
	isJsxElement,
	isJsxExpression,
	isJsxSelfClosingElement,
	isJsxText,
	isStringLiteral,
	isTypeAliasDeclaration,
	LanguageVariant,
	visitEachChild,
	visitNode,
} from "typescript";

import createClassMap from "./lib/utils/createClassMap";
import createPropertyValue from "./lib/utils/createPropertyValue";
import createUIElement from "./lib/utils/createUIElement";
import parseClasses from "./lib/utils/parseClasses";
import processText from "./lib/utils/processText";
import type UIElement from "./types/elements/_UIElement";

/**
 * Creates a Tailwind CSS transformer for roblox-ts
 * This is the main entry point when the transformer is used as a packed module
 * @param program - TypeScript program instance
 * @param config - Transformer configuration options
 * @returns TypeScript transformer factory
 */
function transform(program: Program) {
	console.log("🚀 Running Tailwind transformer - transform function called");

	const dynamicClassMap = createClassMap();
	console.log("🎨 Class map created with", Object.keys(dynamicClassMap).length, "classes");

	return (context: TransformationContext) => {
		const { factory } = context;

		return (sourceFile: any): any => {
			// Skip node_modules
			if (sourceFile.fileName.indexOf('node_modules') !== -1) {
				return sourceFile;
			}

			// Only process .tsx files (JSX/TSX files that contain React components)
			if (sourceFile.languageVariant !== LanguageVariant.JSX) {
				return sourceFile;
			}

			function visitor(node: any): any {
				// Skip type-only declarations and enum members that don't need transformation
				if (
					isEnumDeclaration(node) ||
					isEnumMember(node) ||
					isInterfaceDeclaration(node) ||
					isTypeAliasDeclaration(node)
				) {
					return node;
				}

				// Only process JSX elements
				if (isJsxElement(node) || isJsxSelfClosingElement(node)) {
					const attributes = isJsxElement(node) ? node.openingElement.attributes : node.attributes;

					let classNameAttr: any;
					let textAttr: any;
					const otherAttributes: any[] = [];

					for (const attr of attributes.properties) {
						if (isJsxAttribute(attr) && isIdentifier(attr.name)) {
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

						if (isStringLiteral(classNameAttr.initializer)) {
							classNames = classNameAttr.initializer.text;
						} else if (
							isJsxExpression(classNameAttr.initializer) &&
							classNameAttr.initializer.expression &&
							isStringLiteral(classNameAttr.initializer.expression)
						) {
							classNames = classNameAttr.initializer.expression.text;
						}

						const { properties, uiElements } = parseClasses(
							classNames,
							dynamicClassMap,
						);


						const newAttributes: any[] = [...otherAttributes];

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
								[
									"FontWeight",
									"FontFamily",
									"FontStyle",
									"_textDecoration",
									"_textTransform",
								].indexOf(key) === -1
							) {
								const value = props[key];
								newAttributes.push(
									factory.createJsxAttribute(
										factory.createIdentifier(key),
										factory.createJsxExpression(
											undefined,
											createPropertyValue(program, factory, key, value),
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

							if (isStringLiteral(textAttr.initializer)) {
								textValue = textAttr.initializer.text;
							} else if (
								isJsxExpression(textAttr.initializer) &&
								textAttr.initializer.expression &&
								isStringLiteral(textAttr.initializer.expression)
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

						const uiElementChildren: any[] = [];
						for (const element of uiElements) {
							const uiElement = createUIElement(program, factory, element as UIElement);
							if (uiElement) {
								uiElementChildren.push(uiElement);
							}
						}

						if (isJsxSelfClosingElement(node)) {
							if (uiElementChildren.length > 0) {
								return visitEachChild(
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
								return visitEachChild(
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
							const visitedChildren = node.children
								.map((child: any) => child && visitNode(child, visitor))
								.filter(Boolean);

							// Apply text transformations if present
							const processedChildren =
								textDecoration || textTransform
									? visitedChildren.map((child: any) => {
										if (isJsxText(child)) {
											const processedText = processText(
												child.text,
												textTransform,
												textDecoration,
											);
											return factory.createJsxText(processedText);
										} else if (
											isJsxExpression(child) &&
											child.expression &&
											isStringLiteral(child.expression)
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

							const newChildren: any[] = [...uiElementChildren, ...processedChildren];

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

					// Continue visiting children of JSX elements that don't have className
					return visitEachChild(node, visitor, context);
				}

				// For all other nodes (non-JSX), continue traversing the tree
				return visitEachChild(node, visitor, context);
			}

			// Visit all nodes in the source file
			return visitNode(sourceFile, visitor) as SourceFile;
		};
	};
}

export = transform;

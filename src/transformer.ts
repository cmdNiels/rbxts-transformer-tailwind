/**
 * rbxts-transformer-tailwind
 * A TypeScript transformer that converts Tailwind CSS classes to Roblox UI properties
 */

import * as ts from "typescript";
import loadTailwindConfig from "./utils/loadTailwindConfig";
import createClassMap from "./utils/createClassMap";
import parseClasses from "./utils/parseClasses";
import createUIElement from "./utils/createUIElement";
import createPropertyValue from "./utils/createPropertyValue";
import TailwindTransformerConfig from "../types/TailwindTransformerConfig";
import UIElement from "../types/UIElement";

/**
 * Creates a Tailwind CSS transformer for roblox-ts
 * @param config - Transformer configuration options
 * @returns TypeScript transformer factory
 */
export default function tailwindTransformer(config?: TailwindTransformerConfig): ts.TransformerFactory<ts.SourceFile> {
	return (context: ts.TransformationContext) => {
		const { factory } = context;

		// Load Tailwind config and create class map
		const projectRoot = process.cwd();
		const tailwindConfig = loadTailwindConfig(projectRoot, config?.tailwindConfigPath);
		const dynamicClassMap = createClassMap(tailwindConfig);

		console.log("🎨 Local transformer loaded! Classes:", Object.keys(dynamicClassMap).length);

		return (sourceFile: ts.SourceFile): ts.SourceFile => {
			// Only process .tsx and .jsx files
			if (!sourceFile.fileName.endsWith(".tsx") && !sourceFile.fileName.endsWith(".jsx")) {
				return sourceFile;
			}
			function visitor(node: ts.Node): ts.Node {
				if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
					const attributes = ts.isJsxElement(node) ? node.openingElement.attributes : node.attributes;

					let classNameAttr: ts.JsxAttribute | undefined;
					const otherAttributes: ts.JsxAttributeLike[] = [];

					// Find className attribute and separate other attributes
					for (const attr of attributes.properties) {
						if (ts.isJsxAttribute(attr) && ts.isIdentifier(attr.name) && attr.name.text === "className") {
							classNameAttr = attr;
						} else {
							otherAttributes.push(attr);
						}
					}

					// If we found a className attribute, process it and transform the element
					if (classNameAttr && classNameAttr.initializer) {
						let classNames: string = "";

						if (ts.isStringLiteral(classNameAttr.initializer)) {
							// Handle direct string literal: className="w-4 h-4"
							classNames = classNameAttr.initializer.text;
						} else if (
							ts.isJsxExpression(classNameAttr.initializer) &&
							classNameAttr.initializer.expression &&
							ts.isStringLiteral(classNameAttr.initializer.expression)
						) {
							// Handle JSX expression with string literal: className={"w-4 h-4"}
							classNames = classNameAttr.initializer.expression.text;
						}

						// Parse classes even if classNames is empty (to ensure className is removed)
						const { properties, uiElements } = parseClasses(
							classNames,
							dynamicClassMap,
							config?.warnUnknownClasses,
						);

						// Create new attributes from Tailwind classes (excluding className)
						const newAttributes: ts.JsxAttributeLike[] = [...otherAttributes];

						// Add properties as attributes
						for (const key of Object.keys(properties as Record<string, unknown>)) {
							if (Object.prototype.hasOwnProperty.call(properties, key)) {
								const value = (properties as Record<string, unknown>)[key];
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

						// Create UI element children
						const uiElementChildren: ts.JsxElement[] = [];
						for (const element of uiElements) {
							const uiElement = createUIElement(factory, element as UIElement);
							if (uiElement) {
								uiElementChildren.push(uiElement);
							}
						}

						// Transform the element based on its type
						if (ts.isJsxSelfClosingElement(node)) {
							// Convert self-closing to regular element if we need to add UI children
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
							// JSX element with children - visit existing children first
							const visitedChildren = node.children.map(
								(child) => ts.visitNode(child, visitor) as ts.JsxChild,
							);
							const newChildren: ts.JsxChild[] = [...uiElementChildren, ...visitedChildren];

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

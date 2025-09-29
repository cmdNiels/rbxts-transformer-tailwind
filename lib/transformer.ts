/**
 * rbxts-transformer-tailwind
 * A TypeScript transformer that converts Tailwind CSS classes to Roblox UI properties
 */

import * as ts from "typescript";

import type TailwindTransformerConfig from "@/types/TailwindTransformerConfig";
import type UIElement from "@/types/UIElement";

import createClassMap from "./utils/createClassMap";
import createPropertyValue from "./utils/createPropertyValue";
import createUIElement from "./utils/createUIElement";
import loadTailwindConfig from "./utils/loadTailwindConfig";
import parseClasses from "./utils/parseClasses";

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
					const otherAttributes: ts.JsxAttributeLike[] = [];

					for (const attr of attributes.properties) {
						if (ts.isJsxAttribute(attr) && ts.isIdentifier(attr.name) && attr.name.text === "className") {
							classNameAttr = attr;
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

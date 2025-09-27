/**
 * rbxts-transformer-tailwind
 * A TypeScript transformer that converts Tailwind CSS classes to Roblox UI properties
 */

import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";

export interface TailwindTransformerConfig {
	/** Custom class mappings to add or override */
	customClasses?: Record<string, ClassMapping>;
	/** Path to tailwind config file (optional) */
	tailwindConfigPath?: string;
	/** Whether to warn about unknown classes */
	warnUnknownClasses?: boolean;
}

export interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export interface UDimValue {
	scale: number;
	offset: number;
}

export interface SizeValue {
	x?: UDimValue;
	y?: UDimValue;
}

export interface ClassMapping {
	[key: string]: unknown;
	Size?: {
		x?: UDimValue;
		y?: UDimValue;
	};
	_uiElement?: string;
}

// Load Tailwind configuration
function loadTailwindConfig(projectRoot: string, configPath?: string): unknown {
	const configPaths = configPath
		? [configPath]
		: ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.mjs"];

	for (const configPath of configPaths) {
		const fullPath = path.isAbsolute(configPath) ? configPath : path.join(projectRoot, configPath);
		if (fs.existsSync(fullPath)) {
			try {
				// Clear require cache to ensure fresh config
				delete require.cache[require.resolve(fullPath)];
				return require(fullPath);
			} catch (e) {
				console.warn(`Failed to load Tailwind config from ${fullPath}:`, e);
			}
		}
	}
	return undefined;
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): RGBColor | undefined {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16) / 255,
				g: parseInt(result[2], 16) / 255,
				b: parseInt(result[3], 16) / 255,
		  }
		: undefined;
}

// Create class mappings with Tailwind config support
function createClassMap(
	tailwindConfig: unknown = undefined,
	customClasses: Record<string, ClassMapping> = {},
): Record<string, ClassMapping> {
	const baseMap: Record<string, ClassMapping> = {
		// Width utilities
		"w-4": { Size: { x: { scale: 0, offset: 16 } } },
		"w-8": { Size: { x: { scale: 0, offset: 32 } } },
		"w-16": { Size: { x: { scale: 0, offset: 64 } } },
		"w-32": { Size: { x: { scale: 0, offset: 128 } } },
		"w-48": { Size: { x: { scale: 0, offset: 192 } } },
		"w-64": { Size: { x: { scale: 0, offset: 256 } } },
		"w-96": { Size: { x: { scale: 0, offset: 384 } } },
		"w-full": { Size: { x: { scale: 1, offset: 0 } } },
		"w-1/2": { Size: { x: { scale: 0.5, offset: 0 } } },
		"w-1/3": { Size: { x: { scale: 1 / 3, offset: 0 } } },
		"w-2/3": { Size: { x: { scale: 2 / 3, offset: 0 } } },
		"w-1/4": { Size: { x: { scale: 0.25, offset: 0 } } },
		"w-3/4": { Size: { x: { scale: 0.75, offset: 0 } } },

		// Height utilities
		"h-auto": { AutomaticSize: "Y" },
		"h-4": { Size: { y: { scale: 0, offset: 16 } } },
		"h-8": { Size: { y: { scale: 0, offset: 32 } } },
		"h-10": { Size: { y: { scale: 0, offset: 40 } } },
		"h-12": { Size: { y: { scale: 0, offset: 48 } } },
		"h-16": { Size: { y: { scale: 0, offset: 64 } } },
		"h-20": { Size: { y: { scale: 0, offset: 80 } } },
		"h-32": { Size: { y: { scale: 0, offset: 128 } } },
		"h-48": { Size: { y: { scale: 0, offset: 192 } } },
		"h-64": { Size: { y: { scale: 0, offset: 256 } } },
		"h-96": { Size: { y: { scale: 0, offset: 384 } } },
		"h-full": { Size: { y: { scale: 1, offset: 0 } } },
		"h-1/2": { Size: { y: { scale: 0.5, offset: 0 } } },
		"h-1/3": { Size: { y: { scale: 1 / 3, offset: 0 } } },
		"h-2/3": { Size: { y: { scale: 2 / 3, offset: 0 } } },
		"h-1/4": { Size: { y: { scale: 0.25, offset: 0 } } },
		"h-3/4": { Size: { y: { scale: 0.75, offset: 0 } } },

		// Background colors
		"bg-transparent": { BackgroundTransparency: 1 },
		"bg-white": { BackgroundColor3: { r: 1, g: 1, b: 1 } },
		"bg-black": { BackgroundColor3: { r: 0, g: 0, b: 0 } },

		// Gray scale
		"bg-gray-50": { BackgroundColor3: { r: 0.976, g: 0.98, b: 0.984 } },
		"bg-gray-100": { BackgroundColor3: { r: 0.953, g: 0.957, b: 0.965 } },
		"bg-gray-200": { BackgroundColor3: { r: 0.898, g: 0.906, b: 0.922 } },
		"bg-gray-300": { BackgroundColor3: { r: 0.82, g: 0.835, b: 0.859 } },
		"bg-gray-400": { BackgroundColor3: { r: 0.612, g: 0.635, b: 0.671 } },
		"bg-gray-500": { BackgroundColor3: { r: 0.42, g: 0.447, b: 0.502 } },
		"bg-gray-600": { BackgroundColor3: { r: 0.294, g: 0.333, b: 0.388 } },
		"bg-gray-700": { BackgroundColor3: { r: 0.22, g: 0.247, b: 0.286 } },
		"bg-gray-800": { BackgroundColor3: { r: 0.122, g: 0.161, b: 0.216 } },
		"bg-gray-900": { BackgroundColor3: { r: 0.067, g: 0.09, b: 0.125 } },

		// Color scale for other colors
		"bg-red-500": { BackgroundColor3: { r: 0.937, g: 0.267, b: 0.267 } },
		"bg-orange-500": { BackgroundColor3: { r: 0.976, g: 0.451, b: 0.094 } },
		"bg-yellow-500": { BackgroundColor3: { r: 0.918, g: 0.702, b: 0.031 } },
		"bg-green-500": { BackgroundColor3: { r: 0.133, g: 0.773, b: 0.369 } },
		"bg-blue-500": { BackgroundColor3: { r: 0.231, g: 0.51, b: 0.965 } },
		"bg-indigo-500": { BackgroundColor3: { r: 0.388, g: 0.427, b: 0.937 } },
		"bg-purple-500": { BackgroundColor3: { r: 0.659, g: 0.333, b: 0.969 } },
		"bg-pink-500": { BackgroundColor3: { r: 0.925, g: 0.243, b: 0.518 } },

		// Text colors
		"text-white": { TextColor3: { r: 1, g: 1, b: 1 } },
		"text-black": { TextColor3: { r: 0, g: 0, b: 0 } },
		"text-gray-600": { TextColor3: { r: 0.294, g: 0.333, b: 0.388 } },
		"text-red-600": { TextColor3: { r: 0.863, g: 0.149, b: 0.157 } },
		"text-green-700": { TextColor3: { r: 0.082, g: 0.541, b: 0.259 } },
		"text-blue-800": { TextColor3: { r: 0.122, g: 0.267, b: 0.722 } },

		// Padding utilities
		"p-1": { _uiElement: "padding", all: 4 },
		"p-2": { _uiElement: "padding", all: 8 },
		"p-3": { _uiElement: "padding", all: 12 },
		"p-4": { _uiElement: "padding", all: 16 },
		"p-6": { _uiElement: "padding", all: 24 },
		"p-8": { _uiElement: "padding", all: 32 },
		"px-2": { _uiElement: "padding", horizontal: 8 },
		"px-4": { _uiElement: "padding", horizontal: 16 },
		"px-6": { _uiElement: "padding", horizontal: 24 },
		"py-2": { _uiElement: "padding", vertical: 8 },
		"py-4": { _uiElement: "padding", vertical: 16 },
		"py-6": { _uiElement: "padding", vertical: 24 },

		// Border radius
		rounded: { _uiElement: "corner", radius: 4 },
		"rounded-sm": { _uiElement: "corner", radius: 2 },
		"rounded-md": { _uiElement: "corner", radius: 6 },
		"rounded-lg": { _uiElement: "corner", radius: 8 },
		"rounded-xl": { _uiElement: "corner", radius: 12 },
		"rounded-2xl": { _uiElement: "corner", radius: 16 },
		"rounded-full": { _uiElement: "corner", radius: 9999 },

		// Text alignment
		"text-left": { TextXAlignment: "Left" },
		"text-center": { TextXAlignment: "Center" },
		"text-right": { TextXAlignment: "Right" },

		// Text sizes
		"text-xs": { TextSize: 10 },
		"text-sm": { TextSize: 12 },
		"text-base": { TextSize: 14 },
		"text-lg": { TextSize: 16 },
		"text-xl": { TextSize: 18 },
		"text-2xl": { TextSize: 24 },
		"text-3xl": { TextSize: 30 },
		"text-4xl": { TextSize: 36 },

		// Font weights
		"font-normal": { Font: "Gotham" },
		"font-medium": { Font: "GothamMedium" },
		"font-semibold": { Font: "GothamSemibold" },
		"font-bold": { Font: "GothamBold" },

		// Layout utilities
		flex: { _uiElement: "listLayout", direction: "Horizontal" },
		"flex-col": { _uiElement: "listLayout", direction: "Vertical" },
		"justify-center": { _uiElement: "listLayout", horizontalAlignment: "Center" },
		"justify-start": { _uiElement: "listLayout", horizontalAlignment: "Left" },
		"justify-end": { _uiElement: "listLayout", horizontalAlignment: "Right" },
		"items-center": { _uiElement: "listLayout", verticalAlignment: "Center" },
		"items-start": { _uiElement: "listLayout", verticalAlignment: "Top" },
		"items-end": { _uiElement: "listLayout", verticalAlignment: "Bottom" },

		// Gap utilities
		"gap-1": { _uiElement: "listLayout", spacing: 4 },
		"gap-2": { _uiElement: "listLayout", spacing: 8 },
		"gap-3": { _uiElement: "listLayout", spacing: 12 },
		"gap-4": { _uiElement: "listLayout", spacing: 16 },
		"gap-6": { _uiElement: "listLayout", spacing: 24 },
		"gap-8": { _uiElement: "listLayout", spacing: 32 },

		// Border utilities
		border: { _uiElement: "stroke", thickness: 1, color: { r: 0.82, g: 0.835, b: 0.859 } },
		"border-2": { _uiElement: "stroke", thickness: 2, color: { r: 0.82, g: 0.835, b: 0.859 } },
		shadow: { _uiElement: "stroke", thickness: 1, color: { r: 0, g: 0, b: 0 }, transparency: 0.1 },
		"shadow-lg": { _uiElement: "stroke", thickness: 2, color: { r: 0, g: 0, b: 0 }, transparency: 0.1 },
	};

	// Extend with Tailwind config if available
	if ((tailwindConfig as any)?.theme?.extend?.colors) {
		for (const [colorName, colorValue] of Object.entries((tailwindConfig as any).theme.extend.colors)) {
			if (typeof colorValue === "string") {
				const rgb = hexToRgb(colorValue);
				if (rgb) {
					baseMap[`bg-${colorName}`] = { BackgroundColor3: rgb };
					baseMap[`text-${colorName}`] = { TextColor3: rgb };
				}
			}
		}
	}

	// Apply custom class overrides
	return { ...baseMap, ...customClasses };
}

// Parse className string into properties and UI elements
function parseClasses(
	classNames: string,
	classMapToUse: Record<string, ClassMapping>,
	warnUnknown = false,
): { properties: unknown; uiElements: unknown[] } {
	const classes = classNames.split(" ").filter((c) => c !== "");
	const properties: unknown = {};
	const uiElementsMap: Record<string, Record<string, unknown>> = {};
	const size: SizeValue = { x: undefined, y: undefined };

	for (const cls of classes) {
		const mapping = classMapToUse[cls];
		if (mapping) {
			if (mapping._uiElement) {
				const elementType = mapping._uiElement;
				if (!uiElementsMap[elementType]) {
					uiElementsMap[elementType] = { type: elementType };
				}
				// Merge properties for the same UI element type
				for (const key of Object.keys(mapping)) {
					if (key !== "_uiElement" && mapping.hasOwnProperty(key)) {
						uiElementsMap[elementType][key] = mapping[key];
					}
				}
			} else if (mapping.Size) {
				// Handle Size property specially to merge x and y
				if (mapping.Size.x) size.x = mapping.Size.x;
				if (mapping.Size.y) size.y = mapping.Size.y;
			} else {
				for (const key of Object.keys(mapping)) {
					if (mapping.hasOwnProperty(key)) {
						(properties as any)[key] = mapping[key];
					}
				}
			}
		} else if (warnUnknown) {
			console.warn(`Unknown Tailwind class: ${cls}`);
		}
	}

	// Convert uiElementsMap back to array
	const uiElements = Object.values(uiElementsMap);

	// Build final Size if either x or y was specified
	if (size.x || size.y) {
		(properties as any).Size = {
			x: size.x || { scale: 0, offset: 0 },
			y: size.y || { scale: 0, offset: 0 },
		};
	}

	return { properties, uiElements };
}

// Helper functions for creating TypeScript expressions
function createColor3Expression(factory: ts.NodeFactory, color: RGBColor): ts.Expression {
	return factory.createCallExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier("Color3"), factory.createIdentifier("fromRGB")),
		undefined,
		[
			factory.createNumericLiteral(Math.round(color.r * 255)),
			factory.createNumericLiteral(Math.round(color.g * 255)),
			factory.createNumericLiteral(Math.round(color.b * 255)),
		],
	);
}

function createUDim2Expression(factory: ts.NodeFactory, size: SizeValue): ts.Expression | undefined {
	if (size.x && size.y) {
		return factory.createNewExpression(factory.createIdentifier("UDim2"), undefined, [
			factory.createNumericLiteral(size.x.scale),
			factory.createNumericLiteral(size.x.offset),
			factory.createNumericLiteral(size.y.scale),
			factory.createNumericLiteral(size.y.offset),
		]);
	}
	return undefined;
}

function createEnumExpression(factory: ts.NodeFactory, enumType: string, enumValue: string): ts.Expression {
	if (!enumValue) {
		// Provide default values for missing enum values
		if (enumType === "FillDirection") enumValue = "Horizontal";
		else if (enumType === "HorizontalAlignment") enumValue = "Center";
		else if (enumType === "VerticalAlignment") enumValue = "Center";
		else enumValue = "Default";
	}

	return factory.createPropertyAccessExpression(
		factory.createPropertyAccessExpression(factory.createIdentifier("Enum"), factory.createIdentifier(enumType)),
		factory.createIdentifier(enumValue),
	);
}

function createUIElement(factory: ts.NodeFactory, element: any): ts.JsxElement | undefined {
	switch (element.type) {
		case "padding":
			const paddingTop = element.top || element.vertical || element.all || 0;
			const paddingBottom = element.bottom || element.vertical || element.all || 0;
			const paddingLeft = element.left || element.horizontal || element.all || 0;
			const paddingRight = element.right || element.horizontal || element.all || 0;

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

		case "corner":
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
									factory.createNumericLiteral(element.radius),
								]),
							),
						),
					]),
				),
				[],
				factory.createJsxClosingElement(factory.createIdentifier("uicorner")),
			);

		case "listLayout":
			const attributes = [
				factory.createJsxAttribute(
					factory.createIdentifier("SortOrder"),
					factory.createJsxExpression(undefined, createEnumExpression(factory, "SortOrder", "LayoutOrder")),
				),
				factory.createJsxAttribute(
					factory.createIdentifier("FillDirection"),
					factory.createJsxExpression(
						undefined,
						createEnumExpression(factory, "FillDirection", element.direction),
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
								factory.createNumericLiteral(element.spacing),
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

		case "stroke":
			return factory.createJsxElement(
				factory.createJsxOpeningElement(
					factory.createIdentifier("uistroke"),
					undefined,
					factory.createJsxAttributes([
						factory.createJsxAttribute(
							factory.createIdentifier("Thickness"),
							factory.createJsxExpression(undefined, factory.createNumericLiteral(element.thickness)),
						),
						factory.createJsxAttribute(
							factory.createIdentifier("Color"),
							factory.createJsxExpression(undefined, createColor3Expression(factory, element.color)),
						),
						...(element.transparency
							? [
									factory.createJsxAttribute(
										factory.createIdentifier("Transparency"),
										factory.createJsxExpression(
											undefined,
											factory.createNumericLiteral(element.transparency),
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

	return undefined;
}

function createPropertyValue(factory: ts.NodeFactory, key: string, value: any): ts.Expression {
	switch (key) {
		case "BackgroundColor3":
		case "TextColor3":
			return createColor3Expression(factory, value);
		case "Size":
			return createUDim2Expression(factory, value)!;
		case "TextXAlignment":
			return createEnumExpression(factory, "TextXAlignment", value);
		case "Font":
			return createEnumExpression(factory, "Font", value);
		default:
			if (typeof value === "string") {
				return factory.createStringLiteral(value);
			} else if (typeof value === "number") {
				return factory.createNumericLiteral(value);
			} else {
				return factory.createStringLiteral(value.toString());
			}
	}
}

/**
 * Creates a Tailwind CSS transformer for roblox-ts
 * @param config - Transformer configuration options
 * @returns TypeScript transformer factory
 */
export default function tailwindTransformer(program?: ts.Program): ts.TransformerFactory<ts.SourceFile> {
	return (context: ts.TransformationContext) => {
		const { factory } = context;
		
		// Load Tailwind config and create class map
		const projectRoot = process.cwd();
		const tailwindConfig = loadTailwindConfig(projectRoot);
		const dynamicClassMap = createClassMap(tailwindConfig);
		
		console.log("🎨 Local transformer loaded! Classes:", Object.keys(dynamicClassMap).length);

		return (sourceFile: ts.SourceFile): ts.SourceFile => {
			// Only process .tsx and .jsx files
			if (!sourceFile.fileName.endsWith('.tsx') && !sourceFile.fileName.endsWith('.jsx')) {
				return sourceFile;
			}				function visitor(node: ts.Node): ts.Node {
					if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
						const attributes = ts.isJsxElement(node) ? node.openingElement.attributes : node.attributes;

						let classNameAttr: ts.JsxAttribute | undefined;
						const otherAttributes: ts.JsxAttributeLike[] = [];

						// Find className attribute and separate other attributes
						for (const attr of attributes.properties) {
							if (
								ts.isJsxAttribute(attr) &&
								ts.isIdentifier(attr.name) &&
								attr.name.text === "className"
							) {
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
								false,
							);

							// Create new attributes from Tailwind classes (excluding className)
							const newAttributes: ts.JsxAttributeLike[] = [...otherAttributes];

							// Add properties as attributes
							for (const key of Object.keys(properties as any)) {
								if ((properties as any).hasOwnProperty(key)) {
									const value = (properties as any)[key];
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
								const uiElement = createUIElement(factory, element);
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
								const visitedChildren = node.children.map(child => ts.visitNode(child, visitor) as ts.JsxChild);
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

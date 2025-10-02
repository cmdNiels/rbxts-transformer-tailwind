# rbxts-transformer-tailwind

A TypeScript transformer that converts Tailwind CSS classes to Roblox UI properties for roblox-ts projects.

(This is work in progress with large parts being generated, not all tailwind classes are supported yet)

## Installation

```bash
npm install --save-dev rbxts-transformer-tailwind
```

## Setup

Add the transformer to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "rbxts-transformer-tailwind"
      }
    ]
  }
}
```

## Usage

```tsx
import React from "@rbxts/react";

export function MyComponent() {
  return (
    <frame className="w-full h-96 bg-blue-500 p-6 rounded-xl">
      <textlabel 
        className="text-white text-xl font-bold text-center"
        Text="Hello Roblox!"
      />
    </frame>
  );
}
```

## Supported Classes

Common Tailwind classes are supported including:
- **Layout**: `w-full`, `h-96`, `flex`, `flex-col`
- **Colors**: `bg-blue-500`, `text-white`, `bg-gray-100`
- **Spacing**: `p-4`, `px-6`, `gap-4`
- **Typography**: `text-xl`, `font-bold`, `text-center`, `underline`, `line-through`
- **Borders**: `rounded`, `rounded-lg`, `border`

## Configuration

Optional configuration in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "rbxts-transformer-tailwind",
        "warnUnknownClasses": true,
        "customClasses": {
          "bg-brand": {
            "BackgroundColor3": { "r": 0.2, "g": 0.4, "b": 0.8 }
          }
        }
      }
    ]
  }
}
```

## TypeScript Support

Add className support to your JSX elements by adding a tailwind.d.ts to your project:

```typescript
/// <reference types="rbxts-transformer-tailwind" />
```

## License

MIT
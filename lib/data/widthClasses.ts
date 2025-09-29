import { ClassMapping } from "../../types";

export default {
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
} as Record<string, ClassMapping>;

import { ClassMapping } from "../../types";

export default {
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
} as Record<string, ClassMapping>;

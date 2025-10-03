import type ClassMapping from "../../types/ClassMapping";
import generateBackgroundColorClasses from "../utils/colors/generateBackgroundColorClasses";

export default {
	"bg-transparent": { BackgroundTransparency: 1 },
	...generateBackgroundColorClasses(),
} satisfies Record<string, ClassMapping>;

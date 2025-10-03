import type ClassMapping from "../../types/ClassMapping";
import generateImageColorClasses from "../utils/colors/generateImageColorClasses";

export default {
	...generateImageColorClasses(),
} satisfies Record<string, ClassMapping>;

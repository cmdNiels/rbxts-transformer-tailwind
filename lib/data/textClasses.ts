import { ClassMapping } from "../../types";
import generateTextColorClasses from "../utils/colors/generateTextColorClasses";

export default {
	...generateTextColorClasses(),
} as Record<string, ClassMapping>;

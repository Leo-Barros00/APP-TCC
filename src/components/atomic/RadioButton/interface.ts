import { Variant } from "../../../../typings/theme";

export interface IRadioButton {
    title: string;
    onPress: () => void;
    value: string;
    variant: Variant;
    fluid?: boolean;
}
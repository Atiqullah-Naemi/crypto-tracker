import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberToCurrency = (number: number) => {
  return Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(number);
};

export const isNumberPositive = (number: number) => {
  return Math.sign(number) === 1 ? true : false;
};

export const fixNumber = (number: number, isPercent?: boolean) => {
  return isPercent ? number.toFixed(1) + "%" : number.toFixed(1);
};

export const convertToInternationalCurrencySystem = (number: string) => {
  return Math.abs(Number(number)) >= 1.0e12
    ? (Math.abs(Number(number)) / 1.0e12).toFixed(2) + "Trillion"
    : Math.abs(Number(number)) >= 1.0e9
    ? (Math.abs(Number(number)) / 1.0e9).toFixed(2) + "Billion"
    : Math.abs(Number(number)) >= 1.0e6
    ? (Math.abs(Number(number)) / 1.0e6).toFixed(2) + "Million"
    : Math.abs(Number(number)) >= 1.0e3
    ? (Math.abs(Number(number)) / 1.0e3).toFixed(2) + "Thousand"
    : Math.abs(Number(number));
};

export const capitalizeFirstLetter = (name: string) => {
  return name[0].toLocaleUpperCase() + name.slice(1);
};

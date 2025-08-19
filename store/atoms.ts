import { CalendarDto } from "@/types/api";

const { atom } = require("jotai");

export const colorAtom: boolean = atom(false);
export const calendarAtom: CalendarDto[] = atom([]);
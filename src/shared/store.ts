import { atom } from "jotai";
import { Chat, User } from "./models";

export const userAtom = atom<User | null>(null);
export const chatAtom = atom<Chat | null>(null);

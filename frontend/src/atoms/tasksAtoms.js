/**
 * Jotai atoms for client-side UI state only (e.g. form draft, filters).
 * Server state for tasks lives in React Query.
 */
import { atom } from "jotai";

export const taskFormOpenAtom = atom(false);
